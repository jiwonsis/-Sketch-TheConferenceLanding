var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    path = require('path'),
    fontcustom = require('gulp-fontcustom');

var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

env = 'production';

if (env === 'development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}

jsSources = [
    'components/scripts/jqloader.js',
    'components/scripts/script.js'

];

fontSources = ['components/fonts/**/*'];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];
iconSources = ['components/svg/**/*'];

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .on('error', gutil.log)
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
                sass: 'components/sass',
                css: outputDir + 'css',
                image: outputDir + 'images',
                style: sassStyle,
                require: ['susy', 'breakpoint']
            })
            .on('error', gutil.log))
        //    .pipe(gulp.dest( outputDir + 'css'))
        .pipe(connect.reload())
});

gulp.task('fonts', function() {
    gulp.src(fontSources)
        .on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'fonts'))
        .pipe(connect.reload())
});

gulp.task('fontcustom', function() {
    gulp.src(iconSources)
        .pipe(fontcustom({
            font_name: 'iconfont'
        }))
        .pipe(gulp.dest(outputDir + 'fonts/iconfont'))
});


gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['compass']);
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch(fontSources, ['fonts']);
    gulp.watch(fontSources, ['fontcustom']);
});

gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('builds/development/*.html')
        .pipe(gulpif(env === 'production', minifyHTML()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});

// Copy images to production
gulp.task('move', function() {
    gulp.src('builds/development/images/**/*.*')
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
});

gulp.task('default', ['watch', 'html', 'js', 'compass', 'fonts', 'fontcustom', 'move', 'connect']);