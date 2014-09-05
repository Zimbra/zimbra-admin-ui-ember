import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  zimbraServiceHostname: DS.attr('string'),
  zimbraId: DS.attr('string'),
  
  name: Ember.computed.alias('zimbraServiceHostname')
});
