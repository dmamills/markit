angular.module('markit.controllers')
.controller('EditorController',function($scope,$rootScope) {

	$scope.editorOptions = {
		lineWrapping:true,
		theme:'monokai',
		mode:'markdown'
	};

	$scope.output = function(content) {
		if(content === undefined) return '';
		return marked(content);
	};

})
