const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourceMaps = require('gulp-sourcemaps');
const tsLint = require('gulp-tslint');
const tsconfig = require('tsconfig-glob');
const browserSync = require('browser-sync');
var server = require('gulp-express');

// http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html
gulp.task('ts:compile', function () {
  return gulp
    .src(tscConfig.files)
    .pipe(sourceMaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(tscConfig.compilerOptions.outDir));
});

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
  return tsconfig({
    configPath: '.',
    indent: 2
  });
});

gulp.task('ts:lint', function () {
  return gulp.src(['server/**/*.ts', 'src/**/*.ts'])
    .pipe(tsLint())
    .pipe(tsLint.report('verbose'));
});

gulp.task('ts:build', ['ts:lint', 'ts:compile']);

gulp.task('ts:watch', ['ts:build'], function() {
  gulp.watch('server/**/*.ts', ['ts:build']);
});

gulp.task('server', function () {
  // Start the server at the beginning of the task
  // args[,options][,live-reload]
  server.run(['dist/server/server.js']);

  // Restart the server when file changes
  gulp.watch(['dist/server/server.js'], [server.run]);
});

gulp.task('browser-sync', ['server'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3300",
    open: false
  });

  gulp.watch(['dist/**/*.{html,htm,css,js}']).on('change', browserSync.reload);
});
