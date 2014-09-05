import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ZimbraEmberDataENV.locationType
});

Router.map(function() {
  this.route('accounts');
  this.route('resources');
  this.route('distributionLists');
  this.route('aliases');
  this.route('domains');
});

export default Router;
