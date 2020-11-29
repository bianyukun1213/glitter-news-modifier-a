var o = wx.getBackgroundAudioManager();

o.protocol = "hls", Page({
    data: {
        screen_width: wx.getSystemInfoSync().windowWidth,
        screen_height: wx.getSystemInfoSync().windowHeight,
        audio_src: ""
    },
    launchAppError: function(o) {
        console.log(o.detail.errMsg);
    },
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    audioPlay: function(n) {
        console.log("111111"), o.title = "第三卷", o.epname = "习近平谈治国理政", o.singer = "习近平", 
        o.coverImgUrl = "http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000", 
        o.src = "https://ts.hljlongmai.com/ts/m3u8/202009250955474f4420716a875/202009250955474f4420716a875.m3u8", 
        o.play();
    },
    audioPause: function(n) {
        console.log("2222");
        o.pause();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});