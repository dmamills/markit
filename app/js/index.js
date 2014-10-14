var fs = require('fs');
var demo_path = '/Users/mills/projects/markit/app/demo.md';

angular.module('markit',['ngSanitize','ui.bootstrap','ui.router','ui.codemirror','DWand.nw-fileDialog'])
.filter('convertMD',function() {
	return function(input) {
		if(input === undefined) return '';
		var result = marked(input);
		
		return result;
	};
})
.controller('MenuController',function($rootScope,$scope,$state,fileDialog) {

	$scope.new = function() {
		$rootScope.filename = undefined;
		$state.transitionTo($state.current,{},{reload:true,notify:true});
	}

	$scope.open = function() {
		fileDialog.openFile(function(filename) {	
			$rootScope.filename = filename;
			$state.transitionTo($state.current,{},{reload:true,notify:true});
		},false,'text/x-markdown');
	};

})
.controller('TestController',function($scope,$rootScope,fileDialog) {

	$scope.filename = $rootScope.filename;

	$scope.editorOptions = {
		lineWrapping:true,
		theme:'monokai',
		mode:'markdown'
	};

	function setContents(err,data) {
		$scope.contents = data.toString();
		$scope.$apply();
	};

	if($scope.filename !== undefined)
		fs.readFile($scope.filename,setContents);
	else 
		$scope.contents = '';

	$scope.output = function() {
		if($scope.contents === undefined) return '';
		return marked($scope.contents);
	};
	$scope.open = function() {
		fileDialog.openFile(function(filename) {
			$scope.filename = filename;
			fs.readFile(filename,setContents);
		},false,'text/x-markdown');
	};
})
.run(function($rootScope) {
	console.log('hey');
})
.config(function($stateProvider,$urlRouterProvider) {

	$stateProvider.state('app', {
		url:'/app',
		templateUrl:'menu.html',
		controller:'MenuController'
	})
	.state('app.main',{
		url:'/main',
		templateUrl:'app.html',
		controller:'TestController'
	});

	$urlRouterProvider.otherwise('/app/main');
})
