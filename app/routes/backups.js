import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var array = Ember.ArrayController.create();
    var store = this.store;
    var servers = store.findAll('server');
    servers.then(function(servers) {
      servers.forEach(function(server) {
        var backups = store.find('backup', {server: Ember.get(server,'id')});
        backups.then(function(backup) {
          array.addObjects(backups);
        });
      }); 
    });
    
    return array;
  }
});
