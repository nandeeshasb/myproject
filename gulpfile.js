var gulp = require('gulp'),
	browser = require('browser-sync').create();

function sync(done) {
	browser.init({
		server: {
			baseDir: "./dest/"
		},
		port: 3040
	});

	done();
}

function copy(done) {
	gulp.src('./node_modules/glyphicons-only-bootstrap/fonts/*.*')
		.pipe(gulp.dest('./dest/fonts/'));

	gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css',
			'./node_modules/glyphicons-only-bootstrap/css/bootstrap.min.css'])
		.pipe(gulp.dest('./dest/css/'));

	gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.js',
			'./node_modules/jquery/dist/jquery.js'])
		.pipe(gulp.dest('./dest/js/'));

	gulp.src('./src/img/*.*')
		.pipe(gulp.dest('./dest/img/'));

	done();
}

function css() {
	return gulp.src('./src/css/*.css')
		.pipe(gulp.dest('./dest/css/'))
		.pipe(browser.stream());
}

function views() {
	return gulp.src('./src/views/*.html')
		.pipe(gulp.dest('./dest/'))
		.pipe(browser.stream());
}

function script() {
	return gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./dest/js/'))
		.pipe(browser.stream());
}

function watch(){
	gulp.watch('./src/', gulp.series(css, views, script));
}

var watch = gulp.parallel(sync, watch),
 	build = gulp.series([css, views, script, watch]);

exports.copy = copy;
exports.sync = sync;
exports.css = css;
exports.views = views;
exports.watch = watch;
exports.default = build;