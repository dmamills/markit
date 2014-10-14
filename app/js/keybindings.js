// Load native UI library.
var gui = require('nw.gui');

function logFailed(msg) {
	console.log(msg);
}

var quitShortcut = {
  key : "Ctrl+Q",
  active : function() {
	console.log('quit command!');
	gui.App.quit();
  },
  failed : logFailed
};

var copyShortcut = {
	key: "Ctrl+C",
	active: function() {
		var clipboard = gui.Clipboard.get();
		console.log('copy!');
	},
	failed: logFailed
}

var pasteShortcut = {
	key: "Ctrl+V",
	active: function() {
		console.log('paste!');
	},
	failed: logFailed
}

var shortcuts = [
	new gui.Shortcut(quitShortcut),
	new gui.Shortcut(copyShortcut),
	new gui.Shortcut(pasteShortcut)
];


for(var i =0; i < shortcuts.length;i++) {
	gui.App.registerGlobalHotKey(shortcuts[i]);
}


