var gulp = require('gulp');
var order = require("gulp-order");
var concat = require("gulp-concat");
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');

var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS:  'src/**/*.js',
  srcJSON:  'src/**/*.json',

  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJSLib: ['tmp/js/lib/p5.js','tmp/js/lib/p5.dom.js','tmp/js/lib/mappa.js'],
  tmpJS: ['tmp/js/dep/*.js','tmp/js/*.js'],
};


// Set up the HTML task
gulp.task('html', function () {
  return gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.tmp));
});
// Set up the CSS task
gulp.task('css', function () {
  return gulp.src(paths.srcCSS)
    .pipe(gulp.dest(paths.tmp));
});
// Set up the JavaScript task
gulp.task('js', function () {
  return gulp.src(paths.srcJS)
    .pipe(gulp.dest(paths.tmp));
});
// Set up the JavaScript task
gulp.task('json', function () {
  return gulp.src(paths.srcJSON)
    .pipe(gulp.dest(paths.tmp));
});
// Combine all tasks into one task
gulp.task('copy', ['html', 'css', 'js','json']);

var transform = function (filepath, file, i, length) {
    return '<script src="' + filepath + '" async></script>';
}
// Inject files into the index.html
gulp.task('inject', ['copy'], function () {
  var css = gulp.src(paths.tmpCSS);
  var jsLib = gulp.src(paths.tmpJSLib);
  var js = gulp.src(paths.tmpJS);
  return gulp.src(paths.tmpIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( jsLib, { relative:true ,starttag: '<!-- inject:head:{{ext}} -->'} ))
    .pipe(inject( js, { relative:true, transform: transform} ))
    .pipe(gulp.dest(paths.tmp));
});


// Serve the development web server
gulp.task('serve', ['inject'], function () {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});
//  Watch for changes
gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.src, ['inject']);
});
gulp.task('default', ['watch']);


// Only necessary if using require
// var browserify = require('gulp-browserify');
// gulp.task('browserify', function() {
//     gulp.src('app/js/script.js') // entry point
//         .pipe(browserify())
//         .pipe(gulp.dest('./dist/js'))
// });

var del = require('del');
gulp.task('clean', function () {
  del([paths.tmp, paths.dist]);
});
