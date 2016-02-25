// Gulp Libraries

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');

// Error Handling

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Sources Paths

var paths = {
  sass: ['./src/scss/**/*.scss', './src/sass/**/*.sass'],
  coffee: ['./src/coffee/**/*.coffee'],
  jade: ['./src/jade/**/*.jade']
};

// Gulp Default Task

gulp.task('default', ['sass', 'coffee', 'jade', 'watch', 'webserver']);

// Gulp Sass Task

gulp.task('sass', function(done) {
  gutil.log(gutil.colors.yellow('Processing SASS File...'));
  gulp.src('./src/sass/app.sass')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// Gulp Coffee Task

gulp.task('coffee', function(done) {
  gutil.log(gutil.colors.yellow('Processing COFFEE File...'));
  gulp.src(paths.coffee)
  .pipe(coffee({
    bare: true
  })
  .on('error', handleError))
  .pipe(concat('application.js'))
  .pipe(gulp.dest('./www/js'))
  .on('end', done);
});

// Gulp Jade Task

gulp.task('jade', function(done) {
  var YOUR_LOCALS = {};
  
  gutil.log(gutil.colors.yellow('Processing JADE File...'));

  gulp.src(paths.jade)
    .pipe(jade({
      locals: YOUR_LOCALS
    })
    .on('error', handleError))
    .pipe(gulp.dest('./www/'))
    .on('end', done);
});


gulp.task('watch', function() {
  gutil.log(gutil.colors.yellow('Starting WATCH task...'));
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.jade, ['jade']);
});


// Bower
// gulp.task('bower', function() {
//   return bower()
//     .pipe(gulp.dest('./www/lib'))
// });

// Web Server
gulp.task('webserver', function() {
  gutil.log(gutil.colors.yellow('WebServer is starting. Thanks for looking at me :)'));
  gulp.src('./www')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false,
      host: '192.168.1.54',
      port: 7391
    }));
});