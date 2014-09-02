import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'zimbra-ember-data', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'zimbra-ember-data');

export default App;
