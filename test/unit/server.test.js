const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

const mockLogger = require('test/utils/mockLogger')

describe('src/server', () => {
  const mockApp = { listen: stub() }
  const mockMakeApp = stub()

  const server = proxyquire('src/server', {
    'src/utils/makeApp': mockMakeApp,
    'src/utils/logger': mockLogger
  })

  const mockServer = 'a server'

  let outcome

  before(async () => {
    mockMakeApp.resolves(mockApp)
    mockApp.listen.resolves(mockServer)
    outcome = await server.start()
  })

  after(() => {
    mockMakeApp.resetHistory()
    mockApp.listen.resetHistory()
    mockLogger.debug.resetHistory()
  })

  it('invoked app.listen', () => {
    expect(mockApp.listen).to.have.been.calledOnce
  })

  it('returns the server', () => {
    expect(outcome).to.have.property('server', mockServer)
  })
})
