angular.module('markit.filters')
.filter('markitMarked',function() {
	return function(input) {
		if(!input) return '';
		return marked(input);
	};
})
