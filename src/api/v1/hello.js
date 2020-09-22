const { BAD_REQUEST } = require('http-status-codes')
const HttpError = require('node-http-error')

// yeah I know this is a bad test for a name.
const isName = string => string.match(/^[A-Z ]+$/i) !== null

const hello = (req, res) => {
  const { name } = req.params
  if (!isName(name)) throw new HttpError(BAD_REQUEST, `${name} is not a valid name.`)
  res.json(`hello ${name}`)
}

module.exports = hello
