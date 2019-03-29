const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { mockRequest, mockResponse } = require('mock-req-res')
const HttpError = require('node-http-error')
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status-codes')

const mockLogger = require('test/utils/mockLogger')
const ERRORS = require('src/errors')

describe('src/utils/genericErrors', () => {
  const genericErrors = proxyquire('src/utils/genericErrors', {
    'src/utils/logger': mockLogger
  })

  const status = BAD_REQUEST
  const error = new HttpError(status, 'oops')
  const res = mockResponse()
  const next = sinon.stub()

  const resetStubs = () => {
    next.resetHistory()
    mockLogger.error.resetHistory()
    res.status.resetHistory()
    res.json.resetHistory()
  }

  context('when other error headers have already been sent', () => {
    before(() => {
      res.headersSent = true
      genericErrors(error, null, res, next)
    })

    after(resetStubs)

    it('called next with the error', () => {
      expect(next).to.have.been.calledOnce
      expect(next.args[0][0]).to.deep.equal(error)
    })

    it("didn't call res.status", () => {
      expect(res.status).not.to.have.been.called
    })

    it("didn't call res.json", () => {
      expect(res.json).not.to.have.been.called
    })
  })

  context('when other error headers have not been sent', () => {
    before(() => {
      res.headersSent = false
    })

    context('when path is unknown', () => {
      const req = mockRequest()

      before(() => {
        genericErrors(error, req, res, next)
      })

      after(resetStubs)

      it('calls logger.error with the ERRORS.GENERIC_ERROR', () => {
        expect(mockLogger.error).to.have.been.calledOnce
        expect(mockLogger.error.args[0][0]).to.equal(ERRORS.GENERIC_ERROR())
        expect(mockLogger.error.args[0][1]).to.deep.equal(error)
      })

      it('calls res.status with the status', () => {
        expect(res.status).to.have.been.calledWith(status)
      })

      it('calls res.json with the error message', () => {
        expect(res.json).to.have.been.calledWith({ error: error.message })
      })
    })

    context('when path is known', () => {
      const req = mockRequest({ path: 'test' })

      before(() => {
        genericErrors(error, req, res, next)
      })

      after(resetStubs)

      it('calls logger.error with the ERRORS.GENERIC_ERROR', () => {
        expect(mockLogger.error).to.have.been.calledOnce
        expect(mockLogger.error.args[0][0]).to.equal(
          ERRORS.GENERIC_ERROR('test')
        )
      })

      it('calls res.status with the status', () => {
        expect(res.status).to.have.been.calledWith(status)
      })

      it('calls res.json with the error message', () => {
        expect(res.json).to.have.been.calledWith({ error: error.message })
      })
    })

    context('when the error is generic', () => {
      const parent = () => {}
      const req = mockRequest({ path: 'test', app: { parent } })
      const genericError = new Error('oops')

      before(() => {
        genericErrors(genericError, req, res, next)
      })

      after(resetStubs)

      it('calls logger.error with the ERRORS.GENERIC_ERROR', () => {
        expect(mockLogger.error).to.have.been.calledOnce
        expect(mockLogger.error.args[0][0]).to.equal(
          ERRORS.GENERIC_ERROR('test', parent.name)
        )
        expect(mockLogger.error.args[0][1]).to.deep.equal(genericError)
      })

      it('calls res.status with INTERNAL_SERVER_ERROR', () => {
        expect(res.status).to.have.been.calledWith(INTERNAL_SERVER_ERROR)
      })

      it('calls res.json with the error message', () => {
        expect(res.json).to.have.been.calledWith({
          error: genericError.message
        })
      })
    })
  })
})
