/**
 * Test case for index.
 * Runs with mocha.
 */
'use strict'

const index = require('../lib/index.js')
const assert = require('assert')

describe('index', () => {
  before((done) => {
    done()
  })

  after((done) => {
    done()
  })

  it('Eval props', (done) => {
    for (let name of Object.keys(index)) {
      assert.ok(index[ name ])
    }
    done()
  })
})

/* global describe, before, after, it */
