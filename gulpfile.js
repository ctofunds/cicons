var gulp = require('gulp');
var crypto = require('crypto');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');
var clean = require('gulp-clean')

var version = require('./package.json').version
var versionHash = crypto.createHash('sha256').update(version).digest('hex')
var vHash = versionHash.substr(-8)

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
          version: vHash
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
      path.basename += '-' + vHash
    }))
    .pipe(gulp.dest('./dist/fonts/'))
    .on('finish',cb);
}

gulp.task('clean', cleanFonts)
gulp.task('build', generateFonts)

gulp.task('clean-build', gulp.series(cleanFonts, generateFonts));

gulp.task('default', gulp.series('clean-build'));
