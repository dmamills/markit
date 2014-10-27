var gulp = require('gulp');
var concat = require('gulp-concat');
var shell = require('gulp-shell');

var js_root = './app/js/';
var paths = {
	js: ['keybindings.js','filters/*','controllers/MenuController.js','controllers/*','services/*','index.js','routes.js']
}

paths.js = paths.js.map(function(el) { return js_root+el;});

gulp.task('ng-concat',function() {
	gulp.src(paths.js)
	.pipe(concat('dist.js'))
	.pipe(gulp.dest('./app/build/'));
});

gulp.task('build-osx',shell.task([
	'./build.sh'
]));

gulp.task('watch',function() {
	gulp.watch(paths.js,['ng-concat','build-osx']);
});

gulp.task('default',['ng-concat','build-osx']);
