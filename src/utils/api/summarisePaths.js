const normalisePath = path => path.replace(/\{/g, ':').replace(/\}/g, '')

const detailSummariser = (paths, basePath) => (path, { tags }) =>
  tags && tags.length !== 0 && tags[0] === 'root' ? path : `${basePath}${path}`

const pathSummariser = (paths, basePath, result) => {
  const summariser = detailSummariser(paths, basePath)

  return path => {
    const thePath = paths[path]
    const methods = Object.keys(thePath)
    methods.forEach(method => {
      result[method] = result[method] || []
      result[method].push(summariser(normalisePath(path), thePath[method]))
    })
  }
}

/**
 * Given a swagger `paths` object, distill it down to just the details needed
 * to send out with a registration event
 * The output will be in the form
 * {
 *   [method]: ['/', '/ping', '/v1/api/function/:param']
 * }
 */
const summarise = (paths, basePath) => {
  const keys = Object.keys(paths)
  const result = {}
  const summariser = pathSummariser(paths, basePath, result)
  keys.forEach(summariser)

  return result
}

module.exports = summarise
