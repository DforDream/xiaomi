require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "goodsList": "goodsList"
    },
    shim: {
        "jquery-cookie": ["jquery"],
    }
})

require(["nav","goodsList"], function (nav,goodsList) {
    nav.topNavDownload();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab(); 
    nav.allGoodsTab();


    goodsList.download();
    goodsList.banner();
})