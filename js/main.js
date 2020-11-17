// console.log("加载成功");

/* 
配置当前这个项目用到了哪些模块
遵从的都是AMD规范
虽有的.js 文件，后最都可以省略
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie.js",
        "nav": "nav",
        "slide": "slide"
    },
    shim: {
        // 设置依赖关系
        "jquery-cookie": ["jquery"],
        
    }
})

require(["nav", "slide"], function (nav, slide) {
    // 头部导航栏部分
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();

    // 倒计时及左侧效果实现
    slide.download();
    slide.slideTab();
    slide.countDown();
})