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
      var extraSoapHeaders = {
        targetServer: query.server
      };
      var opts = {
        accountListOffset: 0,
        accountListCount: 0,
        accountListStatus: 'NONE',
        backupListOffset: 0,
        backupListCount: 50,
        query: {
          _attrs: {
            target: '/opt/zimbra/backup'
          }
        },
        type: 'server'
      };
      return zimbra.request(ZimbraEmberDataENV.zimbra.soap.adminUrl, zimbraAuthToken, 'zimbraAdmin:BackupQueryRequest', opts, extraSoapHeaders);
    
    }).then(
      function(res) {
        // Flatten the JSON representation from JSONified Zimbra XML to something flatter and Ember Data friendly
        _.each(res.backup, function(backup, index) {
          backup.accountsCompleted = backup.accounts[0].completionCount;
          backup.accountsErrors = backup.accounts[0].errorCount;
          backup.accountsTotal = backup.accounts[0].total;
          backup.id = backup.label;
          backup.server = query.server;
          delete backup.label;
        });
        resolve(res.backup);
        
      }, function(err) {
        reject(err);
      }
    );
  });
  return promise;
};


export default DS.Adapter.extend({
  find: find,
  findAll: findAll,
  findQuery: findQuery
});
