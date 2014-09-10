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
// findQuery
//
var findQuery = function (store, type, query) {
  var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    var asAdmin = true;
    zimbra.auth(ZimbraEmberDataENV.zimbra.soap.adminUrl, ZimbraEmberDataENV.zimbra.admin.user, ZimbraEmberDataENV.zimbra.admin.pass, asAdmin).then(function(authRes) {
      var zimbraAuthToken = authRes.authToken[0]._content;
      var opts = {};
      return zimbra.request(ZimbraEmberDataENV.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:GetAllConfigRequest', opts);
    
    }).then(
      function(res) {
        var result = [];
        _.each(res.a, function(attr) {
          var existing = _.findWhere(result, {id:attr.n}); 
          if (existing) {
            existing.value += ',' + attr._content;
          } else {
            var configAttr = {
                id: attr.n,
                value: attr._content
              };
            result.push(configAttr);
          }
        });
        result = _.sortBy(result, 'id');
        resolve(result);
        
      }, function(err) {
        reject(err);
      }
    );
  });
  return promise;
};


export default DS.Adapter.extend({
  findAll: findAll,
  findQuery: findQuery
});
