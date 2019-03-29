const env = process.env.NODE_ENV || /* istanbul ignore next */ 'development'
const PORT = process.env.PORT || 8282

module.exports = {
  PORT,
  env
}
