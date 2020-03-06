/**
 * @class ARequest
 */
'use strict'

const argx = require('argx')
const request = require('request')
const parseResponseBody = require('./parsing/parse_response_body')

/** @lends ARequest */
class ARequest {
  constructor (config) {
    const s = this
    s.request = request.defaults(config || {})
  }

  /**
   * Send request
   * @param {string} [url] - URL to send
   * @param {Object} [options - Optional settings
   * @returns {Promise}
   */
  async send (url, options) {
    const s = this
    const args = argx(arguments)
    url = args.shift('string')
    options = args.pop('object') || {}

    const config = Object.assign({url}, options)
    const {pipe} = options
    delete options.pipe
    const {request} = s
    const res = await new Promise((resolve, reject) => {
      let connection = request(config, (err, res, body) => {
        err ? reject(err) : resolve(Object.assign({}, res, {body}))
      })
      if (pipe) {
        connection.pipe(pipe)
      }
    })
    const contentType = res.headers['content-type']
    return Object.assign(res, {
      body: parseResponseBody(res.body, contentType)
    })
  }

  bind () {
    const s = this
    return s.send.bind(s)
  }
}

module.exports = ARequest
