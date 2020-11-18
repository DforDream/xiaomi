define(['jquery'], function ($) {
    // 数据下载和加载商品列表
    function download() {
        $.ajax({
            url: '../data/goodsList2.json',
            success: function (arr) {
                $(`<div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-a2d6c756 class="channel-product-imgText">
                        <div data-v-a2d6c756 class = 'channel-product-top'>
                            <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                <div data-v-a2d6c756 class = 'figure'>
                                    <a href="goodsDesc.html?product_id=${arr[0].product_id}">
                                        <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${arr[0].image}" alt=""/>
                                    </a>
                                </div>
                                <div data-v-a2d6c756 class = 'content'>
                                    <h3 data-v-a2d6c756 class = 'title'>
                                        <a data-v-a2d6c756 href="goodsDesc.html?product_id=${arr[0].product_id}">
                                            ${arr[0].name}
                                        </a>
                                    </h3>
                                    <p data-v-a2d6c756 class = 'desc'>${arr[0].desc}</p>
                                    <p data-v-a2d6c756 class = 'price'>
                                        <strong data-v-a2d6c756>${arr[0].price}</strong>元
                                        <span data-v-a2d6c756>起</span>
                                        <del data-v-a2d6c756>${arr[0].del}元</del>
                                    </p>
                                    <p data-v-a2d6c756 class = 'link'>
                                        <a data-v-a2d6c756 href="goodsDesc.html?product_id=${arr[0].product_id}">立即购买</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分割线 -->
            <div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-4a0c734d class = 'channel-line' style = 'background-color: rgb(245, 245, 245); height: 14px;'></div>
                </div>
            </div>`).appendTo(".page-main .app-body");
                // 创建小图商品
                for (var i = 1, len = arr.length; i < len; i++) {
                    // 每两个商品创建一行 创建行
                    if ((i + 1) % 2 == 0) {
                        var row = $(`<div data-v-61428f58 class = 'section'>
                        <div data-v-61428f58 class = 'components-list-box'>
                            <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                                <div data-v-45ef62b1 class = 'row'>
                                    
                                </div>
                            </div>
                        </div>
                    </div>`);
                        row.appendTo(".page-main .app-body")
                    }

                    // 创建每一个 商品添加到页面上
                    $(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                        <div data-v-45ef62b1 class = 'figure'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}" class = 'exposure'>
                                <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${arr[i].image}" alt=""/>
                            </a>
                        </div>
                        <h3 data-v-45ef62b1 class = 'title'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}">${arr[i].name}</a>
                        </h3>
                        <p data-v-45ef62b1 class = 'desc'>${arr[i].desc}</p>
                        <p data-v-45ef62b1 class = 'price'>
                            <strong data-v-45ef62b1>${arr[i].price}</strong>元
                            <span data-v-45ef62b1>起</span>
                            <del data-v-45ef62b1>${arr[i].del}元</del>
                        </p>
                    </div>`).appendTo(row.find(".row"));
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 实现页面上轮播图的切换效果
    function banner() {
        // 获取页面上所有的图
        var div = $(".swiper-container .swiper-wrapper");
        // 获取页面上的所有按钮
        var btns = $(".swiper-container .swiper-pagination a");
        // 设置当前显示图片的下标
        var index = 0;
        var timer = null;

        timer = setInterval(function () {
            index++;
            tab();
        }, 3000);

        // 给当前页面添加移入移出效果
        $(".swiper-container").mouseenter(function () {
            clearInterval(timer);
        });

        $(".swiper-container").mouseleave(function () {
            timer = setInterval(function () {
                index++;
                tab();
            }, 3000);
        })

        // 给页面上的小圆点添加点击事件
        btns.click(function () {
            index = $(this).index();
            tab();
            return false;
        })


        // 运动函数
        function tab() {
            btns.removeClass("swiper-pagination-bullet-active").eq(index).addClass("swiper-pagination-bullet-active");

            // 如果是最后一张图片，设置第一个按钮显示被选中状态
            if (index == btns.size()) {
                btns.eq(0).addClass("swiper-pagination-bullet-active");
            }

            div.animate({
                left: -2560 * index
            }, 1000, function () {
                // 动画结束时候的判断
                if (index == btns.size()) {
                    index = 0;
                    div.css("left", 0);
                }
            })
        }

    }

    return {
        download: download,
        banner: banner
    }
})