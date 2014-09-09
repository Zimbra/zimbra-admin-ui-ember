import DS from 'ember-data';

export default DS.Model.extend({
  exception: DS.attr('string'),
  message: DS.attr('string')
});
