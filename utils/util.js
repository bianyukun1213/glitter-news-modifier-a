var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTimeData: function(e) {
        return [ e.getFullYear(), e.getMonth() + 1, e.getDate() ].map(t).join("-");
    },
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, i = e.getDate(), u = e.getHours(), a = e.getMinutes(), c = e.getSeconds();
        return [ n, o, i ].map(t).join("/") + " " + [ u, a, c ].map(t).join(":");
    },
    buttonClicked: function(t) {
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 5e3);
    },
    buttonNotClicked: function(t) {
        t.setData({
            buttonClicked_upload: !0
        });
    },
    buttonNotClicked_ST: function(t) {
        t.setData({
            buttonClicked_shiting: !0
        });
    }
};