const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const mockLogger = require('test/utils/mockLogger')

describe('src/utils/api/apiValidator', () => {
  const logger = mockLogger()
  const validator = sinon.stub()
  const apiValidator = proxyquire('src/utils/api/apiValidator', {
    'swagger-express-validator': validator,
    'src/utils/logger': logger
  })

  const schema = 'some-schema'

  before(() => {
    apiValidator(schema)
  })

  it('called validator', () => {
    expect(validator).to.have.been.calledWith(
      sinon.match({
        schema,
        validateRequest: true,
        validateResponse: true
      })
    )
  })
})
