/**
 * Test case for arequest.
 * Runs with mocha.
 */
'use strict'

const ARequest = require('../lib/arequest.js')
const assert = require('assert')

describe('ap-request', function () {
  this.timeout(4000)
  before((done) => {
    done()
  })

  after((done) => {
    done()
  })

  it('Ap request', () => {
    let request = new ARequest().bind()
    return request({
      url: 'http://example.com',
      method: 'GET'
    }).then((res) => {
      assert.ok(res)
    })
  })
})

/* global describe, before, after, it */
