var t = getApp();

Page({
    data: {
        screen_width: wx.getSystemInfoSync().windowWidth,
        screen_height: wx.getSystemInfoSync().windowHeight,
        img_height: .96 * wx.getSystemInfoSync().windowWidth * 300 / 640,
        phimgurl: t.globalData.paihangImg,
        dw_title_width: .96 * wx.getSystemInfoSync().windowWidth * .96 - 170,
        ph_list: [],
        ph_sql_list: [],
        ph_fl_list: [],
        ph_fl_img_width: "",
        ph_fl_img_height: "",
        load_new_sta: "none"
    },
    selectFenleiForPh: function() {
        var a = this;
        wx.request({
            url: t.globalData.paihangFenLei,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data.ph_fl_llist.length), a.setData({
                    ph_fl_list: t.data.ph_fl_llist,
                    ph_fl_img_width: (.96 * a.data.screen_width - 50 * (t.data.ph_fl_llist.length - 1)) / t.data.ph_fl_llist.length,
                    ph_fl_img_height: 52 * (.96 * a.data.screen_width - 50 * (t.data.ph_fl_llist.length - 1)) / t.data.ph_fl_llist.length / 129
                }), a.SelectSmsForFenLeiID_mysql();
            }
        });
    },
    SelectSmsForFenLeiID_mysql2: function(a) {
        var e = this;
        e.setData({
            load_new_sta: "block"
        });
        var n = a.currentTarget.dataset.id;
        console.log(n), wx.request({
            url: t.globalData.paihangFenLeiSms,
            data: {
                gsid: n
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e.setData({
                    ph_sql_list: t.data.ph_sms_llist
                });
                var a = [];
                a = e.data.ph_fl_list;
                for (var l = 0; l < e.data.ph_fl_list.length; l++) e.data.ph_fl_list[l].dept_id == n ? a[l].if_hong = 1 : a[l].if_hong = 0;
                e.setData({
                    ph_fl_list: a,
                    load_new_sta: "none"
                });
            }
        });
    },
    SelectSmsForFenLeiID_mysql: function() {
        var a = this, e = null;
        for (var n in a.data.ph_fl_list) "1" == a.data.ph_fl_list[n].if_hong && (e = a.data.ph_fl_list[n].dept_id);
        console.log("===默认查询分类ID是====" + e), wx.request({
            url: t.globalData.paihangFenLeiSms,
            data: {
                gsid: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.setData({
                    ph_sql_list: t.data.ph_sms_llist
                });
            }
        });
    },
    SelectSmsForFenLeiID: function() {
        var a = this;
        wx.request({
            url: t.globalData.paihangRedis,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.setData({
                    ph_list: t.data.paihanglist
                });
            }
        });
    },
    onLoad: function(t) {
        this.selectFenleiForPh();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});