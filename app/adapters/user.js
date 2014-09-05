import Ember from 'ember';
import DS from 'ember-data';
import zimbra from 'zimbra-ember-data/utils/zimbra';

export default DS.Adapter.extend({
	
	findAll: function (store, type) {
		console.log('** findAll', type);
		
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      
      var asAdmin = true;
      zimbra.auth(ZimbraEmberDataENV.zimbra.soap.adminUrl, ZimbraEmberDataENV.zimbra.admin.user, ZimbraEmberDataENV.zimbra.admin.pass, asAdmin).then(function(authRes) {
        // console.log("AuthResponse", authRes);
        var zimbraAuthToken = authRes.authToken[0]._content;
        var opts = {
          applyConfig: false,
          applyCos: false,
          types: 'accounts',
          attrs: 'displayName,zimbraId',
          query: '(!(zimbraIsSystemAccount=TRUE))'
        };
        return zimbra.request(ZimbraEmberDataENV.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:SearchDirectoryRequest', opts);
      
      }).then(
        function(res) {
          console.log("SearchDirectoryResponse success", res.account);
          resolve(res.account);
          
        }, function(err) {
          console.log("** err", err);
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
