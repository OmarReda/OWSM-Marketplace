/**
 * Test case for parseResponseBody.
 * Runs with mocha.
 */
'use strict'

const parseResponseBody = require('../lib/parsing/parse_response_body.js')
const assert = require('assert')

describe('parse-response-body', () => {
  before((done) => {
    done()
  })

  after((done) => {
    done()
  })

  it('Parse response body', (done) => {
    {
      let body = parseResponseBody({
        foo: 'bar'
      })
      assert.deepEqual(body, { foo: 'bar' })
    }
    done()
  })
})

/* global describe, before, after, it */
