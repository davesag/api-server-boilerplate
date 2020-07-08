const asyncRoute = require('route-async')

/* just a placeholder async function to demonstrate this works */
const sleep = duration =>
  new Promise(resolve => {
    setTimeout(resolve, duration)
  })

const snooze = async (req, res) => {
  await sleep(10)
  res.end()
}

module.exports = asyncRoute(snooze)
