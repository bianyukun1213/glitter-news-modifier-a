var e = getApp();

Page({
    data: {
        self_input_w: .76 * wx.getSystemInfoSync().windowWidth - 80,
        self_input_w2: .76 * wx.getSystemInfoSync().windowWidth - 100,
        userid: "",
        userhead: "",
        usernick: "",
        usersex: "",
        userguojia: "",
        usersheng: "",
        usercity: "",
        userqianming: "",
        usertel: "",
        usersytc: ""
    },
    onLoad: function(e) {
        var s = this;
        s.setData({
            userid: e.id
        }), s.queryUserSms();
    },
    usertelinput: function(e) {
        this.setData({
            usertel: e.detail.value
        }), console.log(e.detail.value);
    },
    userqianminginput: function(e) {
        this.setData({
            userqianming: e.detail.value
        });
    },
    usertechanginput: function(e) {
        this.setData({
            usersytc: e.detail.value
        });
    },
    updateUserSms: function() {
        var s = this;
        wx.request({
            url: e.globalData.updatesms,
            data: {
                useropenid: wx.getStorageSync("openid"),
                qianming: s.data.userqianming,
                tel: s.data.usertel,
                techang: s.data.usersytc
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var s = e.data.userupdate[0].updatesta;
                console.log(s), "1" == s ? wx.showToast({
                    title: "修改成功"
                }) : wx.showToast({
                    title: "修改失败"
                });
            }
        });
    },
    queryUserSms: function() {
        var s = this;
        wx.request({
            url: e.globalData.userone,
            data: {
                useropenid: wx.getStorageSync("openid")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                s.setData({
                    userhead: e.data.usersms[0].userhead,
                    usernick: e.data.usersms[0].usernick,
                    usersex: e.data.usersms[0].usersex,
                    userguojia: e.data.usersms[0].userguojia,
                    usersheng: e.data.usersms[0].usersheng,
                    usercity: e.data.usersms[0].usercity,
                    userqianming: e.data.usersms[0].userqianming,
                    usertel: e.data.usersms[0].usertel,
                    usersytc: e.data.usersms[0].usersytc
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});