var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');
var clean = require('gulp-clean')

var version = (new Date).getTime().toString().substr(5)
var fontName = "cicons";

var fontPath = "fonts/";
var cssDest = "./dist/";

var style = "cicons.css";
var reference = "icons-reference.html";

function cleanFonts(cb) {
  gulp.src(cssDest + fontPath).pipe(clean()).on('finish', cb)
}

function generateFonts(cb) {
  gulp.src(['svg-source/*.svg'])
    .pipe(iconfont({
      fontName: fontName,
      formats: ['eot', 'svg', 'ttf', 'woff']
    }))
    .on('glyphs', function (glyphs) {

      gulp.src('template/styles_template.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          fontPath: fontPath,
          version: version
        }))
        .pipe(rename(style))
        .pipe(gulp.dest(cssDest));

      gulp.src('template/reference_template.html')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          cssdest: './',
          style: style
        }))
        .pipe(rename(reference))
        .pipe(gulp.dest(cssDest));
    })
    .pipe(rename(function(path) {
      path.basename += '-' + version
    }))
    .pipe(gulp.dest('./dist/fonts/'))
    .on('finish',cb);
}


gulp.task('build', gulp.series(cleanFonts, generateFonts));

gulp.task('default', gulp.series('build'));
