angular.module('markit.controllers',[])
.controller('MenuController',function($rootScope,$scope,$state,$filter,fileDialog,WorkspaceService,ClipboardService) {


	function transitionToWorkspace(workspace) {
		
		$rootScope.workspaces.push(workspace);
		$scope.$broadcast('update file',workspace.filename);
		$state.transitionTo($state.current,{},{reload:true,notify:true});
		$scope.$$childHead.workspaces[$scope.$$childHead.workspaces.length-1].active = true;
		$scope.$$childHead.selectWorkspace($rootScope.workspaces[$rootScope.workspaces.length-1]);


	}

	function getActiveWorkspace() {
		var workspaces = $rootScope.workspaces;
		for(var i=0; i < workspaces.length;i++) {
			if(workspaces[i].active) return workspaces[i];
		}
	};

	$scope.new = function() {

		var workspace = WorkspaceService.create();
		transitionToWorkspace(workspace);
	}

	$scope.open = function() {

		fileDialog.openFile(function(filename) {	
			
			WorkspaceService.open(filename,function(err,workspace) {
				transitionToWorkspace(workspace);
			});
		},false,'text/x-markdown');
	};

	$scope.save = function() {

		var workspace = getActiveWorkspace();
		if(workspace.filename) {
			WorkspaceService.save(workspace,function(err) {
				if(err) throw err;
				alert('saved file as ' + workspace.filename);
			});
		} else {
			WorkspaceService.saveAs(workspace,function(err,workspace) {
				if(err) throw err;
				alert('saved as ' + filename);
			});
		}
	};

	$scope.copyHtml = function() {
		var workspace = getActiveWorkspace();
		if(workspace === null) {
			console.log('No workspace active');
			return;
		}
		var result = $filter('markitMarked')(workspace.content);
		ClipboardService.set(result,'text');
	};

	$scope.exportHtml = function() {

	};
})
