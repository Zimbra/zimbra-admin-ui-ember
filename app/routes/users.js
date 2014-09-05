import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
	    /*return [{
	      first: "John",
	      last: "Doe"
	    }, {
	      first: "Mary",
	      last: "Jane"
	    }];*/
	   return this.store.findAll('user');
	}
});
