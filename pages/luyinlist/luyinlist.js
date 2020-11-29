var t, e, a = getApp(), n = "全部";

Page({
    data: {
        loading_sta: "none",
        multiArray: [],
        multiIndex: [ 0, 0 ],
        fastArray: [],
        current_tabid: "00",
        current_page: 1,
        lylist: [],
        pxzt: 0
    },
    gotoqueryView: function() {
        wx.navigateTo({
            url: "../querylu/querylu?lx=2",
            events: {
                acceptDataFromOpenedPage: function(t) {
                    console.log(t);
                },
                someEvent: function(t) {
                    console.log(t);
                }
            },
            success: function(t) {
                t.eventChannel.emit("acceptDataFromOpenerPage", {
                    data: "test"
                });
            }
        });
    },
    loadmores: function() {
        var t = this, e = t.data.current_page + 1;
        t.setData({
            loading_sta: "block",
            current_page: e
        }), t.selectLuyinList();
    },
    fast_fenlei: function(t) {
        var e = this;
        e.setData({
            loading_sta: "block",
            current_tabid: t.currentTarget.dataset.id,
            current_page: 1
        });
        var a = t.currentTarget.dataset.keyword;
        n = a, (e = this).selectLuyinList();
    },
    onLoad: function(t) {
        var e = this;
        wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        }), e.selectLuyinList();
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            loading_sta: "none"
        });
    },
    fastFenLei: function() {
        console.log("jjjjjjjjjjjjjjjjjjjjjjj");
        var t = this;
        wx.request({
            url: a.globalData.fastfenlei,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t.setData({
                    fastArray: e.data.kjfllist
                });
            }
        });
    },
    selectFenlei: function() {
        var n = this;
        wx.request({
            url: a.globalData.fenleimulit,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                var i = a.data.fenleilist, l = [];
                t = i, e = i[0].map(function(t) {
                    return t.name;
                });
                for (var o = 0; o < i[1].length; o++) i[0][0].id == i[1][o].id && (l[o] = i[1][o].name);
                n.setData({
                    multiArray: [ e, l ]
                });
            }
        });
    },
    bindMultiPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        for (var a = this, i = e.detail.value, l = [], o = t[0][e.detail.value[0]].id, s = 0, r = 0; r < t[1].length; r++) o == t[1][r].id && (l[s] = t[1][r].name, 
        s++);
        console.log("-------用户最后选择的小分类名字是=====" + l[i[1]]), a.setData({
            multiIndex: e.detail.value
        }), n = l[i[1]], a.selectLuyinList();
    },
    bindMultiPickerColumnChange: function(e) {
        var a = [];
        console.log("修改的列为", e.detail.column, "，值为", e.detail.value);
        var n = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        switch (n.multiIndex[e.detail.column] = e.detail.value, e.detail.column) {
          case 0:
            switch (n.multiIndex[0]) {
              case 0:
                console.log("000000000000000000000000");
                var i = t[0][0].id;
                console.log("====大分类数组===" + i);
                for (var l = 0, o = 0; o < t[1].length; o++) t[1][o].id == i && (a[l] = t[1][o].name, 
                console.log("----------------" + t[1][o].name), l++);
                n.multiArray[1] = a;
                break;

              case 1:
                console.log("1111111111111111111111111111");
                var s = t[0][1].id;
                console.log("====大分类数组===" + s);
                for (var l = 0, r = 0; r < t[1].length; r++) t[1][r].id == s && (a[l] = t[1][r].name, 
                console.log("----------------" + t[1][r].name), l++);
                n.multiArray[1] = a;
            }
            n.multiIndex[1] = 0;
        }
        this.setData(n);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareTimeline: function() {
        return {
            title: "读《习近平谈治国理政》第三卷",
            path: "pages/index/index",
            imageUrl: a.globalData.shardImg,
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
            title: "读《习近平谈治国理政》第三卷",
            path: "pages/index/index",
            imageUrl: a.globalData.shardImg,
            success: function(t) {
                console.log("转发成功:" + JSON.stringify(t));
            },
            fail: function(t) {
                console.log("转发失败:" + JSON.stringify(t));
            }
        };
    },
    orderByLuyinList: function(t) {
        for (var e = this, a = [], n = e.data.lylist, i = 0, l = 0; l < n.length; l++) a[i] = n[n.length - 1 - l], 
        i++;
        0 == t.currentTarget.dataset.id ? e.setData({
            lylist: a,
            pxzt: 1
        }) : e.setData({
            lylist: a,
            pxzt: 0
        });
    },
    selectLuyinList: function() {
        var t = this;
        wx.request({
            url: a.globalData.duwulist_redis,
            data: {
                gsfl: n,
                fy: t.data.current_page
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t.setData({
                    lylist: e.data.TabSongdulist,
                    loading_sta: "none"
                });
            }
        });
    },
    inputselect: function(t) {
        var e = this;
        console.log(t.detail.value), wx.request({
            url: a.globalData.duwulistkey,
            data: {
                keyword: t.detail.value
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e.setData({
                    lylist: t.data.luyinlist,
                    loading_sta: "none"
                });
            }
        });
    },
    golangdu: function(t) {
        wx.navigateTo({
            url: "../../pages/luyinone/luyinone"
        });
    }
});