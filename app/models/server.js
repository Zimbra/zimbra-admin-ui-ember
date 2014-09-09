import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  zimbraCreateTimestamp: DS.attr('date-time-transform'),
  zimbraLmtpAdvertisedName: DS.attr('string'),
  zimbraLmtpBindAddress: DS.attr('number'),
  zimbraMailPurgeSleepInterval: DS.attr('string'),
  zimbraNotes: DS.attr('string'),
  zimbraReverseProxyLookupTarget: DS.attr('boolean'),
  zimbraServiceHostname: DS.attr('string'),
  zimbraScheduledTaskNumThreads: DS.attr('number'),
  zimbraId: DS.attr('string'),
  
  created: Ember.computed.alias('zimbraCreateTimestamp'),
  name: Ember.computed.alias('zimbraServiceHostname'),
  notes: Ember.computed.alias('zimbraNotes')
});
