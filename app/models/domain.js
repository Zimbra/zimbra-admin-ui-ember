import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  zimbraDomainName: DS.attr('string'),
  zimbraDomainStatus: DS.attr('string'),
  zimbraId: DS.attr('string'),
  zimbraDomainType: DS.attr('string'),
  
  name: Ember.computed.alias('zimbraDomainName'),
  status: Ember.computed.alias('zimbraDomainStatus'),
  type: Ember.computed.alias('zimbraDomainType'),
});
