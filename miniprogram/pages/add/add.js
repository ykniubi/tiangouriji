// pages/add/add.js
const db = wx.cloud.database()

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds() //秒 
  };
  if (/(y+)/.test(fmt)) { //根据y的长度来截取年
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  }
  return fmt;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form_info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  addData(e) {
    let diary_item = e.detail.value.diary_content

    var date = new Date().Format("yyyy-MM-dd hh:mm:ss");
    if(diary_item.trim()){
      db.collection("demolist").add({
        data:{
          diary_item,
          date
        }
      })
      this.setData({form_info:''})
      wx.showToast({
        title: '提交成功!',
        icon:'success'
      })
    }else{
      wx.showToast({
        title: '不能为空!',
        icon:'error'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})