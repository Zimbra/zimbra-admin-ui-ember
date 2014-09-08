import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ZimbraEmberDataENV.locationType
});

Router.map(function() {
  this.resource('accounts');
  this.route('account', {path:'/account/:account_id'});
  this.route('aliases');
  this.route('backups');
  this.route('coses');
  this.route('distributionLists');
  this.route('domains');
  this.route('extensions');
  this.route('resources');
  this.route('servers');
  this.route('zimlets');
});

export default Router;
