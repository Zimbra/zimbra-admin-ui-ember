import DS from 'ember-data';
import Ember from 'ember';
import zimbra from 'zimbra-ember-data/utils/zimbra';

//
// findAll 
//
var findAll = function (store, type) {
  return findQuery(store, type, {});
};


//
// findQuery. Currently performs a client-side post-processing filter, for convenience.
//
var findQuery = function (store, type, query) {
  var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    var asAdmin = true;
    zimbra.auth(ZimbraEmberDataENV.zimbra.soap.adminUrl, ZimbraEmberDataENV.zimbra.admin.user, ZimbraEmberDataENV.zimbra.admin.pass, asAdmin).then(function(authRes) {
      var zimbraAuthToken = authRes.authToken[0]._content;
      var opts = {
        applyConfig: false,
        applyCos: false,
        types: 'resources',
        attrs: 'displayName,zimbraId,zimbraMailHost,uid,zimbraAccountStatus,description,zimbraCalResType,zimbraIsDelegatedAdminAccount,zimbraIsAdminAccount,zimbraIsSystemResource,zimbraIsSystemAccount,zimbraIsExternalVirtualAccount',
        query: generateQuery(query)
      };
      return zimbra.request(ZimbraEmberDataENV.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:SearchDirectoryRequest', opts);
    
    }).then(
      function(res) {
        // Flatten the JSON representation from JSONified Zimbra XML to something flatter and Ember Data friendly
        _.each(res.calresource, function(resource, index) {
          _.each(resource.a, function(attr) {
            resource[attr.n] = attr._content;
          });
          delete resource.a;
        });
        resolve(res.calresource);
        
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
