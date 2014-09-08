import DS from 'ember-data';

export default DS.Model.extend({
  aborted: DS.attr('boolean'),
  accountListCount: DS.attr('number'),
  accountListOffset: DS.attr('number'),
  accountListStatus: DS.attr('string'),
  accountsCompleted: DS.attr('number'),
  accountsErrors: DS.attr('number'),
  accountsTotal: DS.attr('number'),
  end: DS.attr('date'),
  live: DS.attr('boolean'),
  maxRedoSeq: DS.attr('number'),
  minRedoSeq: DS.attr('number'),
  target: DS.attr('string'),
  start: DS.attr('date'),
  type: DS.attr('string'),
  
  server: DS.belongsTo('server'),
  
  label: Ember.computed.alias('id')
});
