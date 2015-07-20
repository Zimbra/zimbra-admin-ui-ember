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
      var opts = {
        exclude: generateExclude(query),
      };
      return zimbra.request(config.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:GetAllZimletsRequest', opts);
    
    }).then(
      function(res) {
        // Flatten the JSON representation from JSONified Zimbra XML to something flatter and Ember Data friendly
        if (res.zimlet) {
          _.each(res.zimlet, function(zimlet, index) {
            _.each(zimlet.a, function(attr) {
              zimlet[attr.n] = attr._content;
            });
            delete zimlet.a;
          });
        }
        resolve(res.zimlet || []);
        
      }, function(err) {
        reject(err);
      }
    );
  });
  return promise;
};


//
// Translate Mongo-style Ember Data filter into Zimbra GetAllZimletsRequest exclude attribute.
//
var generateExclude = function(filter) {
  if (!filter) {
    return '';
  }
  var value = filter.zimbraZimletIsExtension;
  if (typeof(value) === 'undefined') {
    return '';
  } else if (value === true) {
    return 'mail';
  } else {
    return 'extension';
  }
};


export default DS.Adapter.extend({
  findAll: findAll,
  findQuery: findQuery
});
