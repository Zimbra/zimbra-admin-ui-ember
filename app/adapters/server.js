import DS from 'ember-data';
import Ember from 'ember';
import zimbra from 'zimbra-ember-data/utils/zimbra';
import config from '../config/environment';

  
//
// find
//
var find = function(store, type, id) {
  var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    findQuery(store, type, {id:id}).then(function(res) {
      resolve(res[0]);
    });
  });
  return promise;
};


//
// findAll 
//
var findAll = function (store, type) {
  return findQuery(store, type, {});
};


//
// findQuery
//
var findQuery = function (store, type, query) {
  var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    var asAdmin = true;
    zimbra.auth(config.zimbra.soap.adminUrl, config.zimbra.admin.user, config.zimbra.admin.pass, asAdmin).then(function(authRes) {
      var zimbraAuthToken = authRes.authToken[0]._content;
      var opts = {
        applyConfig: false,
        attrs: 'description,zimbraServiceHostname,zimbraId',
      };
      return zimbra.request(config.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:GetAllServersRequest', opts);
    
    }).then(
      function(res) {
        // Flatten the JSON representation from JSONified Zimbra XML to something flatter and Ember Data friendly
        _.each(res.server, function(server, index) {
          _.each(server.a, function(attr) {
            server[attr.n] = attr._content;
          });
          delete server.a;
        });
        resolve(res.server);
        
      }, function(err) {
        reject(err);
      }
    );
  });
  return promise;
};


export default DS.Adapter.extend({
  find: find,
  findAll: findAll,
  findQuery: findQuery
});
