import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  zimbraCreateTimestamp: DS.attr('date-time-transform'),
  zimbraDNSCheckHostname: DS.attr('string'),
  zimbraDomainName: DS.attr('string'),
  zimbraDomainStatus: DS.attr('string'),
  zimbraDomainType: DS.attr('string'),
  zimbraId: DS.attr('string'),
  zimbraNotes: DS.attr('string'),
  zimbraPrefTimeZoneId: DS.attr('string'),
  zimbraPublicServiceHostname: DS.attr('string'),
  zimbraPublicServicePort: DS.attr('number'),
  zimbraPublicServiceProtocol: DS.attr('string'),
  
  created: Ember.computed.alias('zimbraCreateTimestamp'),
  name: Ember.computed.alias('zimbraDomainName'),
  notes: Ember.computed.alias('zimbraNotes'),
  status: Ember.computed.alias('zimbraDomainStatus'),
  type: Ember.computed.alias('zimbraDomainType'),
});
