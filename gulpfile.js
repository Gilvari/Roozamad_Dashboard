var gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');
var reload = browserSync.reload;


//sources
var browserifyOptions = {
    entries: ['./app/main.js'],
    debug: false
};

//error handler
function handle_error(e) {
    console.log(e.message);
    this.emit('end');
}


//script translator
gulp.task('translate-script', function () {
    return browserify(browserifyOptions)
        .transform(babelify, {
            presets: ["env"]
        })
        .bundle()
        .on('error', handle_error)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build/script'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/script'))
});


//libraries that are needed
gulp.task('other-script', () =>
    gulp.src('./script/library/**/*')
    .pipe(gulp.dest('./build/script/'))
);

gulp.task('api', () =>
    gulp.src('./api/**/*')
    .pipe(gulp.dest('./build/api/'))
);


gulp.task('globalVars', () =>
    gulp.src('./app/globalVariables.js')
    .pipe(gulp.dest('./build/script/'))
);




//style
gulp.task('compile-less', function () {
    gulp.src('./style/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./build/style/'))
        .pipe(minify({
            compatibility: 'ie8',
            keepBreaks: false,
            debug: false
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./build/style/'));
});
gulp.task('other-style', () =>
    gulp.src('./style/library/**/*')
    .pipe(gulp.dest('./build/style/library'))
);


//resources 
gulp.task('fonts', function () {
    return gulp.src(['./node_modules/font-awesome/fonts/*', './fonts/**/*'])
        .pipe(gulp.dest('./build/fonts/'))
});
gulp.task('images', () =>
    gulp.src('./images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/'))
);

gulp.task('svg', () =>
    gulp.src('./svg/*')
    .pipe(gulp.dest('./build/svg/'))
);
gulp.task('app', function(){
    gulp.src('./app/index.html').pipe(gulp.dest('./build/'));
    gulp.src(['!./app/index.html', './app/**/*.html']).pipe(gulp.dest('./build/app/'));
});



//server
gulp.task('watch', function () {
    gulp.watch('./app/**/*.js', ['translate-script', 'app']).on("change", reload);
    gulp.watch('./style/**/*.less', ['compile-less']).on("change", reload);
    gulp.watch('./app/**/*.html', ['translate-script', 'app']).on("change", reload);
});


gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./build",
            index: "./index.html"
        }
    });
    gulp.watch("./style/**/*.less").on("change", reload);
    gulp.watch("./app/**/*.js").on("change", reload);
    gulp.watch("./app/**/*.html").on("change", reload);
});




gulp.task('default', [
    'translate-script', 
    'other-script',
    'compile-less', 
    'other-style', 

    'api',
    'globalVars',
    'fonts', 
    'images', 
    'app',
    'svg',
    
    'server', 
    'watch']);