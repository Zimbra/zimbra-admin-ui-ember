import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  zimbraCreateTimestamp: DS.attr('date-time-transform'),
  zimbraId: DS.attr('string'),
  zimbraLmtpAdvertisedName: DS.attr('string'),
  zimbraLmtpBindAddress: DS.attr('number'),
  zimbraMailPurgeSleepInterval: DS.attr('string'),
  zimbraMilterBindAddress: DS.attr('string'),
  zimbraMilterServerEnabled: DS.attr('boolean'),
  zimbraMtaDnsLookupsEnabled: DS.attr('boolean'),
  zimbraMtaFallbackRelayHost: DS.attr('string'),
  zimbraMtaMyNetworks: DS.attr('string'),
  zimbraMtaRelayHost: DS.attr('string'),
  zimbraMtaSaslAuthEnable: DS.attr('boolean-yesno'),
  zimbraMtaTlsAuthOnly: DS.attr('boolean'),
  zimbraNotes: DS.attr('string'),
  zimbraReverseProxyLookupTarget: DS.attr('boolean'),
  zimbraScheduledTaskNumThreads: DS.attr('number'),
  zimbraServiceHostname: DS.attr('string'),
  zimbraSmtpPort: DS.attr('number'),
  zimbraSmtpTimeout: DS.attr('number'),
  
  created: Ember.computed.alias('zimbraCreateTimestamp'),
  name: Ember.computed.alias('zimbraServiceHostname'),
  notes: Ember.computed.alias('zimbraNotes'),
  
  zimbraMtaRelayHostServer: function(key, value, prevValue) {
    // setter
    if (arguments.length > 1) {
      // TODO
    }
    
    // getter
    var str = this.get('zimbraMtaRelayHost');
    if (str) {
      var parts = str.split(':');
      if (parts) {
        return parts[0];
      }
    }
  }.property('zimbraMtaRelayHost'),
  
  zimbraMtaRelayHostPort: function(key, value, prevValue) {
    // setter
    if (arguments.length > 1) {
      // TODO
    }
    
    // getter
    var str = this.get('zimbraMtaRelayHost');
    if (str) {
      var parts = str.split(':');
      if (parts) {
        return parts[1];
      }
    }
  }.property('zimbraMtaRelayHost'),
  
  zimbraMtaFallbackRelayHostServer: function(key, value, prevValue) {
    // setter
    if (arguments.length > 1) {
      // TODO
    }
    
    // getter
    var str = this.get('zimbraMtaFallbackRelayHost');
    if (str) {
      var parts = str.split(':');
      if (parts) {
        return parts[0];
      }
    }
  }.property('zimbraMtaFallbackRelayHost'),
  
  zimbraMtaFallbackRelayHostPort: function(key, value, prevValue) {
    // setter
    if (arguments.length > 1) {
      // TODO
    }
    
    // getter
    var str = this.get('zimbraMtaFallbackRelayHost');
    if (str) {
      var parts = str.split(':');
      if (parts) {
        return parts[1];
      }
    }
  }.property('zimbraMtaFallbackRelayHost')
});
