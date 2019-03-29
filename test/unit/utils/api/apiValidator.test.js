const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const mockLogger = require('test/utils/mockLogger')

describe('src/utils/api/apiValidator', () => {
  const mockValidator = sinon.stub()
  const apiValidator = proxyquire('src/utils/api/apiValidator', {
    'swagger-express-validator': mockValidator,
    'src/utils/logger': mockLogger
  })

  const resetStubs = () => {
    mockLogger.error.resetHistory()
    mockValidator.resetHistory()
  }

  const schema = 'some-schema'

  before(() => {
    apiValidator(schema)
  })

  after(resetStubs)

  it('called validator', () => {
    expect(mockValidator).to.have.been.calledWith(
      sinon.match({
        schema,
        validateRequest: true,
        validateResponse: true
      })
    )
  })
})
