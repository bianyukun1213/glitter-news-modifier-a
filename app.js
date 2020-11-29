var s = "https://xi.hljtv.com";

App({
    onLaunch: function() {
        var s = this, e = wx.getStorageSync("logs") || [];
        e.unshift(Date.now()), wx.setStorageSync("logs", e), wx.login({
            success: function(s) {}
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        s.globalData.userInfo = e.userInfo, s.userInfoReadyCallback && s.userInfoReadyCallback(e);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        weburl: s,
        daojishiVideo: s + "/video/3.mp3",
        lunbotu: s + "/st.do?sj=lunbo",
        fenlei: s + "/st.do?sj=fenlei",
        fenleimulit: s + "/st.do?sj=fenleimulit",
        fastfenlei: s + "/st.do?sj=fenleifast",
        youxiu: s + "/st_redis.do?sj=yxzp_r",
        youxiulogin: s + "/st_redis.do?sj=yxzp_r",
        usersms: s + "/st.do?sj=usersms",
        userone: s + "/st.do?sj=userone",
        updatesms: s + "/st.do?sj=userupdate",
        duwulist: s + "/st.do?sj=duwu",
        duwulistkey: s + "/st.do?sj=keword",
        duwuOne: s + "/st.do?sj=duwuone",
        add_zan: s + "/st.do?sj=add_zan",
        add_zan_ld: s + "/st.do?sj=add_zan_ld",
        uploadFileAudio: s + "/st.do?sj=audioupload",
        deleteLY: s + "/st.do?sj=deletely",
        paihangFenLei: s + "/st.do?sj=ph_fl",
        paihangFenLeiSms: s + "/st.do?sj=ph_fl_sms",
        adminUrl: s + "/",
        shardImg: s + "/shard/shard.jpg",
        paihangImg: s + "/shard/paihang.jpg",
        youxiuMoreNoLoginurl: s + "/st_redis.do?sj=gdsd_r",
        youxiuMoreLoginurl: s + "/st_redis.do?sj=gdsd_r",
        lingduurl: s + "/st_redis.do?sj=syld_r",
        fenleiRedis: s + "/st_redis.do?sj=fenlei_r",
        HaveTingForFLid: s + "/st_redis.do?sj=smsforflid",
        HaveTingForKey: s + "/st_redis.do?sj=smsforkey",
        paihangRedis: s + "/st_redis.do?sj=ph_list",
        duwulist_redis: s + "/st_redis.do?sj=duwu_r",
        beijingyinyue: s + "/upload/vdo/2020/07/2020073122580164205156ca529.mp3",
        getUserTel: s + "/st.do?sj=tel",
        sendSmsToUser: s + "/st.do?sj=sendsms",
        sendSmsYzmConfirm: s + "/st.do?sj=yzm_ok",
        saveuserreadjilu: s + "/st.do?sj=savereadtime",
        secondUserInfo: s + "/st.do?sj=secondUserinfo",
        CountUserStudy: s + "/st.do?sj=studySta"
    }
});