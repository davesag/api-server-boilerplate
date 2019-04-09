const { expect } = require('chai')
const { mockRequest, mockResponse } = require('mock-req-res')

const versions = require('src/api/versions')

describe('src/api/versions', () => {
  const req = mockRequest()
  const res = mockResponse()

  const expected = [
    {
      version: 1,
      path: '/api/v1'
    }
  ]

  const resetStubs = () => {
    res.json.resetHistory()
  }

  before(() => {
    versions(req, res)
  })

  after(resetStubs)

  it('calls res.json with the correct data', () => {
    expect(res.json).to.have.been.calledWith(expected)
  })
})
