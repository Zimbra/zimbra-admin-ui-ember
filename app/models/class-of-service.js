import DS from 'ember-data';

export default DS.Model.extend({
  cn: DS.attr('string'),
  description: DS.attr('string'),
  
  name: Ember.computed.alias('cn')
});
