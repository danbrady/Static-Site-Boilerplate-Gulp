var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    gutil = require('gulp-util'), // gulp-cache package relies on this, even though it's not use below
    livereload = require('gulp-livereload'),
    clean = require('gulp-clean'),
    stylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    beepbeep = require('beepbeep'),
    sourcemaps = require('gulp-sourcemaps'),

    // Set configuration variables
    srcDir = 'src'
    buildDir = 'build',
    uncompressedDir = srcDir + '/images/_uncompressed/**/*';

gulp.task('styles', function() {

    return gulp.src(srcDir + '/sass/**/*.scss')
        .pipe(sass({
            style: 'expanded',
            sourceMap: 'sass',
            sourceComments: 'map'
        }))
        .pipe(autoprefixer('Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24', // Firefox 24 is the latest ESR
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6',
            {
                map: true,
                from: 'What-the-shaqfu?' // Any value here is necessary to not throw an error (Autoprefixer issue)
            }
        ))
        .pipe(gulp.dest(buildDir + '/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(buildDir + '/css'));

});

gulp.task('scripts', function() {

    return gulp.src([srcDir + '/js/**/*.js', '!' + srcDir + '/js/lib/**/*'])
        .pipe(plumber( function () {
            beepbeep();
            return notify().write("JSHint Error");
        }))
        .pipe(jshint(srcDir + '/js/.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(sourcemaps.init())
        .pipe(header(
            '// File: <%= file.path %> \n'
        ))
        .pipe(concat('global.js'))
        .pipe(gulp.dest(buildDir + '/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(buildDir + '/js'));
    });

gulp.task('images', function(){

    return gulp.src(uncompressedDir)
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlace: true
        })))
        .pipe(gulp.dest(buildDir + '/images'));

});

gulp.task('html', function() {
    return gulp.src(srcDir + '/**/*.html')
        .pipe(gulp.dest(buildDir));
});

gulp.task('clean', function() {
    return gulp.src(buildDir, {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'html');
});

gulp.task('default', function(){

    livereload.listen();

    gulp.watch(srcDir + '/sass/**.scss', ['styles']).on('change', livereload.changed);
    gulp.watch(srcDir + '/js/**/*.js', ['scripts']).on('change', livereload.changed);
    gulp.watch(srcDir + '/images/_uncompressed/**/*', ['images']).on('change', livereload.changed);
    gulp.watch(srcDir + '/**/*.html', ['html']).on('change', livereload.changed);

});
