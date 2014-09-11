import DS from 'ember-data';
import Ember from 'ember';
import zimbra from 'zimbra-ember-data/utils/zimbra';

var attrs = [
  'description',
  'targetName',
  'type',
  'uid',
  'zimbraAliasTargetId',
  'zimbraId',
  'zimbraIsAdminAccount',
  'zimbraIsDelegatedAdminAccount',
  'zimbraIsExternalVirtualAccount',
  'zimbraIsSystemAccount',
  'zimbraIsSystemResource'
];
  
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
    zimbra.auth(ZimbraEmberDataENV.zimbra.soap.adminUrl, ZimbraEmberDataENV.zimbra.admin.user, ZimbraEmberDataENV.zimbra.admin.pass, asAdmin).then(function(authRes) {
      var zimbraAuthToken = authRes.authToken[0]._content;
      var opts = {
        applyConfig: false,
        applyCos: false,
        types: 'aliases',
        attrs: attrs.join(','),
        query: generateQuery(query)
      };
      return zimbra.request(ZimbraEmberDataENV.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:SearchDirectoryRequest', opts);
    
    }).then(
      function(res) {
        // Flatten the JSON representation from JSONified Zimbra XML to something flatter and Ember Data friendly
        _.each(res.alias, function(alias, index) {
          _.each(alias.a, function(attr) {
            alias[attr.n] = attr._content;
          });
          delete alias.a;
        });
        resolve(res.alias);
        
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
  var result = [];
  _.forEach(_.keys(filter), function(key) {
    var value = filter[key];
    if (key == 'zimbraIsSystemAccount') {
      if (value === true) {
        result.push('(' + key + '=TRUE)');
      } else {
        result.push('(!(' + key + '=TRUE))');
      }
    }
  }, {});
  return result.join('');
};


export default DS.Adapter.extend({
  findAll: findAll,
  findQuery: findQuery
});
