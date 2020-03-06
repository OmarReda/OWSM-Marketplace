'use strict'

const assert = require('assert')
const arequest = require('arequest')

// Send request
arequest({
  url: 'http://example.com',
  method: 'GET'
}).then((res) => {
  assert.equal(res.statusCode, 200)
  console.log(res.body)
  /* ... */
})

// Define custom request to handle sessions
let myRequest = arequest.create({
  jar: true
})

myRequest({
  url: 'http://example.com/sign',
  form: { /* ... */ }
}).then(() => {
  /* ... */
})
