const env = process.env.NODE_ENV || /* istanbul ignore next */ 'development'
const PORT = Number(process.env.PORT) || 8282

module.exports = {
  PORT,
  env
}
