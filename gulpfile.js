// /////////////////////////////////////////////////
// GULP
// /////////////////////////////////////////////////

var gulp = require('gulp');

// /////////////////////////////////////////////////
// GULP tasks
// /////////////////////////////////////////////////

var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var browserSync = require("browser-sync");
var reload = browserSync.reload;

// /////////////////////////////////////////////////
// COMPRESS IMAGES
// /////////////////////////////////////////////////

gulp.task('compress-images', function(){
	return gulp.src('src/pre-images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images/'));
});

// /////////////////////////////////////////////////
// SVG ICONS STORE
// /////////////////////////////////////////////////

gulp.task('svgstore', function () {
    return gulp
        .src('src/svg-store/*.svg')
        .pipe(svgmin({
            plugins: [{
                cleanupIDs: {
                  pretty: true,
                    minify: true
                }
            }]
        }))
        .pipe(svgstore({ inlineSvg: true}))
        .pipe(cheerio({
            run: function ($) {
                $('svg').attr('style',  'display:none');
                $('[id^="icon"] [fill]').removeAttr('fill');

            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(gulp.dest('dist/images/icons'));
});


// /////////////////////////////////////////////////
// STYLES
// /////////////////////////////////////////////////

gulp.task('styles', function(){
  return gulp.src('src/sass/**/*.scss')
  	.pipe(plumber())
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('src/pre-css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream:true}));
});


// /////////////////////////////////////////////////
// HTML Task
// /////////////////////////////////////////////////

gulp.task("html", function(){
    gulp.src("dist/**/*.html")
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Browser-Sync Task
// /////////////////////////////////////////////////

gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir:"./dist/"
    }
  })
});

// /////////////////////////////////////////////////
// WATCH
// /////////////////////////////////////////////////
gulp.task('watch', function(){
  gulp.watch('src/sass/**/*.scss', ['styles']); 
});

// /////////////////////////////////////////////////
// UGLIFY MAIN.JS
// /////////////////////////////////////////////////

gulp.task('uglify', function(){
	gulp.src('src/js/*')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});

// /////////////////////////////////////////////////
// Default Task
// /////////////////////////////////////////////////

gulp.task('deploy',[ 'uglify', 'compress-images' ]);


// /////////////////////////////////////////////////
// Default Task
// /////////////////////////////////////////////////

gulp.task('default',[ 'styles', 'uglify', 'html', 'browser-sync', 'svgstore', 'watch' ]);