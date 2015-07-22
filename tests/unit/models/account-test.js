import { test, moduleForModel } from 'ember-qunit';

moduleForModel('account', 'Account', {
  // Specify the other units that are required for this test.
  needs: ['model:class-of-service', 'transform:date-time-transform']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(model);
});
