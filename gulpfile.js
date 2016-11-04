var gulp = require('gulp');
var es = require('event-stream');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var fs = require('fs');
var _ = require('lodash');
var scripts = require('./app.scripts.json');
var sass = require('gulp-sass');

var source = {
    js: {
        main: 'app/main.js',
        src: [

            // application bootstrap file
            'app/main.js',

            // main module
            'app/app.js',

            // module files
            'app/**/module.js',

            // other js files [controllers, services, etc.]
            'app/**/!(module)*.js'
        ],

    },
    html: 'app/**/*.html',
    css: {
        src: [
            'app/css/*.css'
        ]
    },
    sass: {
        src: [
            'app/scss/*.scss'
        ]
    }
};

var dest = 'build';
// 打包
gulp.task('build', function() {
    return es.merge(gulp.src(source.js.src), getTemplateStream())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


// 监听文件变化
gulp.task('watch', function() {

    gulp.watch(source.js.src, ['js-watch']);
    gulp.watch(source.css.src, ['css']);
    gulp.watch(source.sass.src, ['css']);
    // html 改变立即刷新
    gulp.watch(source.html).on('change', browserSync.reload);
});

// 处理 scss 合并 css 并自动注入
gulp.task('css', function() {
    var sassStream,
        cssStream;

    sassStream = gulp.src(source.sass.src)
        .pipe(sass().on('error', sass.logError));

    cssStream = gulp.src(source.css.src);

    return es.merge(sassStream, cssStream)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src(source.js.src)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest));
});

// 如果 js 改变刷新浏览器
gulp.task('js-watch', ['js'], function() {
    browserSync.reload();
    done();
})

// 打包第三方插件到 build/vendor.js
gulp.task('vendor', function() {

    _.forIn(scripts.chunks, function(chunkScripts, chunkName) {
        var paths = [];
        chunkScripts.forEach(function(script) {
            var scriptFileName = scripts.paths[script];

            if (!fs.existsSync(__dirname + '/' + scriptFileName)) {

                throw console.error('Required path doesn\'t exist: ' + __dirname + '/' + scriptFileName, script)
            }
            paths.push(scriptFileName);
        });

        gulp.src(paths)
            .pipe(concat(chunkName + '.js'))
            //.on('error', swallowError)
            .pipe(gulp.dest(dest))
    })

});

// 读取 html 文件缓存到 angular
function getTemplateStream() {
    return gulp.src(source.html)
        .pipe(templateCache({
            root: 'app/',
            module: 'app'
        }))
};

// 发布模式
gulp.task('prod', ['vendor', 'build', 'css']);

// 开发模式
gulp.task('dev', ['vendor', 'js', 'css', 'watch', 'browser-sync']);
gulp.task('default', ['dev']);