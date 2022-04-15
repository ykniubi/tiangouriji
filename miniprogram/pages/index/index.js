Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary: [],
    isTrigger: true,
  },
  // 获取数据

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()


  },
  // scrollview下拉刷新
  refresh(){
    this.setData({
      diary: []
    })
    this.getData(6, 0)
    setTimeout(()=>{
      this.setData({isTrigger:false})
    },1000)
  },
  // scrollview触底
  reachBottom(){
    let skip = this.data.diary.length
    this.getData(6, skip)
  },


  // 传入获取数据个数以及跳过几个数据
  getData(num = 6, skip = 0) {
    wx.cloud.callFunction({
      name: "getData",
      data: {
        num,
        skip
      }
    }).then((res) => {
      let diary = this.data.diary.concat(res.result.data)
      this.setData({
        diary,
      })
    })
  },

  uptateData(e) {
    let that = this
    let id = e.currentTarget.id
    wx.showModal({
      editable: true,
      title: '请输入更新内容',
      placeholderText: '换种姿势舔',
      success(res) {
        if (res.confirm) {
          // 更新数据库数据
          let content = res.content
          wx.cloud.callFunction({
            name: 'updateData',
            data: {
              id,
              content
            }
          })

          // 更新data中数据，让页面数更新
          that.updatePage(id, false, res.content)

          wx.showToast({
            title: '更新成功！',
            icon: 'success'
          })
        }
      }
    })
  },

  // 更新页面(更新数据后的)
  updatePage(id, isdel, content) {
    let diary = this.data.diary

    if (isdel) {
      diary = diary.filter(item => {
        return item._id != id
      })
    } else {
      diary = diary.map(item => {
        if (item._id == id) {
          return {
            _id: item._id,
            date: item.date,
            diary_item: content
          }
        } else {
          return item
        }
      })
    }
    this.setData({
      diary
    })
  },

  // 删除数据
  deleteData(e) {
    let id = e.currentTarget.id
    // 调用云函数删除
    wx.cloud.callFunction({
      name: 'deleteData',
      data: {
        id
      }
    })
    wx.showToast({
      title: '删除成功',
      icon: 'success'
    })
    this.updatePage(id, true)
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
    // this.setData({
    //   diary: []
    // })
    // this.getData(6, 0)
    // setTimeout(() => {
    //   wx.stopPullDownRefresh()
    // }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let skip = this.data.diary.length
    // this.getData(6, skip)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})