var fs = require('fs');

angular.module('markit',['ngSanitize','ui.bootstrap','ui.router','ui.codemirror','DWand.nw-fileDialog','markit.controllers','markit.filters'])
.run(function($rootScope) {
	$rootScope.workspaces = [];
})
