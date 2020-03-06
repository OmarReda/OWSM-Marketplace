/**
 * Promise base request module
 * @module arequest
 */

'use strict'

const create = require('./create')
const ARequest = require('./arequest')

let lib = create({})

Object.assign(lib, {
  create,
  ARequest
})

module.exports = lib