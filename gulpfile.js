/* ================
// Required Plugins
// ============= */

var site = './dist';
var gulp = require('gulp'),
    packageJSON = require('./package.json'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug'),
    sass = require('gulp-sass');


/* ================
// Compile Pug
// ============= */

gulp.task('pug', function() {

  return gulp.src('src/demo.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(site))
    .pipe(browserSync.stream());

});


/* ================
// Compile Sass
// ============= */

gulp.task('sass', function() {

  return gulp.src('src/styles.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest(site))
    .pipe(browserSync.stream());

});


/* ================
// Process JS
// ============= */

gulp.task('js', function() {

  return gulp.src('src/script.js')
    .pipe(gulp.dest(site))
    .pipe(browserSync.stream());

});


/* ================
// Sync Changes
// ============= */

gulp.task('browser-sync', function() {

  browserSync.init({
    logPrefix: packageJSON.name,
    ui: false,
    server: {
      baseDir: site,
      index: 'demo.html'
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
        padding: '5px 4px 3px',
        fontSize: '12px',
        background: '#9e12ef',
        borderBottomLeftRadius: '0'
      }
    }
  });

});


/* ================
// Watch Task
// ============= */

gulp.task('watch', function() {

  gulp.watch('src/styles.scss', ['sass']);
  gulp.watch('src/*.pug', ['pug']);
  gulp.watch('src/script.js', ['js']);

});


/* ================
// Default Gulp Task
// ============= */

gulp.task('default', [
  'sass',
  'pug',
  'js',
  'watch',
  'browser-sync'
]);
