import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ZimbraEmberDataENV.locationType
});

Router.map(function() {
  this.resource('accounts', function() {
    this.route('account', {path:'/:account_id'});
  });
  this.route('aliases');
  this.route('backups');
  this.route('coses');
  this.route('distributionLists');
  this.resource('domains', function() {
    this.route('domain', {path:'/:domain_id'});
  });
  this.route('extensions');
  this.resource('resources', function() {
    this.route('resource', {path:'/:resource_id'});
  });
  this.resource('servers', function() {
    this.resource('servers.server', {path:'/:server_id'}, function() {
      this.route('mta');
      this.route('services');
    });
  });
  this.route('zimlets');
});

export default Router;
