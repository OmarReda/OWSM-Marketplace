/**
 * Parse response body
 * @function parseResponseBody
 * @param {Object} body
 * @param {string} contentType
 * @returns {Object}
 */
'use strict'

/** @lends parseResponseBody */
function parseResponseBody (body, contentType) {
  if (typeof body === 'string') {
    const isJSON = /application\/json/.test(contentType)
    if (isJSON) {
      try {
        return JSON.parse(body)
      } catch (e) {
        console.warn(`Failed to parse body: ${body}`)
      }
    }
  }
  return body
}

module.exports = parseResponseBody
