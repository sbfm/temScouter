const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ejs = require('gulp-ejs');
const del = require('del');
const rename = require('gulp-rename');
// エラー時に停止させない
const plumber = require('gulp-plumber');
// 複数のimportをまとめて行う
const sassGlob = require('gulp-sass-glob');
// 複数のファイルを1つにまとめる
const concat = require('gulp-concat');
// jsの依存関係を解消
const browserify = require('gulp-browserify');
// ファイルのインクルードを行う
const fileInclude = require('gulp-file-include');
// コメント消す
const uglify = require('gulp-uglify');

// ソースディレクトリの指定
const dir = './src/front';
const libdir = './lib';
const diroutput = './dest';
const dirtempoutput = './temp';

/*
 * sassタスク(cssは埋め込むため一時ファイルに保存
 */
gulp.task( 'sass', function(){
	// del([dirtempoutput + '/css/**/*'],{force: true});
	return gulp.src([dir + ('/sass/video_overlay.scss')])
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest(dirtempoutput + '/css'));
});

/*
 * jsタスク
 */
gulp.task( 'js', function(){
  //del([diroutput + '/js/**/*'],{force: true});
  return gulp.src([dir + '/js/*.js'])
  .pipe(plumber())
  .pipe(concat('viewer.js'))
  .pipe(browserify())
  .pipe(uglify({
          output:{
            comments: /^!/ //正規表現でLicenseコメントの頭によくある/*!を検出
          }
        }))
  .pipe(gulp.dest(diroutput + '/'));
});

/*
 * ejsタスク（一時ファイルに移動
 */
gulp.task( 'ejs', function(){
	// console.log('ejsタスクを実行');
	//del([dirtempoutput + '/**/*.html'],{force: true});
	return gulp.src( [ dir + '/ejs/**/*.ejs', '!' + dir + '/ejs/**/_*' ] )
		.pipe(plumber())
		.pipe(ejs({},{},{"ext": ".html"}))
		.pipe(rename({ extname: '.html' }))
		.pipe(gulp.dest(dirtempoutput));
});

/*
 * includeタスク
 */
gulp.task('include', function() {
    return gulp.src( dirtempoutput + '/**/*.html')
    .pipe(fileInclude())
    .pipe(gulp.dest(diroutput));
});

gulp.task('copylib', function() {
  return gulp.src(libdir + '/**/*')
  .pipe(gulp.dest(diroutput));
});

/*
 * ビルドをまとめて行うタスク
 */
//gulp.task( 'build', gulp.series('sass', 'ejs', 'js', function(done){done();}));
gulp.task( 'build', gulp.series('sass', 'ejs', 'include', 'js', 'copylib', function(done){done();}));
