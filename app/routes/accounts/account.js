import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('coses', this.store.findAll('class-of-service'));
    controller.set('domains', this.store.findAll('domain'));
  }
});
