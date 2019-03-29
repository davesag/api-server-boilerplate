const makeApp = require('src/utils/makeApp')
const logger = require('src/utils/logger')
const { PORT } = require('src/utils/config')

const start = async () => {
  try {
    const app = await makeApp()
    const server = await app.listen(PORT)
    logger.debug('Server started. Listening on port', PORT)

    return { server }
  } catch (err) /* istanbul ignore next */ {
    logger.error('Could not start the server', err)
    process.exit(1)
  }
}

module.exports = { start }
