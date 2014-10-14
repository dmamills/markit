angular.module('markit.controllers',[])
.controller('MenuController',function($rootScope,$scope,$state,fileDialog) {

	function setContents(err,data) {
		$scope.contents = data.toString();
		$scope.$apply();
	};

	$scope.new = function() {
		var workspace = {
			filename:'',
			content:'',
			changed:false,
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
					content:data.toString(),
					changed:false
				};

				$rootScope.workspaces.push(workspace);
				$state.transitionTo($state.current,{},{reload:true,notify:true});
			});
		},false,'text/x-markdown');
	};

	$scope.save = function() {
		
		var contents = $scope.$$childHead.contents;
		if($rootScope.filename) {
			fs.writeFile($rootScope.filename,contents,function(err) {
				if(err) throw err;
				alert('saved file as ' + $rootScope.filename);
			});	
		} else {
			fileDialog.saveAs(function(filename) {
				fs.writeFile(filename,contents,function(err) {
					if(err) throw err;
					alert('saved as ' + filename);
				});
			},false,'text/x-markdown');
		} 
	};

	$scope.saveAs = function() {
		var filename = $rootScope.filename || false;
		var contents = $scope.$$childHead.contents;

		fileDialog.saveAs(function(filename) {
				fs.writeFile(filename,contents,function(err) {
					if(err) throw err;
					alert('saved as ' + filename);
				});
			},filename,'text/x-markdown');
	};
})
