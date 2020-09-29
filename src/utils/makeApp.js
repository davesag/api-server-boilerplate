const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const { connector } = require('swagger-routes-express')
const OpenApiValidator = require('express-openapi-validator')

const api = require('src/api')
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

  // do this before connecting the api routes.
  app.use(
    OpenApiValidator.middleware({
      apiSpec: apiDefinition,
      validateRequests: true, // (default)
      validateResponses: true // false by default
    })
  )

  connect(app) // apply the routes

  app.use(notFoundError)
  app.use(genericErrors) // must be last
  return app
}

module.exports = makeApp
