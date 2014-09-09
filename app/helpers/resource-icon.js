import Ember from 'ember';

function selectIcon(value, opts) {
  var icon = '';
  if (value === 'Location') {
    icon = 'map-marker';
  } else if (value === 'Equipment') {
    icon = 'facetime-video';
  }
  return new Ember.Handlebars.SafeString('<span class="glyphicon glyphicon-' + icon + '"></span>');
}

export { selectIcon };

export default Ember.Handlebars.makeBoundHelper(selectIcon);
