define(['jquery'], function ($) {
    function download() {
        $.ajax({
            url: '../data/slide.json',
            success: function (result) {
                var slideArr = result.data.list.list;
                for (var i = 0, len = slideArr.length; i < len; i++){
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                        <a href="#" target = "_blank">
                            <div class = 'content'>
                                <div class = 'thumb'>
                                    <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                                </div>
                                <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                                <p class = 'desc'>${slideArr[i].desc}</p>
                                <p class = 'price'>
                                    <span>${slideArr[i].seckill_Price}</span>元
                                    <del>${slideArr[i].goods_price}元</del>
                                </p>
                            </div>
                        </a>
                    </li>`).appendTo("#J_flashSaleList ul");
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }


    // 商品列表滚动
    function slideTab() {
        var spans = $(".swiper-controls").find("span");
        var index = 0;
        var count = Math.ceil(26 / 4) - 1;

        // 启动定时器，让其一开始自己滚动
        var flag = true;
        var timer = setInterval(function () {
            if (index == 0) {
                flag = true;
            }
            if (index == count) {
                flag = false;
            }
            if (flag) {
                index++;
            } else {
                index--;
            }
            tab();
        }, 4000);

        // 点击按钮
        spans.click(function () {
            clearInterval(timer);
            if ($(this).index() == 0) {
                index--;
                index = Math.max(0, index);
            } else {
                index++;
                index = Math.min(count, index);
            }
            tab();
            timer = setInterval(function () {
                if (index == 0) {
                    flag = true;
                }
                if (index == count) {
                    flag = false;
                }
                if (flag) {
                    index++;
                } else {
                    index--;
                }
                tab();
            }, 4000);
        })

        function tab() {
            index == 0 ? spans.eq(0).addClass("swiper-button-disabled") : spans.eq(0).removeClass("swiper-button-disabled");
            index == count ? spans.eq(1).addClass("swiper-button-disabled") : spans.eq(1).removeClass("swiper-button-disabled");

            var target = index == count ? index * -992 + 496 : index * -992;
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${target}px, 0px, 0px)`,
                transitionDuration: "1000ms"
            })
        }
    }

    // 定时器倒计时，每天14：00开抢，每天22：00开抢
    function countDown() {
        var d = new Date(); // 当前时间
        var h = d.getHours(); // 当前小时
        var date = d.getDate(); // 当前日期
        var afterTime = new Date(); // 倒计时时间

        // 设置倒计时时间间隔
        if (h < 14) {
            afterTime.setHours(14);
            $(".flashsale-countdown .round").html("14:00 场");
        } else if (h > 14 && h < 22) {
            afterTime.setHours(22);
            $(".flashsale-countdown .round").html("22:00 场");
        } else {
            afterTime.setHours(14);
            afterTime.setDate(date + 1);
        }
        afterTime.setMilliseconds(0);
        afterTime.setSeconds(0);
        afterTime.setUTCMilliseconds(0);

        // 计算倒计时总秒数
        var count = parseInt((afterTime.getTime() - d.getTime()) / 1000);
        var spans = $(".box-bd .countdown").find("span");
        var timer = setInterval(function () {
            count--;
            spans.eq(2).html(doubleNum(count % 60));
            spans.eq(1).html(doubleNum(parseInt(count / 60) % 60));
            spans.eq(0).html(doubleNum(parseInt(count / 3600) % 24));

            if (count == 0) {
                clearInterval(timer);
                $(".box-bd .desc").html("本次活动结束,敬请期待~");
            }

        },1000)

    }

    // 小于10 添0
    function doubleNum(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }



    return {
        download: download,
        slideTab: slideTab,
        countDown: countDown
    }
})