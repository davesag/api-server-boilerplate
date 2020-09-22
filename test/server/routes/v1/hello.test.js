const request = require('supertest')
const serverCache = require('test/utils/serverCache')
const { BAD_REQUEST } = require('http-status-codes')

describe('GET /api/v1/hello/:name', () => {
  let server

  before(() => {
    server = serverCache.get()
  })

  context('given a valid name', () => {
    const name = 'Dave Sag'
    const expected = `"hello ${name}"`

    it('returns the expected value with status code 200', async () =>
      request(server).get(`/api/v1/hello/${name}`).expect(200, expected))
  })

  context('given an invalid name', () => {
    const name = 'Dave 546'
    const expected = JSON.stringify({ error: `${name} is not a valid name.` })

    it('returns the expected error message and status code BAD_REQUEST', async () =>
      request(server).get(`/api/v1/hello/${name}`).expect(BAD_REQUEST, expected))
  })
})
