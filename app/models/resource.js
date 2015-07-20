import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  displayName: DS.attr('string'),
  name: DS.attr('string'),
  uid: DS.attr('string'),
  zimbraAccountStatus: DS.attr('string'),
  zimbraCalResType: DS.attr('string'),
  zimbraCreateTimestamp: DS.attr('date-time-transform'),
  zimbraId: DS.attr('string'),
  zimbraIsAdminAccount: DS.attr('boolean'),
  zimbraIsDelegatedAdminAccount: DS.attr('boolean'),
  zimbraIsExternalVirtualAccount: DS.attr('boolean'),
  zimbraIsSystemAccount: DS.attr('boolean'),
  zimbraIsSystemResource: DS.attr('boolean'),
  zimbraMailHost: DS.attr('string'),
  zimbraNotes: DS.attr('string'),
  
  created: Ember.computed.alias('zimbraCreateTimestamp'),
  notes: Ember.computed.alias('zimbraNotes'),

  active: function() {
    return this.get('zimbraAccountStatus') === 'active';
  }.property('zimbraAccountStatus'),
  
  domain: function() {
    return this.get('name').split('@')[1];
  }.property('name'),
});
