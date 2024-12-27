const mockData = require('../../utils/mockData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    hotActivities: [],
    recentActivities: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图数据
    this.setData({
      bannerList: mockData.getBannerList()
    })
    
    // 获取热门活动
    this.setData({
      hotActivities: mockData.getHotActivities().slice(0, 4)
    })
    
    // 获取最近活动
    this.setData({
      recentActivities: mockData.getRecentActivities().slice(0, 4)
    })
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
    
  },

  // 跳转到活动详情
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${id}`
    })
  }
})