const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary: []
  },
  // 获取数据

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getData() {
    db.collection("demolist").get().then(res => {
      this.setData({
        diary: res.data.reverse()
      })
    })
  },
  uptateData(e) {
    // 传递this
    let that = this
    let id = e.currentTarget.id
    wx.showModal({
      title: '请输入更新内容',
      editable: 'true',
      placeholderText: '换种姿势舔',
    }).then(res=>{
        if (res.confirm) {
          // 更新数据库数据
          db.collection('demolist').doc(id).update({
            data: {
              diary_item: res.content
            }
          })
          // 更新data中数据，让页面数更新
          that.updatePage(id, res.content)

          wx.showToast({
            title: '更新成功！',
            icon: 'success'
          })
      }
    })
  },

  // 更新页面
  updatePage(id, content) {
    let diary = this.data.diary.map(item => {
      if (item._id == id) {
        return {
          date: item.date,
          diary_item: content
        }
      } else {
        return item
      }
    })
    this.setData({
      diary
    })
  },
  deleteData(e) {
    let id = e.currentTarget.id
    db.collection('demolist').doc(id).remove().then(res=>console.log(res))
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