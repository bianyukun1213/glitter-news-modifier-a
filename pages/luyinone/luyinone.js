var e = getApp(), t = require("../../utils/util.js"), a = 0, o = wx.getRecorderManager(), n = wx.createInnerAudioContext("myAudio");

wx.setInnerAudioOption({
    obeyMuteSwitch: !1
});

var s = "", i = [], l = [], d = "", c = "", u = 0;

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        canIUse_tel: wx.canIUse("button.open-type.getPhoneNumber"),
        isHide: !1,
        isHide_tel: !1,
        backMusic_sta: !1,
        play_left: 0,
        luyin_sta: !1,
        daojishi_sta: "none",
        setInter: "",
        setInter_songdutime: "",
        miaoshu: 3,
        shiting_sta: !1,
        baocun_sta: !1,
        loadingSta: "none",
        loadingTxt: "",
        loaddonghua_new_sta: "none",
        loaddonghua_new_txt: "",
        tempFilePath: "",
        landutxtbianhao: "",
        wz_con_height: .77 * wx.getSystemInfoSync().windowHeight - 53,
        bofan_height: .35 * wx.getSystemInfoSync().windowHeight - 80,
        st_margin_top: (.35 * wx.getSystemInfoSync().windowHeight - 180) / 2,
        ly_margin_top: (.35 * wx.getSystemInfoSync().windowHeight - 210) / 2,
        bc_margin_top: (.35 * wx.getSystemInfoSync().windowHeight - 180) / 2,
        bf_jiange: (.7 * wx.getSystemInfoSync().windowWidth - 200) / 2,
        buttonClicked: !1,
        buttonClicked_upload: !1,
        buttonClicked_shiting: !1,
        music_list: [],
        src_list: [],
        index: 0,
        nodes: "",
        user_phone: "",
        tel: "",
        code: "",
        sendTime: "获取验证码",
        sendColor: "#363636",
        snsMsgWait: 60,
        souquanFlag: !0,
        sendsmsback: "",
        userRecodTime: 0,
        daojishi_yinxiao_new: ""
    },
    inputTel: function(e) {
        this.setData({
            tel: e.detail.value
        });
    },
    inputCode: function(e) {
        this.setData({
            code: e.detail.value
        });
    },
    sendCode: function() {
        var t = this;
        if ("" != this.data.tel) if (/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.data.tel)) {
            var a = setInterval(function() {
                this.setData({
                    smsFlag: !0,
                    sendColor: "#cccccc",
                    sendTime: this.data.snsMsgWait + "s后重发",
                    snsMsgWait: this.data.snsMsgWait - 1
                }), this.data.snsMsgWait < 0 && (clearInterval(a), this.setData({
                    sendColor: "#363636",
                    sendTime: "发送验证码",
                    snsMsgWait: 60,
                    smsFlag: !1
                }));
            }.bind(this), 1e3);
            console.log("===***************===准备下发短信了啊==="), console.log("======发送的电话号码是===" + t.data.tel), 
            wx.request({
                url: e.globalData.sendSmsToUser,
                data: {
                    tel: t.data.tel
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    "Ok" == e.data && (t.toast("短信验证码发送成功，请注意查收"), t.setData({
                        souquanFlag: !1
                    }));
                }
            });
        } else this.toast("手机号输入错误"); else this.toast("请输入手机号");
    },
    toast: function(e) {
        wx.showToast({
            title: e,
            icon: "none",
            duration: 2e3,
            mask: !0
        });
    },
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
    },
    dengdaiToast: function() {
        wx.showToast({
            title: "还没播放完毕"
        });
    },
    chongfuToast: function() {
        wx.showToast({
            title: "已经上传"
        });
    },
    onLoad: function(e) {
        s = e.id, wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
    },
    onReady: function() {},
    onShow: function() {
        this.selectOneMessage();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    selectOneMessage: function() {
        var t = this;
        wx.request({
            url: e.globalData.duwuOne,
            data: {
                id: s
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                for (var a = e.data.musicmessage, o = 0; o < a.length; o++) i[o] = a[o].music_title, 
                l[o] = a[o].music_src;
                var n = e.data.backmessage[0].wenzi.replace(/2em/g, "2.4em");
                t.setData({
                    lyone: e.data.backmessage,
                    landutxtbianhao: e.data.backmessage[0].id,
                    music_list: i,
                    nodes: n
                }), c = "https://xicdn.hljtv.com/houtai/" + l[0].replace("pic", "vdo"), u = 0, d = i[0];
            }
        });
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        }), c = "https://xicdn.hljtv.com/houtai/" + l[e.detail.value].replace("pic", "vdo"), 
        u = 0, d = i[e.detail.value];
    },
    beijingyinyue: function(e) {
        e ? (console.log("-----播放背景音乐--" + c), n.src = c, n.play(), n.loop = !0) : n.stop();
    },
    luyin_begin: function() {
        var e = this;
        t.buttonClicked(this), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.record"] ? (e.setData({
                    luyin_sta: !0,
                    daojishi_sta: "block"
                }), e.startSetInter()) : wx.authorize({
                    scope: "scope.record",
                    success: function() {
                        e.setData({
                            daojishi_sta: "block",
                            luyin_sta: !0
                        }), e.startSetInter();
                    },
                    fail: function() {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权,将无法录音功能,点击确定重新获取授权。",
                            success: function(t) {
                                t.confirm && wx.openSetting({
                                    success: function(t) {
                                        e.setData({
                                            daojishi_sta: "block"
                                        }), e.startSetInter();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    luyin_end: function() {
        var e = this;
        clearInterval(e.data.setInter), e.setData({
            daojishi_sta: "none",
            luyin_sta: !1,
            shiting_sta: !0,
            baocun_sta: !0,
            miaoshu: 3
        }), e.beijingyinyue(!1), o.stop(), o.onStop(function(t) {
            e.data.tempFilePath = t.tempFilePath, console.log("停止录音", t.tempFilePath), e.endSetInter_songdutime(), 
            console.log("====录音了====多少秒===" + e.data.userRecodTime);
        });
    },
    startSetInter: function() {
        var e = this;
        e.setData({
            daojishi_yinxiao_new: "/pages/imgs/" + e.data.miaoshu + ".mp3"
        }), e.playBack(), e.data.setInter = setInterval(function() {
            if (1 == e.data.miaoshu) {
                clearInterval(e.data.setInter), e.setData({
                    daojishi_sta: "none"
                });
                var t = {
                    duration: 6e5,
                    sampleRate: 44100,
                    numberOfChannels: 1,
                    encodeBitRate: 96e3,
                    format: "mp3",
                    frameSize: 50
                };
                wx.getSetting({
                    success: function(a) {
                        a.authSetting["scope.record"] && (console.log("-----已经授权录音功能----"), e.beijingyinyue(!0), 
                        o.start(t), o.onStart(function() {
                            console.log("recorder start -------录音开始啦，计时开始 "), e.setData({
                                userRecodTime: 0,
                                buttonClicked_upload: !1
                            }), e.startSetInter_songdutime();
                        }), o.onError(function(t) {
                            console.log(t), e.endSetInter_songdutime();
                        }));
                    }
                });
            } else {
                var a = e.data.miaoshu - 1;
                e.setData({
                    miaoshu: a
                }), console.log("=======倒计时不是 00000 ====播放 嘀嘀 音频====" + e.data.miaoshu), e.setData({
                    daojishi_yinxiao_new: "/pages/imgs/" + e.data.miaoshu + ".mp3"
                }), e.playBack();
            }
        }, 1e3);
    },
    endSetInter: function() {
        var e = this;
        clearInterval(e.data.setInter);
    },
    startSetInter_songdutime: function() {
        var e = this;
        e.data.setInter_songdutime = setInterval(function() {
            var t = e.data.userRecodTime + 1;
            e.setData({
                userRecodTime: t
            }), console.log("setInterval_time=阅读时间=" + e.data.userRecodTime);
        }, 1e3);
    },
    endSetInter_songdutime: function() {
        var e = this;
        clearInterval(e.data.setInter_songdutime);
    },
    shitingluyin: function() {
        console.log("----试听录音文件----");
        var e = wx.createInnerAudioContext(), o = this;
        console.log("---=-=-=-=-=jishuqi===" + a), t.buttonNotClicked_ST(this), o.setData({
            loaddonghua_new_sta: "block",
            loaddonghua_new_txt: "试听音频加载中，请稍等"
        }), e.autoplay = !0, console.log(o.data.tempFilePath), e.src = o.data.tempFilePath, 
        e.obeyMuteSwitch = !1, e.onPlay(function() {
            console.log("开始播放试听"), o.setData({
                loaddonghua_new_sta: "none"
            });
        }), e.onStop(function() {
            console.log("停止播放视听"), o.setData({
                buttonClicked_shiting: !1
            });
        }), e.onEnded(function() {
            a++, wx.showToast({
                title: "试听结束"
            }), console.log("播放至结束视听"), o.setData({
                buttonClicked_shiting: !1
            }), e.destroy();
        }), e.onError(function(t) {
            console.log(t.errMsg), console.log(t.errCode), e.destroy();
        });
    },
    saveFile: function() {
        var a = this;
        t.buttonNotClicked(this);
        var o = !1, n = wx.getStorageSync("usertel");
        o = null != n && "" != n, wx.getSetting({
            success: function(t) {
                1 == t.authSetting["scope.userInfo"] && 1 == o ? wx.getUserInfo({
                    lang: "zh_CN",
                    success: function(t) {
                        wx.login({
                            success: function(t) {
                                wx.request({
                                    url: e.globalData.weburl + "/st.do?sj=openid",
                                    data: {
                                        code: t.code
                                    },
                                    success: function(t) {
                                        var o = t.data.openid;
                                        wx.request({
                                            url: e.globalData.secondUserInfo,
                                            data: {
                                                openid: o
                                            },
                                            header: {
                                                "content-type": "application/json"
                                            },
                                            success: function(e) {
                                                var t = e.data.backsta[0].secondyzuser;
                                                "ok" == t ? a.uploadFileToServer() : "notel" == t ? a.setData({
                                                    isHide: !0
                                                }) : "nouser" == t && a.setData({
                                                    isHide: !0
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }) : (console.log("用户没有授权"), a.setData({
                    isHide: !0
                }));
            }
        });
    },
    uploadFileToServer: function() {
        var a = this;
        a.setData({
            loaddonghua_new_sta: "block",
            loaddonghua_new_txt: "文件上传中，请您稍等"
        }), wx.uploadFile({
            url: e.globalData.uploadFileAudio,
            filePath: a.data.tempFilePath,
            name: "file",
            formData: {
                method: "POST",
                useropenid: wx.getStorageSync("openid"),
                fenduanbh: a.data.landutxtbianhao,
                user_tel: wx.getStorageSync("usertel")
            },
            header: {
                "Content-Type": "multipart/form-data"
            },
            success: function(o) {
                var n = JSON.parse(o.data), s = n.backmessage[0].filename, i = (n.backmessage[0].sta, 
                n.backmessage[0].error);
                e.globalData.readAudioFileUrl;
                if ("录音超过3M了" == i) wx.showToast({
                    title: "文件过大了"
                }), a.setData({
                    loaddonghua_new_sta: "none",
                    loaddonghua_new_txt: "请您稍等"
                }); else {
                    var l = t.formatTimeData(new Date()), d = wx.getStorageSync("nowdata");
                    if (null == d || "" == d) wx.setStorage({
                        data: l,
                        key: "nowdata"
                    }), wx.setStorage({
                        data: "0",
                        key: "nodata_ly_sta"
                    }), wx.setStorage({
                        data: a.data.userRecodTime,
                        key: "luyintime"
                    }), a.data.userRecodTime >= 300 && (wx.setStorage({
                        data: "1",
                        key: "nodata_ly_sta"
                    }), a.SaveLuyinTimes()); else if (l == d) {
                        var c = wx.getStorageSync("luyintime") + a.data.userRecodTime;
                        c >= 300 ? "1" == wx.getStorageSync("nodata_ly_sta") ? console.log("添加过记录了今天，不能再添加了") : (wx.setStorage({
                            data: c,
                            key: "luyintime"
                        }), wx.setStorage({
                            data: "1",
                            key: "nodata_ly_sta"
                        }), a.SaveLuyinTimes()) : wx.setStorage({
                            data: c,
                            key: "luyintime"
                        });
                    } else wx.setStorage({
                        data: l,
                        key: "nowdata"
                    }), wx.setStorage({
                        data: "0",
                        key: "nodata_ly_sta"
                    }), wx.setStorage({
                        data: a.data.userRecodTime,
                        key: "luyintime"
                    }), a.data.userRecodTime >= 300 && (wx.setStorage({
                        data: "1",
                        key: "nodata_ly_sta"
                    }), wx.setStorage({
                        data: c,
                        key: "luyintime"
                    }), a.SaveLuyinTimes());
                    a.setData({
                        loaddonghua_new_sta: "none",
                        loaddonghua_new_txt: "请您稍等"
                    }), wx.showToast({
                        title: "上传成功",
                        icon: "success",
                        duration: 2e3
                    });
                }
            }
        });
    },
    SaveLuyinTimes: function() {
        var t = this;
        wx.request({
            url: e.globalData.saveuserreadjilu,
            data: {
                user_tel: wx.getStorageSync("usertel")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                "1" == e.data.backreqdsta[0].jieguo ? t.toast("阅读记录成功记录") : "404" == e.data.backreqdsta[0].jieguo ? console.log("没有匹配到用户") : console.log("阅读记录失败");
            }
        });
    },
    playBack: function() {
        var e = this, t = wx.createInnerAudioContext();
        console.log("==========倒计时 音效地址  ============" + e.data.daojishi_yinxiao_new), t.src = e.data.daojishi_yinxiao_new, 
        t.play(), t.onPlay(function() {
            console.log("开始播放倒计时音效");
        }), t.onEnded(function() {
            t.destroy();
        }), t.onError(function(e) {
            t.destroy();
        });
    },
    pauseBack: function() {
        audioCtx_djs.pause();
    },
    stopBack: function() {
        audioCtx_djs.stop();
    },
    bindGetUserInfo: function(t) {
        if (t.detail.userInfo) {
            var a = this;
            wx.request({
                url: e.globalData.sendSmsYzmConfirm,
                data: {
                    u_tel: a.data.tel,
                    u_yzm: a.data.code
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(o) {
                    if ("ok" == o.data.backyzmsms[0].jieguo) {
                        a.setData({
                            isHide: !1
                        }), e.globalData.userInfo = t.detail.userInfo;
                        var n = t.detail.userInfo.nickName, s = t.detail.userInfo.avatarUrl, i = t.detail.userInfo.country, l = t.detail.userInfo.city, d = t.detail.userInfo.province, c = t.detail.userInfo.gender;
                        wx.login({
                            success: function(t) {
                                wx.request({
                                    url: e.globalData.weburl + "/st.do?sj=openid",
                                    data: {
                                        code: t.code
                                    },
                                    success: function(t) {
                                        var o = t.data.openid;
                                        wx.request({
                                            url: e.globalData.weburl + "/st.do?sj=user",
                                            data: {
                                                u_nick: n,
                                                u_head: s,
                                                u_gj: i,
                                                u_city: l,
                                                u_sheng: d,
                                                u_sex: c,
                                                u_openid: o,
                                                u_tel: a.data.tel
                                            },
                                            header: {
                                                "content-type": "application/json"
                                            },
                                            success: function(e) {
                                                console.log(e.data), wx.setStorage({
                                                    key: "username",
                                                    data: n
                                                }), wx.setStorage({
                                                    key: "userhead",
                                                    data: s
                                                }), wx.setStorage({
                                                    key: "usersheng",
                                                    data: d
                                                }), wx.setStorage({
                                                    key: "usercity",
                                                    data: l
                                                }), wx.setStorage({
                                                    key: "usersex",
                                                    data: c
                                                }), wx.setStorage({
                                                    key: "openid",
                                                    data: o
                                                }), wx.setStorage({
                                                    key: "login_sta",
                                                    data: !0
                                                }), wx.setStorage({
                                                    key: "usertel",
                                                    data: a.data.tel
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else a.setData({
                        sendsmsback: "验证失败"
                    });
                }
            });
        } else wx.showModal({
            title: "警告",
            content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
            showCancel: !1,
            confirmText: "返回授权",
            success: function(e) {
                e.confirm && console.log("用户点击了“返回授权”");
            }
        });
    },
    getPhoneNumber: function(t) {
        console.log(t.detail.errMsg), console.log(t.detail.iv), console.log(t.detail.encryptedData);
        var a = this;
        wx.login({
            success: function(o) {
                console.log("-----获取电话重新获得code====" + o.code), wx.request({
                    url: e.globalData.weburl + "/st.do?sj=tel",
                    data: {
                        code: o.code,
                        iv: t.detail.iv,
                        encry: t.detail.encryptedData
                    },
                    success: function(e) {
                        console.log("返回解析的电话号码是:" + e.data);
                        e.data;
                        wx.setStorage({
                            key: "usertel",
                            data: e.data
                        }), a.setData({
                            isHide_tel: !1,
                            user_phone: e.data
                        });
                    }
                });
            }
        });
    }
});