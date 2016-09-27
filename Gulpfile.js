(function() {
  var gulp   = require('gulp'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    server = require('karma').Server;;

  gulp.task('lint', function() {
    return gulp.src(['src/js/*.js', 'src/js/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('sass', function(){
    return gulp.src('src/scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(connect.reload());
  });


  gulp.task('html', function () {
    gulp.src(['src/*.html', 'src/**/*.html'])
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
  });

  gulp.task('js', function() {
    gulp.src(['src/js/*.js', 'src/js/**/*.js'])
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload());
  });

  gulp.task('watch', function () {
    gulp.watch(['src/*.html', 'src/**/*.html'], ['html']);
    gulp.watch(['src/js/*.js', 'src/js/**/*.js'], ['js']);
    gulp.watch(['src/scss/*.scss'], ['sass']);
  });

  gulp.task('connect', function() {
    connect.server({
      root: 'dist',
      livereload: true,
      middleware: function(connect) {
        return [connect().use('/bower_components', connect.static('bower_components'))];
    }
    });
  });

  gulp.task('unit', function (done) {
    gulp.src(['src/js/*.js', 'src/js/**/*.js'])
      .pipe(gulp.dest('dist/js'));
    return new server({
      configFile: require('path').resolve('karma.conf.js'),
      singleRun: true
    }, function() {done}).start();
  });

  gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);
})();
