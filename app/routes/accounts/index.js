import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('accounts/index');
    this.render('accounts/search', {outlet:'search', into:'application'});
  }
});
