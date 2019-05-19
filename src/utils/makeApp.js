const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const { connector } = require('swagger-routes-express')

const api = require('src/api')
const apiValidator = require('src/utils/api/apiValidator')
const { apiDefinition } = require('src/utils/api/apiDetails')

const genericErrors = require('src/utils/genericErrors')
const notFoundError = require('src/utils/notFoundError')

const makeApp = async () => {
  const connect = connector(api, apiDefinition)

  const app = express()
  app.use(cors())
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDefinition))
  app.use(bodyParser.json())

  app.set('trust proxy', true) // needed to get the requesting ip
  // add any other middlewares here
  app.use(apiValidator(apiDefinition))
  connect(app) // apply the routes

  app.use(notFoundError)
  app.use(genericErrors) // must be last
  return app
}

module.exports = makeApp
