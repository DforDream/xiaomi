//  第三方的插件 gulp-rename gulp-minify-css

const gulp = require("gulp");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task('css', function () {
    gulp.src('./stylesheet/index.css')
        .pipe(gulp.dest("./dist/css"))
        .pipe(minifyCss())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());
})

// 批量处理
gulp.task("cssAll", function () {
    gulp.src("./stylesheet/*.css")
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());
})

// 处理js
gulp.task("scripts", function () {
    gulp.src(["*.js", "!gulpfile.js"])
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload());
})

// 处理html页面
gulp.task("copy-html", function () {
    gulp.src("*.html")
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
})

// 处理数据
gulp.task("data", function () {
    gulp.src(["*.json", "!package.json"])
        .pipe(gulp.dest("./dist/data"))
        .pipe(connect.reload());
})

// 处理图片
gulp.task("images", function () {
    gulp.src("./images/**/*")
        .pipe(gulp.dest("./dist/images"))
        .pipe(connect.reload());
})

// 一次性执行多个任务
gulp.task("build", ["css", "cssAll", "scripts", "copy-html", "data", "images"], function () {
    console.log("项目建立成功");
})


// 建立监听
gulp.task("watch", function () {
    gulp.watch('./stylesheet/index.css', ["css"]);
    gulp.watch("./stylesheet/*.css", ["cssAll"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch(["*.json", "!package.json"], ["data"]);
    gulp.watch("./images/**/*", ["images"]);
})

// 启动一个服务器
const connect = require("gulp-connect");

gulp.task("server", function () {
    connect.server({
        root: "./",
        port: 8887,
        livereload:true
    })
})

// 启动默认任务
gulp.task("default", ["server"]);