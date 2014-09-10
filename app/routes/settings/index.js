import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('settings/index');
    this.render('settings/search', {outlet:'search', into:'application'});
  }
});
