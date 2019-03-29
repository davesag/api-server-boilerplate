const { expect } = require('chai')
const request = require('supertest')
const serverCache = require('test/server/serverCache')
const { BAD_REQUEST } = require('http-status-codes')

describe('GET /api/v1/hello/:name', () => {
  let server

  before(() => {
    server = serverCache.get()
  })

  context('given a valid name', () => {
    const name = 'Dave Sag'
    const expected = `hello ${name}`
    it('returns the expected value with status code 200', done => {
      request(server)
        .get(`/api/v1/hello/${name}`)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.deep.equal(expected)
          done()
        })
    })
  })

  context('given an invalid name', () => {
    const name = 'Dave 546'
    const expected = { error: `${name} is not a valid name.` }
    it('returns the expected error message and status code BAD_REQUEST', done => {
      request(server)
        .get(`/api/v1/hello/${name}`)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.statusCode).to.equal(BAD_REQUEST)
          expect(res.body).to.deep.equal(expected)
          done()
        })
    })
  })
})
