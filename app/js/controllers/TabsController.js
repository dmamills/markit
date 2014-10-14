angular.module('markit.controllers')
.controller('TabsController',function($scope,$rootScope,fileDialog) {


	$scope.workspaces = $rootScope.workspaces;
	$scope.previousContent = '';

	$scope.selectWorkspace = function(workspace) {
		$scope.workspace = workspace;
		$scope.previousContent = workspace.content;
	}

	function afterSave(err) {
		if(err) throw err;
		$rootScope.workspaces.splice($scope.workspaces.indexOf(workspace),1);
	};

	$scope.close = function(workspace) {
		//check for changes
		if(workspace.content !== $scope.previousContent) {
			if(confirm('Save changes?')) {
				//new file?
				if(workspace.filename === '') {
					fileDialog.saveAs(function(filename) {
						workspace.filename = filename;
						fs.writeFile(workspace.filename,workspace.content,afterSave);
					},false,'text/x-markdown');
				} else {
					fs.writeFile(workspace.filename,workspace.content,afterSave);
				}
			}
		} else {
			$rootScope.workspaces.splice($scope.workspaces.indexOf(workspace),1);
		}
	};

})
