// 引入gulp
import gulp from 'gulp';
// 引入gulp的if语句
import gulpif from 'gulp-if';
// 引入文档组合
import concat from 'gulp-concat';
// 引入webpack打包工具
import webpack from 'webpack';
// 引入stream （gulp用的是webpack的stream）
import gulpWebpack from 'webpack-stream';
// 引入重命名
import named from 'vinyl-named';
// 浏览器自动刷新
import livereload from 'gulp-livereload';
//  处理文件信息流
import plumber from 'gulp-plumber';
// 文件重命名
import rename from 'gulp-rename';
// 压缩包
import uglify from 'gulp-uglify';
// 用于输出的包
import { log, colors } from 'gulp-util';
// 命令行参数解析包
import args from './util/args';

gulp.task('script', () => {
    return gulp.src(['app/js/indexedDB.js'])
        .pipe(plumber({
            errorHandler: function() {

            }
        }))
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel'
                }]
            }
        }), null, (err, stats) => {
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        .pipe(gulp.dest('server/public/js'))
        .pipe(rename({
            basename: 'cp',
            extname: 'min.js'
        }))
        .pipe(uglify({
            compress: { properties: false },
            output: { 'quote_keys': true }
        }))
        .pipe(gulp.dest('server/public/js'))
        .pipe(gulpif(args.watch, livereload()))
})