import Ember from 'ember';

function momentFunc(value, opts) {
  if (!value) {
    if (opts.hash.defaultValue) {
      return opts.hash.defaultValue;
    } else {
      return null;
    }
  }
  if (opts.hash.format == 'fromNow') {
    return moment(value).fromNow();
  } else if (opts.hash.format) {
    return moment(value).format(opts.hash.format);
  } else {
    return value;
  }
}

export { momentFunc };

export default Ember.Handlebars.makeBoundHelper(momentFunc);
