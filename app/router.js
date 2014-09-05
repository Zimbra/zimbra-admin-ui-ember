import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ZimbraEmberDataENV.locationType
});

Router.map(function() {
  this.route('accounts');
  this.route('aliases');
  this.route('coses');
  this.route('distributionLists');
  this.route('domains');
  this.route('resources');
  this.route('servers');
});

export default Router;
