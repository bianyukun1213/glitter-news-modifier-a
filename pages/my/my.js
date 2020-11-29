var e = getApp(), t = require("../../utils/util.js"), a = wx.createInnerAudioContext("myAudio");

Page({
    data: {
        login_sta: !1,
        isHide: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        indexCurrent: null,
        userhead: "",
        usernick: "",
        usersex: "",
        userguojia: "",
        usersheng: "",
        usercity: "",
        userqianming: "",
        countzan: "",
        tel: "",
        code: "",
        sendTime: "获取验证码",
        sendColor: "#363636",
        snsMsgWait: 60,
        souquanFlag: !0,
        sendsmsback: "",
        userRecodTime: 0,
        load_new_sta: "none",
        curStudySta: 0,
        StudyAllDay: 0,
        nowtime: ""
    },
    onShow(){
        var info = wx.getStorageSync("info");
        this.setData({
            login_sta: true,
            userhead: info.userhead,
            usernick: info.usernick,
            userqianming: info.userqianming,
            curStudySta: true,
            nowtime: t.formatTimeData(new Date()),
            StudyAllDay: info.StudyAllDay,
            userlist: [],
        });
    },
    onLongPress(){
        wx.navigateTo({
          url: '../edit/edit',
        });
    },
    // inputTel: function(e) {
    //     this.setData({
    //         tel: e.detail.value
    //     });
    // },
    // inputCode: function(e) {
    //     this.setData({
    //         code: e.detail.value
    //     });
    // },
    // sendCode: function() {
    //     var t = this;
    //     if ("" != this.data.tel) if (/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.data.tel)) {
    //         var a = setInterval(function() {
    //             this.setData({
    //                 smsFlag: !0,
    //                 sendColor: "#cccccc",
    //                 sendTime: this.data.snsMsgWait + "s后重发",
    //                 snsMsgWait: this.data.snsMsgWait - 1
    //             }), this.data.snsMsgWait < 0 && (clearInterval(a), this.setData({
    //                 sendColor: "#363636",
    //                 sendTime: "发送验证码",
    //                 snsMsgWait: 60,
    //                 smsFlag: !1
    //             }));
    //         }.bind(this), 1e3);
    //         wx.request({
    //             url: e.globalData.sendSmsToUser,
    //             data: {
    //                 tel: t.data.tel
    //             },
    //             header: {
    //                 "content-type": "application/json"
    //             },
    //             success: function(e) {
    //                 "Ok" == e.data && (t.toast("短信验证码发送成功，请注意查收"), t.setData({
    //                     souquanFlag: !1
    //                 }));
    //             }
    //         });
    //     } else this.toast("手机号输入错误"); else this.toast("请输入手机号");
    // },
    // toast: function(e) {
    //     wx.showToast({
    //         title: e,
    //         icon: "none",
    //         duration: 2e3,
    //         mask: !0
    //     });
    // },
    // onLoad: function(e) {
    //     wx.showShareMenu({
    //         withShareTicket: !0,
    //         menus: [ "shareAppMessage", "shareTimeline" ]
    //     });
    // },
    // onReady: function() {},
    // onShow: function() {
    //     var a = this;
    //     a.setData({
    //         load_new_sta: "block",
    //         nowtime: t.formatTimeData(new Date())
    //     });
    //     var s = wx.getStorageSync("login_sta");
    //     a.setData({
    //         login_sta: "" != s
    //     }), a.data.login_sta ? (a.setData({
    //         load_new_sta: "block"
    //     }), wx.getSetting({
    //         success: function(t) {
    //             1 == t.authSetting["scope.userInfo"] ? wx.getUserInfo({
    //                 lang: "zh_CN",
    //                 success: function(t) {
    //                     wx.login({
    //                         success: function(t) {
    //                             wx.request({
    //                                 url: e.globalData.weburl + "/st.do?sj=openid",
    //                                 data: {
    //                                     code: t.code
    //                                 },
    //                                 success: function(t) {
    //                                     console.log("login-page-用户的openid:" + t.data.openid);
    //                                     var n = t.data.openid;
    //                                     wx.request({
    //                                         url: e.globalData.secondUserInfo,
    //                                         data: {
    //                                             openid: n
    //                                         },
    //                                         header: {
    //                                             "content-type": "application/json"
    //                                         },
    //                                         success: function(e) {
    //                                             console.log("=========上传二次验证==返回的信息==" + e.data.backsta[0].secondyzuser);
    //                                             var t = e.data.backsta[0].secondyzuser;
    //                                             "ok" == t ? (console.log("=====二次验证===ok"), s && a.setData({
    //                                                 isHide: !1,
    //                                                 load_new_sta: "none"
    //                                             }), console.log("---登录状态hh login_sta ==" + a.data.login_sta), a.queryUserSms()) : "notel" == t ? (console.log("=====二次验证===notel"), 
    //                                             a.setData({
    //                                                 isHide: !0,
    //                                                 load_new_sta: "none"
    //                                             })) : "nouser" == t && (console.log("=====二次验证===nouser"), a.setData({
    //                                                 isHide: !0,
    //                                                 load_new_sta: "none"
    //                                             }));
    //                                         }
    //                                     }), console.log("====学习统计==zzz===" + wx.getStorageSync("openid")), wx.request({
    //                                         url: e.globalData.CountUserStudy,
    //                                         data: {
    //                                             useropenid: wx.getStorageSync("openid")
    //                                         },
    //                                         header: {
    //                                             "content-type": "application/json"
    //                                         },
    //                                         success: function(e) {
    //                                             console.log(e.data);
    //                                             var t = e.data.backstudySms;
    //                                             console.log(t), a.setData({
    //                                                 StudyAllDay: t[0].BackallDayStudy
    //                                             }), 1 == t[0].BackcurDayStudy ? a.setData({
    //                                                 curStudySta: 1
    //                                             }) : 0 == t[0].BackcurDayStudy ? a.setData({
    //                                                 curStudySta: 0
    //                                             }) : 44 == t[0].BackcurDayStudy && a.setData({
    //                                                 curStudySta: 0
    //                                             });
    //                                         }
    //                                     });
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }
    //             }) : (console.log("用户没有授权"), a.setData({
    //                 isHide: !0,
    //                 load_new_sta: "none"
    //             }));
    //         },
    //         fail: function(e) {
    //             a.setData({
    //                 load_new_sta: "none"
    //             });
    //         }
    //     })) : a.setData({
    //         load_new_sta: "none"
    //     });
    // },
    // audioPlay: function(e) {
    //     var t = this, s = e.currentTarget.dataset.id, n = e.currentTarget.dataset.url;
    //     t.setData({
    //         indexCurrent: s
    //     }), a.src = "https://xicdn.hljtv.com/xiaochengxu/" + n, a.play(), a.onPlay(function() {
    //         console.log("开始播放视听");
    //     }), a.onEnded(function() {
    //         console.log("播放至结束视听"), t.setData({
    //             indexCurrent: null
    //         });
    //     });
    // },
    // audioPause: function(e) {
    //     var t = this;
    //     e.currentTarget.dataset.id;
    //     t.setData({
    //         indexCurrent: null
    //     }), a.pause();
    // },
    // deleteLuyin: function(t) {
    //     var a = t.currentTarget.dataset.id, s = this;
    //     wx.showModal({
    //         title: "删除",
    //         content: "您确定要删除此条录音吗？",
    //         success: function(t) {
    //             t.confirm ? (console.log("用户点击确定"), wx.request({
    //                 url: e.globalData.deleteLY,
    //                 data: {
    //                     luyinid: a
    //                 },
    //                 header: {
    //                     "content-type": "application/json"
    //                 },
    //                 success: function(e) {
    //                     "1" == e.data.stalist[0].sta ? (wx.showToast({
    //                         title: "删除成功"
    //                     }), s.queryUserSms()) : wx.showToast({
    //                         title: "删除失败"
    //                     });
    //                 }
    //             })) : t.cancel && console.log("用户点击取消");
    //         }
    //     });
    // },
    // queryUserSms: function() {
    //     var t = this;
    //     console.log(wx.getStorageSync("openid")), wx.request({
    //         url: e.globalData.usersms,
    //         data: {
    //             useropenid: wx.getStorageSync("openid")
    //         },
    //         header: {
    //             "content-type": "application/json"
    //         },
    //         success: function(e) {
    //             var a = e.data.userzplist;
    //             t.setData({
    //                 userlist: a,
    //                 userhead: e.data.user_head,
    //                 usernick: e.data.user_real_name,
    //                 usersex: e.data.user_sex,
    //                 userguojia: e.data.user_guojia,
    //                 usersheng: e.data.user_sheng,
    //                 usercity: e.data.user_shi,
    //                 userqianming: e.data.user_danwei
    //             });
    //         }
    //     });
    // },
    // login: function() {
    //     this.setData({
    //         isHide: !0
    //     });
    // },
    // bianji: function() {
    //     wx.navigateTo({
    //         url: "../myedit/myedit?id=" + wx.getStorageSync("openid")
    //     });
    // },
    // bindGetUserInfo: function(t) {
    //     if (t.detail.userInfo) {
    //         var a = this;
    //         wx.request({
    //             url: e.globalData.sendSmsYzmConfirm,
    //             data: {
    //                 u_tel: a.data.tel,
    //                 u_yzm: a.data.code
    //             },
    //             header: {
    //                 "content-type": "application/json"
    //             },
    //             success: function(s) {
    //                 var n = s.data.backyzmsms[0].jieguo;
    //                 if (console.log("============验证码返回的验证合法性" + n), "ok" == n) {
    //                     a.setData({
    //                         isHide: !1,
    //                         login_sta: !0
    //                     }), wx.setStorage({
    //                         key: "login_sta",
    //                         data: "true"
    //                     }), e.globalData.userInfo = t.detail.userInfo, console.log("--------点击授权按钮----给app.js中的userinfo赋值===" + e.globalData.userInfo.avatarUrl);
    //                     var o = t.detail.userInfo.nickName, i = t.detail.userInfo.avatarUrl, u = t.detail.userInfo.country, l = t.detail.userInfo.city, c = t.detail.userInfo.province, r = t.detail.userInfo.gender;
    //                     wx.login({
    //                         success: function(t) {
    //                             wx.request({
    //                                 url: e.globalData.weburl + "/st.do?sj=openid",
    //                                 data: {
    //                                     code: t.code
    //                                 },
    //                                 success: function(t) {
    //                                     console.log("qqqqqqqqqq用户的openid:" + t.data.openid);
    //                                     var s = t.data.openid;
    //                                     wx.request({
    //                                         url: e.globalData.weburl + "/st.do?sj=user",
    //                                         data: {
    //                                             u_nick: o,
    //                                             u_head: i,
    //                                             u_gj: u,
    //                                             u_city: l,
    //                                             u_sheng: c,
    //                                             u_sex: r,
    //                                             u_openid: s,
    //                                             u_tel: a.data.tel
    //                                         },
    //                                         header: {
    //                                             "content-type": "application/json"
    //                                         },
    //                                         success: function(t) {
    //                                             console.log(t.data), wx.setStorage({
    //                                                 key: "username",
    //                                                 data: o
    //                                             }), wx.setStorage({
    //                                                 key: "userhead",
    //                                                 data: i
    //                                             }), wx.setStorage({
    //                                                 key: "usersheng",
    //                                                 data: c
    //                                             }), wx.setStorage({
    //                                                 key: "usercity",
    //                                                 data: l
    //                                             }), wx.setStorage({
    //                                                 key: "usersex",
    //                                                 data: r
    //                                             }), wx.setStorage({
    //                                                 key: "openid",
    //                                                 data: s
    //                                             }), wx.setStorage({
    //                                                 key: "login_sta",
    //                                                 data: !0
    //                                             }), wx.setStorage({
    //                                                 key: "usertel",
    //                                                 data: a.data.tel
    //                                             }), a.setData({
    //                                                 login_sta: !0
    //                                             }), a.queryUserSms(), wx.request({
    //                                                 url: e.globalData.CountUserStudy,
    //                                                 data: {
    //                                                     useropenid: wx.getStorageSync("openid")
    //                                                 },
    //                                                 header: {
    //                                                     "content-type": "application/json"
    //                                                 },
    //                                                 success: function(e) {
    //                                                     console.log(e.data);
    //                                                     var t = e.data.backstudySms;
    //                                                     console.log(t), a.setData({
    //                                                         StudyAllDay: t[0].BackallDayStudy
    //                                                     }), 1 == t[0].BackcurDayStudy ? a.setData({
    //                                                         curStudySta: 1
    //                                                     }) : 0 == t[0].BackcurDayStudy ? a.setData({
    //                                                         curStudySta: 0
    //                                                     }) : 44 == t[0].BackcurDayStudy && a.setData({
    //                                                         curStudySta: 0
    //                                                     });
    //                                                 }
    //                                             }), console.log("gggg");
    //                                         }
    //                                     });
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 } else a.setData({
    //                     sendsmsback: "验证失败"
    //                 });
    //             }
    //         });
    //     } else wx.showModal({
    //         title: "警告",
    //         content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
    //         showCancel: !1,
    //         confirmText: "返回授权",
    //         success: function(e) {
    //             e.confirm && console.log("用户点击了“返回授权”");
    //         }
    //     });
    // },
    // onHide: function() {},
    // onUnload: function() {},
    // onPullDownRefresh: function() {},
    // onReachBottom: function() {},
    onShareTimeline: function() {
        return {
            title: "读《习近平谈治国理政》第三卷",
            path: "pages/index/index",
            imageUrl: e.globalData.shardImg,
            success: function(e) {
                console.log("转发成功:" + JSON.stringify(e));
            },
            fail: function(e) {
                console.log("转发失败:" + JSON.stringify(e));
            }
        };
    },
    onShareAppMessage: function() {
        return {
            title: "读《习近平谈治国理政》第三卷",
            path: "pages/index/index",
            imageUrl: e.globalData.shardImg,
            success: function(e) {
                console.log("转发成功:" + JSON.stringify(e));
            },
            fail: function(e) {
                console.log("转发失败:" + JSON.stringify(e));
            }
        };
    }
});