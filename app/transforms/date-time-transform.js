import DS from 'ember-data';

var format = 'YYYYMMDDHHmmss';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return moment.utc(serialized, format).toDate();
  },

  serialize: function(deserialized) {
    return moment(deserialized).format(format);
  }
});
