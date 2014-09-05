import DS from 'ember-data';

export default DS.Model.extend({
  cn: DS.attr('string'),
  description: DS.attr('string'),
  displayName: DS.attr('string'),
  isExternal: DS.attr('boolean'),
  name: DS.attr('string'),
  sn: DS.attr('string'),
  uid: DS.attr('string'),
  zimbraAccountStatus: DS.attr('string'),
  zimbraAliasTargetId: DS.attr('string'),
  zimbraAuthTokenValidityValue: DS.attr('string'),
  zimbraCalResType: DS.attr('string'),
  zimbraCOSId: DS.attr('string'),
  zimbraDomainName: DS.attr('string'),
  zimbraDomainStatus: DS.attr('string'),
  zimbraDomainType: DS.attr('string'),
  zimbraId: DS.attr('string'),
  zimbraIsAdminAccount: DS.attr('boolean'),
  zimbraIsAdminGroup: DS.attr('boolean'),
  zimbraIsDelegatedAdminAccount: DS.attr('boolean'),
  zimbraIsExternalVirtualAccount: DS.attr('boolean'),
  zimbraIsSystemAccount: DS.attr('boolean'),
  zimbraIsSystemResource: DS.attr('boolean'),
  zimbraLastLogonTimestamp: DS.attr('date'),
  zimbraMailHost: DS.attr('string'),
  zimbraMailStatus: DS.attr('string')
});


