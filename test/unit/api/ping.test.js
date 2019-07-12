const { expect } = require('chai')
const proxyquire = require('proxyquire')

const { mockRequest, mockResponse } = require('mock-req-res')

const fakeUptime = 100
const mockUptime = () => fakeUptime

const apiDetails = {
  apiSummary: {
    info: {
      name: 'test',
      version: '0.0.0',
      description: 'This is a test'
    }
  },
  '@noCallThru': true
}

describe('src/api/ping', () => {
  const ping = proxyquire('src/api/ping', {
    'src/utils/uptime': mockUptime,
    'src/utils/api/apiDetails': apiDetails
  })

  const req = mockRequest()
  const res = mockResponse()

  const expected = {
    ...apiDetails.apiSummary.info,
    uptime: fakeUptime
  }

  before(() => {
    ping(req, res)
  })

  it('calls res.json with the correct data', () => {
    expect(res.json).to.have.been.calledWith(expected)
  })
})
