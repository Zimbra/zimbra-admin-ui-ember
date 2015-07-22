import { test, moduleFor } from 'ember-qunit';

moduleFor('route:settings/general', 'SettingsGeneralRoute', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
