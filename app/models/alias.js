import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  name: DS.attr('string'),
  targetName: DS.attr('string'),
  type: DS.attr('string'),
  uid: DS.attr('string'),
  zimbraAliasTargetId: DS.attr('string'),
  zimbraId: DS.attr('string'),
  zimbraIsAdminAccount: DS.attr('boolean'),
  zimbraIsDelegatedAdminAccount: DS.attr('boolean'),
  zimbraIsExternalVirtualAccount: DS.attr('boolean'),
  zimbraIsSystemAccount: DS.attr('boolean'),
  zimbraIsSystemResource: DS.attr('boolean')
});
