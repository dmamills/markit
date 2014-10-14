angular.module('markit')
.config(function($stateProvider,$urlRouterProvider) {

	$stateProvider.state('app', {
		url:'/app',
		templateUrl:'menu.html',
		controller:'MenuController'
	})
	.state('app.main',{
		url:'/main',
		templateUrl:'app.html',
		controller:'TabsController'
	});

	$urlRouterProvider.otherwise('/app/main');
})
