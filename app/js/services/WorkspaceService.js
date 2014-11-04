angular.module('markit.services',[])
.service('WorkspaceService',function() {

	var workspaces = [];

	return {
		create:function() {
			return {
				filename:'',
				content:''
			};
		},
		open:function(filename,cb) {
			fs.readFile(filename,function(err,data) {
				if(err) cb(err);
				var workspace = {
					filename:filename,
					content:data.toString()
				};

				cb(null,workspace);
			});
		},
		save: function(workspace,cb) {
			if(!workspace.filename) cb(new Error("Workspace has no filename"));
			fs.writeFile(workspace.filename,workspace.content,cb);
		},
		saveAs:function(workspace,cb) {
			fileDialog.saveAs(function(filename) {
				workspace.filename = filename;
				fs.writeFile(filename,workspace.content,function(err) {
					if(err) cb(err);
					cb(null,workspace);
				});
			});
		}
	};
});
