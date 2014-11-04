angular.module('markit.controllers')
.controller('FooterController',function($scope) {

	$scope.filename = '';
	$scope.$on('update file',function(event,msg) {
		$scope.$apply(function() {
			$scope.filename = msg;
		})
	});

});
