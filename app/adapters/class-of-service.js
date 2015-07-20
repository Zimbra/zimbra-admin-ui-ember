import DS from 'ember-data';
import Ember from 'ember';
import zimbra from 'zimbra-ember-data/utils/zimbra';
import config from '../config/environment';


//
// find 
//
var find = function (store, type, id) {
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
        applyCos: false,
        types: 'coses',
        attrs: 'cn,description',
        query: generateQuery(query)
      };
      return zimbra.request(config.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:SearchDirectoryRequest', opts);
    
    }).then(
      function(res) {
        // Flatten the JSON representation from JSONified Zimbra XML to something flatter and Ember Data friendly
        _.each(res.cos, function(cos, index) {
          _.each(cos.a, function(attr) {
            cos[attr.n] = attr._content;
          });
          delete cos.a;
        });
        var result = _.isEmpty(query) ? res.cos : _.filter(res.cos, query);
        resolve(result);
        
      }, function(err) {
        reject(err);
      }
    );
  });
  return promise;
};


//
// Translate Mongo-style Ember Data filter into LDAP-style Zimbra query.
//
var generateQuery = function(filter) {
  return '';
};


export default DS.Adapter.extend({
  find: find,
  findAll: findAll,
  findQuery: findQuery
});
