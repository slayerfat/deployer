const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourceMaps = require('gulp-sourcemaps');
const tsLint = require('gulp-tslint');
const tsconfig = require('tsconfig-glob');
const server = require('gulp-express');

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

gulp.task('build', ['ts:lint', 'ts:compile']);

gulp.task('server', function () {
  // Start the server at the beginning of the task
  // args[,options][,live-reload]
  server.run(['dist/server/server.js']);

  // Restart the server when file changes
  gulp.watch(['dist/server/**/*.js'], server.notify);
  gulp.watch(['dist/server/server.js'], [server.run]);
});
