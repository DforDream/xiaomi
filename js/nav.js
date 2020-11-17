// 处理首页的导航部分 声明模块遵从AMD
define(["jquery"], function ($) {
    
    function download() {
        // 数据加载
        $.ajax({
            type: "get",
            url: "./data/nav.json",
            success: function (result) {
                // console.log(result);
                var bannerArr = result.banner;

                // 通过循环将数据添加到页面上
                for (var i = 0, len = bannerArr.length; i < len; i++) {
                    $(`<a href="${bannerArr[i].url}">
                    <img src="./images/banner/${bannerArr[i].img}" alt="" class="swiper-lazy swiper-lazy-loaded">
                </a>`).appendTo("#J_homeSwiper .swiper-slide");
                    
                    var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                    if (i == 0) {
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        });
        leftNavDownload();
        topNavDownload();
    }

    // 实现轮播图效果
    function banner() {
        var ind = 0; // 当前显示的图片下标
        var imgs = null; // 记录图片
        var btns = null; // 记录小圆点

        var timer = setInterval(function () {
            ind++;
            tab();
        },2500)

        // 分装一个切换函数
        function tab() {
            if (!imgs) {
                imgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if (!btns) {
                btns = $("#J_homeSwiper .swiper-pagination").find("a");
            }

            if (ind == 5) {
                ind = 0;
            }

            // 图片切换
            imgs.hide().css("opacity", .2).eq(ind).show().animate({ opacity: 1 }, 500);
            // 小圆点切换
            btns.removeClass("swiper-pagination-bullet-active").eq(ind).addClass("swiper-pagination-bullet-active");
        }

        // 添加鼠标的移入和移出
        $("#J_homeSwiper,.swiper-button-prev,swiper-button-next").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            timer = setInterval(function () {
                ind++;
                tab();
            },2500)
        })

        // 点击小圆圈，切换对应的图片
        $("#J_homeSwiper .swiper-pagination").on("click", "a", function () {
            ind = $(this).index();
            tab();
            return false;
        })


        // 点击左右按钮
        $(".swiper-button-prev,.swiper-button-next").click(function () {
            if (this.className === "swiper-button-prev") {
                ind--;
                if (ind < 0) {
                    ind = 4;
                }
            } else {
                ind++;
            }
            tab();
        })
    }


    // 侧边导航栏数据的加载
    function leftNavDownload() {
        $.ajax({
            url: "../data/nav.json",
            success: function (result) {
                var sideArr = result.sideNav;
                // console.log(sideArr);
                for (var i = 0, len = sideArr.length; i < len; i++){
                    var node = $(`<li class = 'category-item'>
                    <a href="javascript:;" class = 'title'>
                        ${sideArr[i].title}
                        <em class = 'iconfont-arrow-right-big'></em>
                    </a>
                    <div class="children clearfix"></div>
                </li>`);
                    node.appendTo("#J_categoryList");

                    // 取出当前这个选项对应的子节点
                    var childArr = sideArr[i].child;
                    // 一共有多少列
                    var col = Math.ceil(childArr.length / 6);
                    // 计算一共多少列 设置对应的class样式
                    node.find("div.children").addClass("children-col-" + col);
                    // 通过循环，创建右侧的数据
                    for (var j = 0, l = childArr.length; j < l; j++){
                        if (j % 6 == 0) {
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-"${parseInt(j / 6)}></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                        <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                            <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                            <span class="text">${childArr[j].title}</span>
                        </a>
                    </li>`).appendTo(newUl);
                    }
                }
            },
            error: function () {
                console.log(msg);
            }
        })
    }


    // 给侧边导航栏添加切换效果
    function leftNavTab() {
        $("#J_categoryList").on("mouseenter", ".category-item", function () {
            $(this).addClass("category-item-active")
        });
        $("#J_categoryList").on("mouseleave", ".category-item", function () {
            $(this).removeClass("category-item-active")
        });
    }


    // 下载顶部导航的数据
    function topNavDownload() {
        $.ajax({
            url: "../data/nav.json",
            success: function (result) {
                var topNavArr = result.topNav;
                topNavArr.push({ title: "服务" }, { title: "社区" });
                for (var i = 0, len = topNavArr.length; i < len; i++){
                    $(`<li data-index="${i}" class="nav-item">
                    <a href="javascript:;" class="link">
                        <span class="text">${topNavArr[i].title}</span>
                    </a>
                </li>`).appendTo(".site-header .header-nav .nav-list");
                    
                    var node = $(`<ul class="children-list clearfix" style="display:${i == 0 ? "block" : "none"}"></ul>`);
                    node.appendTo("#J_navMenu .container");
                    
                    // 取出所有的子节点
                    if (topNavArr[i].childs) {
                        var childArr = topNavArr[i].childs;
                        for (var j = 0, lenj = childArr.length; j < lenj; j++){
                            $(`<li>
                            <a href="#">
                                <div class="figure figure-thumb">
                                    <img src="${childArr[j].img}" alt="">
                                </div>
                                <div class="title">${childArr[j].a}</div>
                                <p class="price">${childArr[j].i}</p>
                            </a>
                        </li>`).appendTo(node);
                        }
                    }
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    // 顶部导航添加移入效果
    function topNavTab() {
        $(".header-nav .nav-list").on("mouseenter", ".nav-item", function () {
            $(this).addClass("nav-item-active");
            // 找出当前移入这个a标签的下标
            var index = $(this).index() - 1;
            if (index >= 0 && index <= 6) {
                $("#J_navMenu").show().removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).show().siblings("ul").hide();
            } else {
                $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
            }
        });

        $(".header-nav .nav-list").on("mouseleave", ".nav-item", function () {
            $(this).removeClass("nav-item-active");
        })

        $(".header-nav").mouseleave(function () {
            $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
        })

    }

    // 搜索框
    function searchTab() {
        $("#search").focus(function () {
            $("#J_keywordList").removeClass("hide").addClass("show");
        }).blur(function () {
            $("#J_keywordList").removeClass("show").addClass("hide");
        })
    }


    




    return  {
        download: download,
        banner: banner,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        searchTab: searchTab
    }
})
