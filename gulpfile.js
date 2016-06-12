var gulp = require('gulp');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');
var sourceMaps = require('gulp-sourcemaps');
var tsLint = require('gulp-tslint');
var tsconfig = require('tsconfig-glob');
var browserSync = require('browser-sync');
var server = require('gulp-express');
var runSequence = require('run-sequence');
var proxy = require('http-proxy-middleware');

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
  return tsconfig({
    configPath: '.',
    indent: 2
  });
});

// http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html
gulp.task('ts:compile', function () {
  return gulp
    .src(tscConfig.filesGlob)
    .pipe(sourceMaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(tscConfig.compilerOptions.outDir));
});

gulp.task('ts:compile:watch', ['ts:compile'], function () {
  gulp.watch('server/**/*.ts', ['ts:compile']);
});

gulp.task('ts:lint', function () {
  return gulp.src(['server/**/*.ts', 'src/**/*.ts'])
    .pipe(tsLint())
    .pipe(tsLint.report('verbose'));
});

gulp.task('ts:lint:watch', ['ts:compile'], function () {
  gulp.watch(['server/**/*.ts', 'src/**/*.ts'], ['ts:compile']);
});

gulp.task('server', function () {
  // Start the server at the beginning of the task
  // args[,options][,live-reload]
  server.run(['dist/server/server.js']);
});

gulp.task('browser-sync', ['server'], function () {
  var proxyMiddleware = proxy('**', {
    target: 'http://localhost:3300'
  });
  browserSync.init(null, {
    open: false,
    middleware: [proxyMiddleware]
  });

  gulp.watch(['dist/**/*.{html,htm,css,js}']).on('change', browserSync.reload);
});

gulp.task('default', function () {
  runSequence(
    'ts:lint:watch',
    'ts:compile:watch',
    'browser-sync'
  );
});

