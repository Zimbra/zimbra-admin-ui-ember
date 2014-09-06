import Ember from 'ember';

export default Ember.View.extend({
  
  // This observer detects a tag "active" class settings, and moves it up into the <li> parent element
  // used by Bootstrap to show which tab is active. 
  currentPathDidChange: function() {
    Ember.run.next( this, function() {
      this.$("ul.nav li:has(>a.active)").addClass('active');
      this.$("ul.nav li:not(:has(>a.active))").removeClass('active');
    });
  }.observes('controller.currentPath')
  
});
