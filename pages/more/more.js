var t = getApp(), n = wx.createInnerAudioContext("myAudio"), a = "";

Page({
    data: {
        youxiu_list: [],
        load_new_sta: "none",
        indexCurrent: null,
        indexCurrentZan: null,
        currentpage: 1,
        adminweburl: ""
    },
    onLoad: function(t) {
        wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
    },
    onReady: function() {},
    onShow: function() {
        var n = this;
        console.log(n.data.login_sta), n.setData({
            adminweburl: t.globalData.adminUrl,
            load_new_sta: "block",
            login_sta: wx.getStorageSync("login_sta")
        }), a = "", n.data.login_sta ? (console.log("登录"), n.selectYouXiuListLogin()) : (console.log("未登录"), 
        n.selectYouXiuListNologin());
    },
    selectYouXiuListLogin: function() {
        var n = this;
        wx.request({
            url: t.globalData.youxiuMoreLoginurl,
            data: {
                flname: a,
                user_openid: wx.getStorageSync("openid"),
                curepage: n.data.currentpage
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                n.setData({
                    youxiu_list: t.data.youxiulist,
                    load_new_sta: "none"
                });
            }
        });
    },
    selectYouXiuListNologin: function() {
        var n = this;
        wx.request({
            url: t.globalData.youxiuMoreNoLoginurl,
            data: {
                flname: a,
                curepage: n.data.currentpage
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                n.setData({
                    youxiu_list: t.data.youxiulist,
                    load_new_sta: "none"
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    audioPlay: function(t) {
        var a = this, e = t.currentTarget.dataset.id, o = t.currentTarget.dataset.url;
        a.setData({
            indexCurrent: e
        }), n.src = "https://xcx.hljlongmai.com/uploadmp3/" + o, n.play(), n.onPlay(function() {
            console.log("开始播放视听");
        }), n.onEnded(function() {
            console.log("播放至结束视听"), a.setData({
                indexCurrent: null
            });
        });
    },
    audioPause: function(t) {
        var a = this;
        t.currentTarget.dataset.id;
        a.setData({
            indexCurrent: null
        }), n.pause();
    },
    jiazan: function(n) {
        var a = this;
        wx.request({
            url: t.globalData.add_zan,
            data: {
                luyin_id: n.currentTarget.dataset.id,
                user_openid: wx.getStorageSync("openid")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e = t.data.dzstalist[0].sta;
                if (console.log("---返回点赞状态是====" + e), "1" == e) {
                    wx.showToast({
                        title: "成功"
                    });
                    var o = n.currentTarget.dataset.id, i = a.data.youxiu_list.map(function(t, n) {
                        return o == t.id && (t.clickzan++, t.ifdianzan = "1"), t;
                    });
                    a.setData({
                        youxiu_list: i
                    });
                } else "0" == e ? wx.showToast({
                    title: "失败"
                }) : "2" == e && wx.showToast({
                    title: "赞过啦"
                });
            }
        });
    },
    jianzan: function() {
        wx.showToast({
            title: "赞过啦"
        });
    },
    loadmores: function() {
        var t = this;
        t.setData({
            currentpage: t.data.currentpage + 1,
            load_new_sta: "block",
            login_sta: wx.getStorageSync("login_sta")
        }), t.data.login_sta ? (console.log("登录"), t.selectYouXiuListLogin()) : (console.log("未登录"), 
        t.selectYouXiuListNologin());
    },
    onShareTimeline: function() {
        return {
            title: "龙江百万党员接力读党史",
            path: "pages/index/index",
            imageUrl: t.globalData.shardImg,
            success: function(t) {
                console.log("转发成功:" + JSON.stringify(t));
            },
            fail: function(t) {
                console.log("转发失败:" + JSON.stringify(t));
            }
        };
    },
    onShareAppMessage: function() {
        return {
            title: "龙江百万党员接力读党史",
            path: "pages/index/index",
            imageUrl: t.globalData.shardImg,
            success: function(t) {
                console.log("转发成功:" + JSON.stringify(t));
            },
            fail: function(t) {
                console.log("转发失败:" + JSON.stringify(t));
            }
        };
    }
});