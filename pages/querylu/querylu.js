var t = getApp();

Page({
    data: {
        soso_input_width: .96 * wx.getSystemInfoSync().windowWidth * .96 * .85 - 60,
        li_width: .96 * wx.getSystemInfoSync().windowWidth * .76 - 40,
        ld_left_width: .96 * wx.getSystemInfoSync().windowWidth * .96 * .96 - 50,
        ld_right_width: 40,
        soso_lingdu_height: wx.getSystemInfoSync().windowHeight - 85,
        indexCurrent: null,
        login_sta: !1,
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
    SelectFenleiToList: function(e) {
        var n = this;
        n.setData({
            flid: e.currentTarget.dataset.id,
            tab_con: e.currentTarget.dataset.con
        }), console.log("---分类ID---" + this.data.flid), wx.request({
            url: t.globalData.HaveTingForFLid,
            data: {
                flid: n.data.flid,
                user_openid: wx.getStorageSync("openid")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                n.setData({
                    fl_query_smslist: t.data.query_lingdulist,
                    jiansuo_sta: "none",
                    chaxunjieguo_sta: "block"
                }), console.log(t.data.query_lingdulist);
            }
        });
    },
    bindKeyInput: function(t) {
        this.setData({
            inputValue: t.detail.value,
            tab_con: "返回检索目录"
        }), this.selectKeyWorldToList();
    },
    GobackUpPage: function() {
        wx.navigateBack({
            delta: 0
        });
    },
    backmuluview: function() {
        this.setData({
            jiansuo_sta: "block",
            chaxunjieguo_sta: "none"
        });
    },
    selectKeyWorldToList: function(e) {
        var n = this;
        wx.request({
            url: t.globalData.HaveTingForKey,
            data: {
                keyword: n.data.inputValue,
                user_openid: wx.getStorageSync("openid")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                n.setData({
                    fl_query_smslist: t.data.q_lingdu_key_list,
                    jiansuo_sta: "none",
                    chaxunjieguo_sta: "block"
                });
            }
        });
    },
    selectFenlei: function() {
        var e = this;
        wx.request({
            url: t.globalData.fenleiRedis,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data.fenleilist.length), e.setData({
                    fenlei_list: t.data.fenleilist
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});