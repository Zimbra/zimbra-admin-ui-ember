import DS from 'ember-data';
import Ember from 'ember';
import zimbra from 'zimbra-ember-data/utils/zimbra';
import config from '../config/environment';

  
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
      var opts = {};
      return zimbra.request(config.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:GetAllConfigRequest', opts);
    
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
