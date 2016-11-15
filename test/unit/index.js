var assert = require('chai').assert

/* global describe, it */

describe('Simple assertion test', function () {
  it('Make sure test runs', function () {
    assert.equal('yep', 'yep')
  })
})
