Page({
  data: {
    collectionList: []
  },

  onLoad: function() {
    this.getCollectionList()
  },

  onShow: function() {
    this.getCollectionList()
  },

  // 获取收藏列表
  getCollectionList: function() {
    const collections = wx.getStorageSync('collections') || []
    if (collections.length === 0) {
      this.setData({
        collectionList: []
      })
      return
    }

    // 模拟获取收藏的活动详情
    const mockData = [
      {
        id: 1,
        name: '校园歌手大赛',
        time: '2024-04-01 19:00',
        location: '大学生活动中心',
        coverImage: '/images/sy1.png',
        status: '报名中'
      },
      {
        id: 2,
        name: '篮球联赛',
        time: '2024-04-05 14:00',
        location: '体育馆',
        coverImage: '/images/sy1.png',
        status: '已结束'
      }
    ]

    // 只显示已收藏的活动
    const collectionList = mockData.filter(item => collections.includes(item.id))
    this.setData({
      collectionList: collectionList
    })
  },

  // 取消收藏
  handleUncollect: function(e) {
    const id = e.currentTarget.dataset.id
    let collections = wx.getStorageSync('collections') || []
    collections = collections.filter(item => item !== id)
    
    wx.setStorageSync('collections', collections)
    wx.showToast({
      title: '已取消收藏',
      icon: 'success'
    })
    
    this.getCollectionList()
  },

  // 跳转到活动列表
  goToActivityList: function() {
    wx.switchTab({
      url: '/pages/activityList/activityList'
    })
  },

  // 跳转到活动详情
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${id}`
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.getCollectionList()
    wx.stopPullDownRefresh()
  }
}) 