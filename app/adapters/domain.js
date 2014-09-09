import DS from 'ember-data';
import Ember from 'ember';
import zimbra from 'zimbra-ember-data/utils/zimbra';

var attrs = [
  'description',
  'zimbraCreateTimestamp',
  'zimbraDNSCheckHostname',
  'zimbraDomainName',
  'zimbraDomainStatus',
  'zimbraDomainType',
  'zimbraId',
  'zimbraNotes',
  'zimbraPrefTimeZoneId',
  'zimbraPublicServiceHostname',
  'zimbraPublicServicePort',
  'zimbraPublicServiceProtocol'
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
        types: 'domains',
        attrs: attrs.join(','),
        query: generateQuery(query)
      };
      return zimbra.request(ZimbraEmberDataENV.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:SearchDirectoryRequest', opts);
    
    }).then(
      function(res) {
        // Flatten the JSON representation from JSONified Zimbra XML to something flatter and Ember Data friendly
        _.each(res.domain, function(domain, index) {
          _.each(domain.a, function(attr) {
            domain[attr.n] = attr._content;
          });
          delete domain.a;
        });
        resolve(res.domain);
        
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
  findAll: findAll,
  findQuery: findQuery
});
