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
        return regex.test(Em.get(item,'id')) || regex.test(Em.get(item,'value'));
      });
    } else {
      return config;
    }
  }.property('searchFor')
});
