var gui = require('nw.gui');

var win = gui.Window.get();
var nativeMenuBar = new gui.Menu({type:'menubar'});

try {
	nativeMenuBar.createMacBuiltin("markit");
	win.menu = nativeMenuBar;
} catch(e) {
	alert(e.message);
}

var clipboard = gui.Window.get();

function logFailed(msg) {
	console.log(msg);
}

var shortcuts = [];
win.on('focus',function() {
	for(var i =0; i < shortcuts.length;i++) {
		gui.App.registerGlobalHotKey(shortcuts[i]);
	}
});

win.on('blur',function() {
	for(var i =0; i < shortcuts.length;i++) {
		gui.App.unregisterGlobalHotKey(shortcuts[i]);
	}
});

