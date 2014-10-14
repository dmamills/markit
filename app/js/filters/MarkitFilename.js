angular.module('markit.filters',[])
.filter('markitFilename',function() {
	return function(input) {
		if(!input) return '';
		if(input === '') return '[no name]';
		return input;
	};
})
