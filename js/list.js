require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
    },
    shim: {
        "jquery-cookie": ["jquery"],
    }
})

require(["nav"], function (nav) {
    nav.topNavDownload();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab(); 
    nav.allGoodsTab();


})