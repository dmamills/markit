angular.module('markit.controllers')
.controller('EditorController',function($scope,$rootScope) {

	console.log($scope.workspace);

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
