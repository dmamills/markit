angular.module('markit.services')
.service('ClipboardService',function() {

	var gui = require('nw.gui');
	var clipboard = gui.Clipboard.get();

	return clipboard;
});
