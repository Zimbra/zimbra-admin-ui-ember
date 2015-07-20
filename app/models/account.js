import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  cn: DS.attr('string'),
  description: DS.attr('string'),
  displayName: DS.attr('string'),
  givenName: DS.attr('string'),
  initials: DS.attr('string'),
  isExternal: DS.attr('boolean'),
  name: DS.attr('string'),
  sn: DS.attr('string'),
  uid: DS.attr('string'),
  zimbraAccountStatus: DS.attr('string'),
  zimbraAliasTargetId: DS.attr('string'),
  zimbraAuthTokenValidityValue: DS.attr('string'),
  zimbraCalResType: DS.attr('string'),
  zimbraCreateTimestamp: DS.attr('date-time-transform'),
  zimbraDomainName: DS.attr('string'),
  zimbraDomainStatus: DS.attr('string'),
  zimbraDomainType: DS.attr('string'),
  zimbraHideInGal: DS.attr('boolean'),
  zimbraId: DS.attr('string'),
  zimbraIsAdminAccount: DS.attr('boolean'),
  zimbraIsAdminGroup: DS.attr('boolean'),
  zimbraIsDelegatedAdminAccount: DS.attr('boolean'),
  zimbraIsExternalVirtualAccount: DS.attr('boolean'),
  zimbraIsSystemAccount: DS.attr('boolean'),
  zimbraIsSystemResource: DS.attr('boolean'),
  zimbraLastLogonTimestamp: DS.attr('date-time-transform'),
  zimbraMailHost: DS.attr('string'),
  zimbraMailQuota: DS.attr('number'),
  zimbraMailStatus: DS.attr('string'),
  zimbraNotes: DS.attr('string'),
  
  zimbraCOSId: DS.belongsTo('class-of-service'),
  
  cos: Ember.computed.alias('zimbraCOSId'), // TODO: treat empty as 'default'
  created: Ember.computed.alias('zimbraCreateTimestamp'),
  notes: Ember.computed.alias('zimbraNotes'),
  
  cosAuto: function() {
    return _.isEmpty(this.get('zimbraCOSId'));
  }.property('zimbraCOSId'),
  
  domain: function() {
    return this.get('name').split('@')[1];
  }.property('name'),

});
