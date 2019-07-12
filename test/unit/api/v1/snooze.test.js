const { expect } = require('chai')
const { spy } = require('sinon')

const { mockRequest, mockResponse } = require('mock-req-res')

const snooze = require('src/api/v1/snooze')

describe('src/api/v1/snooze', () => {
  const res = mockResponse()
  const req = mockRequest()
  const next = spy()

  before(async () => {
    await snooze(req, res, next)
  })

  it('did not call next', () => {
    expect(next).not.to.have.been.called
  })

  it('called res.end', () => {
    expect(res.end).to.have.been.called
  })
})
