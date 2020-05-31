const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('utils - buildMessage', function() {
  describe('when receives an entity and an action', function() {
    it('should return the respective message', function() {
      const result = buildMessage('Movie', 'create');
      const expect = 'Movie created';
      assert.strictEqual(result, expect);
    });
  });

  describe('when receives an entity and an action and is a list', function() {
    it('should return the respective message with the entity in plural', function() {
      const result = buildMessage('Movie', 'list');
      const expect = 'Movies listed';
      assert.strictEqual(result, expect);
    });
  });
});
