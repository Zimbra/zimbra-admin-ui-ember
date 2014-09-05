import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  zimbraCreateTimestamp: DS.attr('date-time-transform'),
  zimbraZimletDescription: DS.attr('string'),
  zimbraZimletEnabled: DS.attr('boolean'),
  zimbraZimletHandlerClass: DS.attr('string'),
  zimbraZimletHandlerConfig: DS.attr('string'),
  zimbraZimletIndexingEnabled: DS.attr('boolean'),
  zimbraZimletIsExtension: DS.attr('boolean'),
  zimbraZimletKeyword: DS.attr('string'),
  zimbraZimletPriority: DS.attr('String'),
  zimbraZimletVersion: DS.attr('String'),
  
  created: Ember.computed.alias('zimbraCreateTimestamp'),
  description: Ember.computed.alias('zimbraZimletDescription'),
  enabled: Ember.computed.alias('zimbraZimletEnabled'),
  handlerClass: Ember.computed.alias('zimbraZimletHandlerClass'),
  handlerConfig: Ember.computed.alias('zimbraZimletHandlerConfig'),
  indexingEnabled: Ember.computed.alias('zimbraZimletIndexingEnabled'),
  isExtension: Ember.computed.alias('zimbraZimletIsExtension'),
  keyword: Ember.computed.alias('zimbraZimletKeyword'),
  priority: Ember.computed.alias('zimbraZimletPriority'),
  version: Ember.computed.alias('zimbraZimletVersion')
});
