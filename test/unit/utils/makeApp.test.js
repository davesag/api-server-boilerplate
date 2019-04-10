const { expect } = require('chai')
const { stub, spy } = require('sinon')
const proxyquire = require('proxyquire').noCallThru()

describe('src/utils/makeApp', () => {
  const fakeCors = 'cors'
  const fakeBodyParser = {
    json: stub().returns('json-parser')
  }

  const fakeErrorHandler = 'errorHandler'

  const fakeApiDefinition = {
    apiDefinition: { test: 'just a test' },
    '@noCallThru': true
  }
  const mockApiValidator = stub().returns('api-validator')
  const mockConnect = spy()
  const mockApiConnector = () => mockConnect
  const mockCors = stub().returns(fakeCors)
  const fakeNotFoundError = 'not found error'
  const mockUse = spy()
  const mockSet = spy()
  const fakeExpress = () => ({
    use: mockUse,
    set: mockSet
  })

  const makeApp = proxyquire('src/utils/makeApp', {
    express: fakeExpress,
    cors: mockCors,
    'body-parser': fakeBodyParser,
    'swagger-routes-express': mockApiConnector,
    'src/utils/notFoundError': fakeNotFoundError,
    'src/utils/api/apiDefinition': fakeApiDefinition,
    'src/utils/api/apiValidator': mockApiValidator,
    'src/utils/genericErrors': fakeErrorHandler
  })

  let app

  before(async () => {
    app = await makeApp()
  })

  it('uses cors', () => {
    expect(mockCors).to.have.been.calledOnce
    expect(mockUse).to.have.been.calledWith(fakeCors)
  })

  it('uses bodyParser.json', () => {
    expect(fakeBodyParser.json).to.have.been.calledOnce
    expect(mockUse).to.have.been.calledWith('json-parser')
  })

  it('creates the api validator', () => {
    expect(mockApiValidator).to.have.been.called
  })

  it('sets trust proxy to true', () => {
    expect(mockSet).to.have.been.calledWith('trust proxy', true)
  })

  it('uses the api validator', () => {
    expect(mockUse).to.have.been.calledWith('api-validator')
  })

  it('invokes connect with app', () => {
    expect(mockConnect).to.have.been.calledWith(app)
  })

  it('uses the notFoundError handler', () => {
    expect(mockUse).to.have.been.calledWith(fakeNotFoundError)
  })

  it('uses the genericError handler', () => {
    expect(mockUse).to.have.been.calledWith(fakeErrorHandler)
  })
})
