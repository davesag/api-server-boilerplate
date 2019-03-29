const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire').noCallThru()

describe('src/utils/makeApp', () => {
  const fakeCors = 'cors'
  const fakeBodyParser = {
    json: sinon.stub().returns('json-parser')
  }

  const fakeErrorHandler = 'errorHandler'

  const fakeApiDefinition = {
    apiDefinition: { test: 'just a test' },
    '@noCallThru': true
  }
  const mockApiValidator = sinon.stub().returns('api-validator')
  const mockConnect = sinon.spy()
  const mockApiConnector = () => mockConnect
  const mockCors = sinon.stub().returns(fakeCors)
  const fakeNotFoundError = 'not found error'
  const mockUse = sinon.spy()
  const mockSet = sinon.spy()
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

  const resetStubs = () => {
    fakeBodyParser.json.resetHistory()
    mockCors.resetHistory()
    mockUse.resetHistory()
    mockSet.resetHistory()
    mockApiValidator.resetHistory()
    mockConnect.resetHistory()
  }

  let app

  before(async () => {
    app = await makeApp()
  })

  after(resetStubs)

  it('uses cors', () => {
    expect(mockCors).to.have.been.calledOnce
    expect(mockUse).to.have.been.calledWith(fakeCors)
  })

  it('uses bodyParser.json', () => {
    expect(fakeBodyParser.json).to.have.been.calledOnce
    expect(mockUse).to.have.been.calledWith('json-parser')
  })

  it('creates the api validatior', () => {
    expect(mockApiValidator).to.have.been.called
  })

  it('uses the api validatior', () => {
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
