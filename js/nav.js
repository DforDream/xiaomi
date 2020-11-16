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
                for (var i = 0, len = bannerArr.length; i < len; i++){
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
        })
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
        $(".swiper-button-prev,swiper-button-next").click(function () {
            if (this.className === "swiper-button-prev") {
                ind--;
                if (ind < 0) {
                    ind = 4;
                }
                tab();
            } else {
                ind++;
                tab();
            }
        })

    }


    




    return  {
        download: download,
        banner: banner,
        
    }
})
