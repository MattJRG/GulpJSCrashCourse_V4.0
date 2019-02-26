const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*

-- TOP LEVEL FUNCTIONS --
gulp.task - Define tasks
gulp.src - Point to files to use
gulp.dest - Point to folder to output
gulp.watch - Watch files and folders for changes

*/

// Logs Message

function message(done) {
    console.log("HTTP Server Started")
    done()
  };

// Copy all HTML files

function copyhtml(done){
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
  done();
};

// Optimise Images

function imageMin(done){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
    done();
};

// Minify JS

function minify(done){
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
  done();
};

// Compile Sass
function gulp_Sass(done){
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    done();
};

// Scripts
function scripts(done){
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    done();
};

// Default



// Watch

function watch_files() {
  gulp.watch('./src/js/*.js', scripts)
  gulp.watch('./src/images/*', imageMin)
  gulp.watch('./src/sass/*.scss', gulp_Sass)
  gulp.watch('./src/*.html', copyhtml)
}

gulp.task('message', message);
gulp.task('copyhtml', copyhtml);
gulp.task('imageMin', imageMin);
gulp.task('minify', minify);
gulp.task('gulp_Sass', gulp_Sass);
gulp.task('scripts', scripts);
gulp.task('watch', watch_files);

gulp.task('default', gulp.parallel(message, copyhtml, gulp_Sass, imageMin, scripts));