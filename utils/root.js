const path = require('path')

/**
 * Get the absolute path of the project's folder.
 *
 * @function rootPath
 * @return {string} The absolute path to the project folder
 */
function rootPath() {
  const getBinPath = path.dirname((require.main && require.main.filename) || (process.mainModule && process.mainModule.filename) || '')

  return path.join(getBinPath, '..')
}

module.exports = rootPath()
