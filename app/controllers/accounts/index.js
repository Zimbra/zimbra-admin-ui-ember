import Ember from 'ember';

export default Ember.ArrayController.extend({
  searchFor: null,
  
  searchResult: function() {
    var searchFor = this.get('searchFor');
    var config = this.get('model');
    if (!config) {
      return [];
    }
    if (searchFor) {
      var regex = new RegExp(searchFor, 'i');
      return config.filter(function(item) {
        return regex.test(Ember.get(item,'name'))
          || regex.test(Ember.get(item,'zimbraAccountStatus'))
          || regex.test(Ember.get(item,'displayName'))
          || regex.test(Ember.get(item,'description'));
      });
    } else {
      return config;
    }
  }.property('searchFor')
});
