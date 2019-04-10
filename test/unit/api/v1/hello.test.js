const { expect } = require('chai')
const { mockRequest, mockResponse } = require('mock-req-res')

const hello = require('src/api/v1/hello')

describe('src/api/v1/hello', () => {
  const res = mockResponse()

  context('when a valid name is provided', () => {
    const name = 'Dave Sag'
    const req = mockRequest({ params: { name } })
    const expected = `hello ${name}`

    before(() => {
      hello(req, res)
    })

    it('calls res.json with the correct data', () => {
      expect(res.json).to.have.been.calledWith(expected)
    })
  })

  context('when an invalid name is provided', () => {
    const name = 'Dave 546'
    const req = mockRequest({ params: { name } })
    const expectedError = `${name} is not a valid name.`

    it('throws an error with the expected error message', () =>
      expect(() => {
        hello(req, res)
      }).to.throw(expectedError))
  })
})
