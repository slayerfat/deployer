var gulp = require('gulp');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');
var sourceMaps = require('gulp-sourcemaps');
var tsLint = require('gulp-tslint');
var tsconfig = require('tsconfig-glob');
var gls = require('gulp-live-server');
var runSequence = require('run-sequence');
var proxy = require('http-proxy-middleware');

// tasks
try {
  require('./dist/config/gulp/seeds')(gulp);
} catch (e) {
  console.log(e.message);
}

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
  // run script as a server
  var server = gls.new(paths.backend.entry);
  server.start();

  // use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(paths.backend.files, function (file) {
    server.notify.apply(server, [file]);
  });

  // restart if server.js changes
  gulp.watch(paths.backend.entry, function () {
    server.start.bind(server)()
  });
});

gulp.task('default', function () {
  runSequence(
    'ts:lint:watch',
    'ts:compile:watch',
    'server'
  );
});

