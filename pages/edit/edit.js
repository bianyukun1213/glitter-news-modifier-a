Page({
  onLoad() {
    var info = wx.getStorageSync("info") || {
      userhead: "../imgs/nologin.png",
      usernick: "马保国",
      userqianming: "黑龙江科技大学",
      StudyAllDay: 365
    };
    this.setData({
      userhead: info.userhead,
      usernick: info.usernick,
      userqianming: info.userqianming,
      StudyAllDay: info.StudyAllDay
    });
  },
  onAvatarChange() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: res => {
        that.urlTobase64(res.tempFilePaths[0]);
      }
    });
  },
  onSave(data) {
    var info = {
      userhead: this.data.userhead,
      usernick: data.detail.value.usernick,
      userqianming: data.detail.value.userqianming,
      StudyAllDay: data.detail.value.StudyAllDay
    };
    wx.setStorageSync("info", info);
    wx.navigateBack();
  },
  onShareAppMessage() {},
  urlTobase64(imgPath) {
    //读取图片的base64文件内容
    wx.getFileSystemManager().readFile({
      filePath: imgPath, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => this.setData({
        userhead: 'data:image/png;base64,' + res.data
      })
    })
  }
});