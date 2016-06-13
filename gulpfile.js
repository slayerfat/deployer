var gulp = require('gulp');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');
var sourceMaps = require('gulp-sourcemaps');
var tsLint = require('gulp-tslint');
var tsconfig = require('tsconfig-glob');
var server = require('gulp-express');
var runSequence = require('run-sequence');
var proxy = require('http-proxy-middleware');

const paths = {
  backend: {
    entry: ['dist/backend/server.js'],
    files: ['dist/**/*.{html,htm,css,js}'],
    watchList: 'backend/**/*.ts'
  },
  frontend: {
    watchList: 'src/**/*.ts'
  }
};

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
  return tsconfig({
    configPath: '.',
    indent: 2
  });
});

// http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html
gulp.task('ts:compile', ['tsconfig-glob'], function () {
  return gulp
    .src(tscConfig.files)
    .pipe(sourceMaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(tscConfig.compilerOptions.outDir));
});

gulp.task('ts:compile:watch', ['ts:compile'], function () {
  gulp.watch(paths.backend.watchList, ['ts:compile']);
});

gulp.task('ts:lint', function () {
  return gulp.src([paths.backend.watchList, paths.frontend.watchList])
    .pipe(tsLint())
    .pipe(tsLint.report('verbose'));
});

gulp.task('ts:lint:watch', ['ts:lint'], function () {
  gulp.watch([paths.backend.watchList, paths.frontend.watchList], ['ts:lint']);
});

gulp.task('server', function () {
  // Start the server at the beginning of the task
  // args[,options][,live-reload]
  server.run(paths.backend.entry);

  // Restart the server when file changes
  gulp.watch(paths.backend.files, server.notify);
  gulp.watch(paths.backend.entry, [server.run]);
});

gulp.task('default', function () {
  runSequence(
    'ts:lint:watch',
    'ts:compile:watch',
    'server'
  );
});

