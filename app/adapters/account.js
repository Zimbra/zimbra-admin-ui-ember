import DS from 'ember-data';
import Ember from 'ember';
import zimbra from 'zimbra-ember-data/utils/zimbra';


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
    zimbra.auth(ZimbraEmberDataENV.zimbra.soap.adminUrl, ZimbraEmberDataENV.zimbra.admin.user, ZimbraEmberDataENV.zimbra.admin.pass, asAdmin).then(function(authRes) {
      var zimbraAuthToken = authRes.authToken[0]._content;
      var opts = {
        applyConfig: false,
        applyCos: false,
        types: 'accounts',
        // attrs: 'displayName,zimbraId,zimbraAliasTargetId,cn,sn,zimbraMailHost,uid,zimbraCOSId,zimbraAccountStatus,zimbraLastLogonTimestamp,description,zimbraIsSystemAccount,zimbraIsDelegatedAdminAccount,zimbraIsAdminAccount,zimbraIsSystemResource,zimbraAuthTokenValidityValue,zimbraIsExternalVirtualAccount,zimbraMailStatus,zimbraIsAdminGroup,zimbraCalResType,zimbraDomainType,zimbraDomainName,zimbraDomainStatus,zimbraIsDelegatedAdminAccount,zimbraIsAdminAccount,zimbraIsSystemResource,zimbraIsSystemAccount,zimbraIsExternalVirtualAccount',
        query: generateQuery(query)
      };
      return zimbra.request(ZimbraEmberDataENV.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:SearchDirectoryRequest', opts);
    
    }).then(
      function(res) {
        // Flatten the JSON representation from JSONified Zimbra XML to something flatter and Ember Data friendly
        _.each(res.account, function(account, index) {
          _.each(account.a, function(attr) {
            account[attr.n] = attr._content;
          });
          delete account.a;
        });
        resolve(res.account);
        
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
    if (key == 'id') {
      result.push('(zimbraId=' + value + ')');
    } else if (key == 'zimbraIsSystemAccount') {
      if (value === true) {
        result.push('(' + key + '=TRUE)');
      } else {
        result.push('(!(' + key + '=TRUE))');
      }
    }
  }, {});
  return '(&' + result.join('') + ')';
};


export default DS.Adapter.extend({
  find: find,
  findAll: findAll,
  findQuery: findQuery
});
