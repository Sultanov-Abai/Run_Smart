const gulp  = require('gulp'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass'),
      rename = require("gulp-rename"),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      imagemin = require('gulp-imagemin'),
      htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch('src/*.html').on("change", browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
            }))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on("change", gulp.parallel('html'));
});

gulp.task('html', () => {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', () => {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', () => {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', () => {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', () => {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task('img', () => {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'html', 'icons', 'mailer', 'img'));