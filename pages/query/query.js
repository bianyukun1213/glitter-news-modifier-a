var t = getApp(), n = wx.createInnerAudioContext("myAudio");

Page({
    data: {
        soso_input_width: .96 * wx.getSystemInfoSync().windowWidth * .96 * .85 - 60,
        li_width: .96 * wx.getSystemInfoSync().windowWidth * .76 - 40,
        ld_left_width: .96 * wx.getSystemInfoSync().windowWidth * .96 * .96 - 50,
        ld_right_width: 40,
        soso_lingdu_height: wx.getSystemInfoSync().windowHeight - 85,
        login_sta: !1,
        indexCurrent: null,
        fenlei_list: [],
        fl_query_smslist: [],
        inputValue: "",
        flid: "",
        jiansuo_sta: "block",
        chaxunjieguo_sta: "none",
        tab_con: ""
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var t = this;
        t.setData({
            login_sta: wx.getStorageSync("login_sta")
        }), t.selectFenlei();
    },
    audioPlay: function(t) {
        var e = this, a = t.currentTarget.dataset.id, i = t.currentTarget.dataset.url;
        e.setData({
            indexCurrent: a
        }), n.src = "https://xicdn.hljtv.com/houtai/" + i, n.play(), n.onPlay(function() {
            console.log("开始播放视听");
        }), n.onEnded(function() {
            console.log("播放至结束视听"), e.setData({
                indexCurrent: null
            });
        });
    },
    audioPause: function(t) {
        var e = this;
        t.currentTarget.dataset.id;
        e.setData({
            indexCurrent: null
        }), n.pause();
    },
    bindKeyInput: function(t) {
        this.setData({
            inputValue: t.detail.value,
            tab_con: "返回检索目录"
        }), this.selectKeyWorldToList();
    },
    SelectFenleiToList: function(n) {
        var e = this;
        e.setData({
            flid: n.currentTarget.dataset.id,
            tab_con: n.currentTarget.dataset.con
        }), console.log("---分类ID---" + this.data.flid), wx.request({
            url: t.globalData.HaveTingForFLid,
            data: {
                flid: e.data.flid,
                user_openid: wx.getStorageSync("openid")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data.query_lingdulist.length), e.setData({
                    fl_query_smslist: t.data.query_lingdulist,
                    jiansuo_sta: "none",
                    chaxunjieguo_sta: "block"
                });
            }
        });
    },
    selectKeyWorldToList: function(n) {
        var e = this;
        console.log("jjjjjjjjjj" + e.data.inputValue), wx.request({
            url: t.globalData.HaveTingForKey,
            data: {
                keyword: e.data.inputValue,
                user_openid: wx.getStorageSync("openid")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data.q_lingdu_key_list.length), e.setData({
                    fl_query_smslist: t.data.q_lingdu_key_list,
                    jiansuo_sta: "none",
                    chaxunjieguo_sta: "block"
                });
            }
        });
    },
    GobackUpPage: function() {
        n.stop(), wx.navigateBack({
            delta: 0
        });
    },
    backmuluview: function() {
        this.setData({
            jiansuo_sta: "block",
            chaxunjieguo_sta: "none"
        });
    },
    selectFenlei: function() {
        var n = this;
        wx.request({
            url: t.globalData.fenleiRedis,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data.fenleilist.length), n.setData({
                    fenlei_list: t.data.fenleilist
                });
            }
        });
    },
    jiazan: function(n) {
        var e = this;
        wx.request({
            url: t.globalData.add_zan_ld,
            data: {
                luyin_id: n.currentTarget.dataset.id,
                user_openid: wx.getStorageSync("openid")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var a = t.data.dzstalist[0].sta;
                if (console.log("---返回点赞状态是====" + a), "1" == a) {
                    wx.showToast({
                        title: "成功"
                    });
                    var i = n.currentTarget.dataset.id, o = e.data.fl_query_smslist.map(function(t, n) {
                        return i == t.id && (t.click_zan.toString().indexOf("万") >= -1 || t.click_zan.toString().indexOf("亿") >= -1 || t.click_zan.toString().indexOf("+") >= -1 || t.click_zan++, 
                        t.ifdianzan = "1"), t;
                    });
                    e.setData({
                        fl_query_smslist: o
                    });
                } else "0" == a ? wx.showToast({
                    title: "失败"
                }) : "2" == a && wx.showToast({
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
    onHide: function() {},
    onUnload: function() {
        n.stop();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});