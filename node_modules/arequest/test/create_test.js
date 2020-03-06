/**
 * Test case for create.
 * Runs with mocha.
 */
'use strict'

const create = require('../lib/create.js')
const assert = require('assert')

describe('create', () => {
  before((done) => {
    done()
  })

  after((done) => {
    done()
  })

  it('Create', (done) => {
    let request = create({})
    assert.ok(request)
    done()
  })
})

/* global describe, before, after, it */
