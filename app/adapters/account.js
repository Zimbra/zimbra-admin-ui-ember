import Ember from 'ember';
import DS from 'ember-data';
import zimbra from 'zimbra-ember-data/utils/zimbra';

export default DS.Adapter.extend({
	
	findAll: function (store, type) {
		console.log('** findAll', type);
		
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      
      var asAdmin = true;
      zimbra.auth(ZimbraEmberDataENV.zimbra.soap.adminUrl, ZimbraEmberDataENV.zimbra.admin.user, ZimbraEmberDataENV.zimbra.admin.pass, asAdmin).then(function(authRes) {
        var zimbraAuthToken = authRes.authToken[0]._content;
        var opts = {
          applyConfig: false,
          applyCos: false,
          types: 'accounts',
          // attrs: 'displayName,zimbraId,zimbraAliasTargetId,cn,sn,zimbraMailHost,uid,zimbraCOSId,zimbraAccountStatus,zimbraLastLogonTimestamp,description,zimbraIsSystemAccount,zimbraIsDelegatedAdminAccount,zimbraIsAdminAccount,zimbraIsSystemResource,zimbraAuthTokenValidityValue,zimbraIsExternalVirtualAccount,zimbraMailStatus,zimbraIsAdminGroup,zimbraCalResType,zimbraDomainType,zimbraDomainName,zimbraDomainStatus,zimbraIsDelegatedAdminAccount,zimbraIsAdminAccount,zimbraIsSystemResource,zimbraIsSystemAccount,zimbraIsExternalVirtualAccount',
          query: '(!(zimbraIsSystemAccount=TRUE))'
        };
        return zimbra.request(ZimbraEmberDataENV.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:SearchDirectoryRequest', opts);
      
      }).then(
        function(res) {
          // Flatten the JSON representation from JSONified Zimbra XML to something flatter and Ember Data friendly
          _.each(res.account, function(account, index) {
            _.each(account.a, function(attr) {
              account[attr.n] = attr._content;
            });
          });
          resolve(res.account);
          
        }, function(err) {
          reject(err);
        }
      );
    });
		return promise;
	},
	
	
	findQuery: function (store, type, query) {
		console.log('** findQuery');
	}
});
