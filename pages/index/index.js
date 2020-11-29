var e = getApp(), t = wx.getBackgroundAudioManager();

t.protocol = "hls", t.title = "《习近平谈治国理政第三卷》", t.epname = "《习近平谈治国理政第三卷》", t.singer = "习近平", 
t.coverImgUrl = "";

var n, a, o = [], i = "";

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        fl_array: [],
        youxiu_list: [],
        hasUserInfo: !1,
        login_sta: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        screen_width: wx.getSystemInfoSync().windowWidth,
        screen_height: wx.getSystemInfoSync().windowHeight,
        img_height: .96 * wx.getSystemInfoSync().windowWidth * 300 / 640,
        indexCurrent: null,
        indexCurrentZan: null,
        currentpage: 1,
        adminweburl: "",
        load_new_sta: "none",
        multiArray: [],
        multiIndex: [ 0, 0 ],
        ld_left_width: .96 * wx.getSystemInfoSync().windowWidth * .96 * .96 - 50,
        ld_right_width: 40,
        gengxin_sta: "none",
        picker_width: .96 * wx.getSystemInfoSync().windowWidth * .96 * .94 - 75 - 20,
        picker_array: [],
        indexbackgroundName: "indexback_da.jpg"
    },
    launchAppError: function(e) {
        console.log("launchAppError,msg" + e.detail.errMsg);
    },
    audioPlay: function(e) {
        var n = this, a = e.currentTarget.dataset.id, o = e.currentTarget.dataset.url;
        n.setData({
            indexCurrent: a
        }), t.src = "https://xicdn.hljtv.com/houtai/" + o, t.play();
    },
    audioPause: function(e) {
        var n = this;
        e.currentTarget.dataset.id;
        n.setData({
            indexCurrent: null
        }), t.pause();
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    gotoqueryView: function() {
        wx.navigateTo({
            url: "../query/query?lx=1",
            events: {
                acceptDataFromOpenedPage: function(e) {
                    console.log(e);
                },
                someEvent: function(e) {
                    console.log(e);
                }
            },
            success: function(e) {
                e.eventChannel.emit("acceptDataFromOpenerPage", {
                    data: "test"
                });
            }
        });
    },
    onShow: function() {
        var e = this;
        e.data.screen_height, e.setData({
            indexbackgroundName: "indexback_da.jpg"
        });
    },
    onLoad: function() {
        var e = this;
        console.log("===屏幕宽度====" + e.data.screen_width), console.log("===屏幕高度====" + e.data.screen_height);
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
    jiazan: function(t) {
        var n = this;
        wx.request({
            url: e.globalData.add_zan_ld,
            data: {
                luyin_id: t.currentTarget.dataset.id,
                user_openid: wx.getStorageSync("openid")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var a = e.data.dzstalist[0].sta;
                if (console.log("---返回点赞状态是====" + a), console.log(n.data.youxiu_list), "1" == a) {
                    wx.showToast({
                        title: "成功"
                    });
                    var o = t.currentTarget.dataset.id, i = n.data.youxiu_list.map(function(e, t) {
                        return o == e.id && (e.click_zan.toString().indexOf("万") > -1 || e.click_zan.toString().indexOf("亿") > -1 || (e.click_zan.toString().indexOf("+") > -1 ? console.log("++++++++++") : e.click_zan++), 
                        e.ifdianzan = "1"), e;
                    });
                    n.setData({
                        youxiu_list: i
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
    selectFenlei: function() {
        var t = this;
        wx.request({
            url: e.globalData.fenleimulit,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var o = e.data.fenleilist, i = [];
                n = o, a = o[0].map(function(e) {
                    return e.name;
                });
                for (var l = 0; l < o[1].length; l++) o[0][0].id == o[1][l].id && (i[l] = o[1][l].name);
                t.setData({
                    multiArray: [ a, i ]
                }), console.log(t.data.multiArray);
            }
        });
    },
    LingDulist: function() {
        var t = this;
        wx.request({
            url: e.globalData.lingduurl,
            data: {
                flname: i,
                user_openid: wx.getStorageSync("openid"),
                curepage: t.data.currentpage
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t.setData({
                    youxiu_list: e.data.lingdulist,
                    load_new_sta: "none",
                    gengxin_sta: "block"
                }), console.log(e.data.lingdulist);
            }
        });
    },
    selectYouXiuListLogin: function() {
        console.log("登录=====jjjj");
        var t = this;
        wx.request({
            url: e.globalData.youxiulogin,
            data: {
                flname: i,
                user_openid: wx.getStorageSync("openid"),
                curepage: t.data.currentpage
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log(e.data.youxiulist.length), t.setData({
                    youxiu_list: e.data.youxiulist,
                    load_new_sta: "none"
                });
            }
        });
    },
    selectYouXiuListNologin: function() {
        console.log("未登录=====jjjj");
        var t = this;
        wx.request({
            url: e.globalData.youxiu,
            data: {
                flname: i,
                curepage: t.data.currentpage
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log(e.data.youxiulist.length), console.log("---bbbb--" + e.data.youxiulist), 
                t.setData({
                    youxiu_list: e.data.youxiulist,
                    load_new_sta: "none"
                });
            }
        });
    },
    selectLunbo: function() {
        var t = this;
        wx.request({
            url: e.globalData.lunbotu,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t.setData({
                    swiperlist: e.data.lunbolist
                });
            }
        });
    },
    bindPickerChange: function(e) {
        var t = this;
        console.log("picker发送选择改变，携带值为", e.detail.value), console.log(o[e.detail.value]), 
        i = t.data.fl_array[e.detail.value], console.log("-----------fl_chuan_temp---" + i), 
        t.selectYouXiuList();
    },
    loadmores: function() {
        var e = this;
        e.setData({
            currentpage: e.data.currentpage + 1,
            load_new_sta: "block",
            login_sta: wx.getStorageSync("login_sta")
        }), e.data.login_sta ? (console.log("登录"), e.selectYouXiuListLogin()) : (console.log("未登录"), 
        e.selectYouXiuListNologin());
    },
    onReachBottom: function() {},
    bindMultiPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        var t = this, a = e.detail.value, o = [];
        console.log("=====----最后获得的ssss数据是====" + a[1]);
        var l = n[0][a[0]].id;
        console.log("=====最后选择的大分类ID是" + l);
        for (var s = 0, c = 0; c < n[1].length; c++) l == n[1][c].id && (console.log("=========添加的数据是====" + n[1][c].name), 
        o[s] = n[1][c].name, s++);
        console.log("-------用户最后选择的小分类名字是=====" + o), console.log("-------用户最后选择的小分类名字是=====" + o[a[1]]), 
        t.setData({
            multiIndex: e.detail.value
        }), i = o[a[1]], t.data.login_sta ? (console.log("登录"), t.selectYouXiuListLogin()) : (console.log("未登录"), 
        t.selectYouXiuListNologin());
    },
    bindMultiPickerColumnChange: function(e) {
        var t = [];
        console.log("修改的列为", e.detail.column, "，值为", e.detail.value);
        var a = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        switch (a.multiIndex[e.detail.column] = e.detail.value, e.detail.column) {
          case 0:
            switch (a.multiIndex[0]) {
              case 0:
                console.log("000000000000000000000000");
                var o = n[0][0].id;
                console.log("====大分类数组===" + o);
                for (var i = 0, l = 0; l < n[1].length; l++) n[1][l].id == o && (t[i] = n[1][l].name, 
                console.log("----------------" + n[1][l].name), i++);
                a.multiArray[1] = t;
                break;

              case 1:
                console.log("1111111111111111111111111111");
                var s = n[0][1].id;
                console.log("====大分类数组===" + s);
                for (var i = 0, c = 0; c < n[1].length; c++) n[1][c].id == s && (t[i] = n[1][c].name, 
                console.log("----------------" + n[1][c].name), i++);
                a.multiArray[1] = t;
            }
            a.multiIndex[1] = 0;
        }
        this.setData(a);
    },
    jumpmore: function(e) {
        console.log("dddd"), wx.navigateTo({
            url: "/pages/more/more",
            events: {
                acceptDataFromOpenedPage: function(e) {
                    console.log(e);
                },
                someEvent: function(e) {
                    console.log(e);
                }
            },
            success: function(e) {
                e.eventChannel.emit("acceptDataFromOpenerPage", {
                    data: "test"
                });
            }
        });
    }
});