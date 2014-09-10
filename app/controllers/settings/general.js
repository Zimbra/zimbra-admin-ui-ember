import Ember from 'ember';

export default Ember.ArrayController.extend({
  
  zimbraDefaultDomainName: function() {
    return getValue(this, 'zimbraDefaultDomainName');
  }.property('@each.id'),
  
  zimbraGalMaxResults: function() {
    return getValue(this, 'zimbraGalMaxResults');
  }.property('@each.id'),
  
  zimbraHelpAdminURL: function() {
    return getValue(this, 'zimbraHelpAdminURL');
  }.property('@each.id'),
  
  zimbraHelpDelegatedURL: function() {
    return getValue(this, 'zimbraHelpDelegatedURL');
  }.property('@each.id'),
  
  zimbraMailContentMaxSize: function() {
    return getValue(this, 'zimbraMailContentMaxSize');
  }.property('@each.id'),
  
  zimbraMailPurgeSleepInterval: function() {
    return getValue(this, 'zimbraMailPurgeSleepInterval');
  }.property('@each.id'),
  
  zimbraScheduledTaskNumThreads: function() {
    return getValue(this, 'zimbraScheduledTaskNumThreads');
  }.property('@each.id')
});


var getValue = function(obj, key) {
  var attr = obj.findBy('id', key);
  if (attr) {
    return Ember.get(attr, 'value');
  }
};
