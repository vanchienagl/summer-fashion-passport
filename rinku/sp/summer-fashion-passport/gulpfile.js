var gulp = require('gulp')
, $ = require('gulp-load-plugins')()
, sass = require('gulp-sass')
, ejs = require('gulp-ejs')
, concat = require("gulp-concat")
, wait = require('gulp-wait')
, rename = require('gulp-rename')
, spritesmith = require('gulp.spritesmith')
, imagemin = require('gulp-imagemin')
, runSequence = require('run-sequence')
, browserSync = require('browser-sync')
, plumber = require('gulp-plumber')
, watch = require('gulp-watch')

, dir = '.'
, dev_dir = '/_src/'
, dev_path = dir + dev_dir
, dest_path = dir + '/'
, start_dir = './rinku/sp/summer-fashion-passport/'
;

gulp.task('sass', function () {
  return gulp.src('_src/sass/**/*.scss')
  .pipe(plumber())
  .pipe(wait(300))
  .pipe(sass({outputStyle : 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('_assets/css'))
});

gulp.task('ejs', function(){
    gulp.src(
        [dev_path + 'ejs/*.ejs', dev_path + 'ejs/**/*.ejs']
    )
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(dest_path))
});

gulp.task('concat', function() {
  var files = [
//  dev_path + 'js/lib/jquery.min.js',
  dev_path + 'js/main.js'
  ];
  gulp.src(files)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('_assets/js/'))
    ;
});

gulp.task('bs',function(){
    browserSync({
        server: {
          baseDir: '../../../'
        }
        , browser: ['chrome']
        , startPath: start_dir
    });
});

gulp.task('bsReload',function(){
  browserSync.reload()
});

gulp.task('clean',function(cb){
//  rimraf('dist',cb);
});

gulp.task('default', ['bs'], function(){
  watch([dev_path + 'ejs/*.ejs', dev_path + 'ejs/**/*.ejs', dev_path + 'ejs/css/*.css', dev_path + 'ejs/js/*.js', '!' + dev_path + 'ejs/**/_*.ejs'], function(){
      gulp.start(['ejs']);
  });

  watch([dev_path + 'ejs/**/_header.ejs', dev_path + 'ejs/**/_footer.ejs'], function(){
      gulp.start(['ejs']);
  });

  watch([dev_path + 'sass/*.scss', dev_path + 'sass/**/*.scss'], function(){
      gulp.start(['sass']);
  });

  watch([dev_path + 'js/*.js', dev_path + 'js/**/*.js'], function(){
      gulp.start(['concat']);
  });

  watch([dest_path + '*.html', dest_path + '**/*.html', dest_path + '**/*.js'], function(){
      gulp.start(['bsReload']);
  });

  watch([dest_path + '**/*.css'], function(){
      // gulp.start(['autopref', 'bsReload']);
      gulp.start(['bsReload']);
  });

});

gulp.task('build', function (cb) {
  runSequence('clean','sass', ['image'], cb);
});
