angular.module('markit.controllers',[])
.controller('MenuController',function($rootScope,$scope,$state,fileDialog) {

	function setContents(err,data) {
		$scope.contents = data.toString();
		$scope.$apply();
	};

	function getActiveWorkspace() {
		var workspaces = $rootScope.workspaces;
		for(var i=0; i < workspaces.length;i++) {
			if(workspaces[i].active) return workspaces[i];
		}
	};

	$scope.new = function() {
		var workspace = {
			filename:'',
			content:''
		};

		$rootScope.workspaces.push(workspace);
		$state.transitionTo($state.current,{},{reload:true,notify:true});
	}

	$scope.open = function() {
		fileDialog.openFile(function(filename) {	
			
			fs.readFile(filename,function(err,data) {
				if(err)throw err;
				var workspace = {
					filename:filename,
					content:data.toString()
				};

				$rootScope.workspaces.push(workspace);
				$state.transitionTo($state.current,{},{reload:true,notify:true});
			});
		},false,'text/x-markdown');
	};

	$scope.save = function() {
		
		var workspace = getActiveWorkspace();
		if(workspace.filename) {
			fs.writeFile(workspace.filename,workspace.content,function(err) {
				if(err) throw err;
				alert('saved file as ' + workspace.filename);
			});	
		} else {
			fileDialog.saveAs(function(filename) {
				workspace.filename = filename;
				fs.writeFile(filename,workspace.content,function(err) {
					if(err) throw err;
					alert('saved as ' + filename);
				});
			},false,'text/x-markdown');
		} 
	};
})
