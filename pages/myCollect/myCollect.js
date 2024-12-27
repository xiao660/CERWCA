Page({
  data: {
    collectList: []
  },

  onShow() {
    this.getCollectList()
  },

  // 获取收藏列表
  getCollectList() {
    const collects = wx.getStorageSync('collects') || []
    const formattedCollects = collects.map(item => ({
      ...item,
      collectTimeStr: this.formatTime(item.collectTime)
    }))
    
    this.setData({
      collectList: formattedCollects.sort((a, b) => b.collectTime - a.collectTime)
    })
  },

  // 格式化时间
  formatTime(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  },

  // 跳转到活动详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${id}`
    })
  },

  // 处理取消收藏
  handleCancelCollect(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '取消收藏',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          this.cancelCollect(id)
        }
      }
    })
  },

  // 取消收藏
  cancelCollect(id) {
    const collects = wx.getStorageSync('collects') || []
    const newCollects = collects.filter(item => item.id !== id)
    wx.setStorageSync('collects', newCollects)
    this.getCollectList()
    wx.showToast({
      title: '已取消收藏',
      icon: 'success'
    })
  },

  onPullDownRefresh() {
    this.getCollectList()
    wx.stopPullDownRefresh()
  }
}) 