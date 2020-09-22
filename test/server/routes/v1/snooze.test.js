const request = require('supertest')
const serverCache = require('test/utils/serverCache')

describe('GET /api/v1/snooze', () => {
  let server

  before(() => {
    server = serverCache.get()
  })

  it('returns status code 200', async () => request(server).get('/api/v1/snooze').expect(200))
})
