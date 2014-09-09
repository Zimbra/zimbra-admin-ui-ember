import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized === 'yes';
  },

  serialize: function(deserialized) {
    if (typeof(deserialized) === 'undefined') {
      return undefined;
    }
    return deserialized ? 'yes' : 'no';
  }
});
