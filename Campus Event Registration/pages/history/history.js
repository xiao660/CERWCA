Page({
  data: {
    currentDate: '',
    historyList: []
  },

  onLoad: function() {
    // 设置当前月份
    const date = new Date()
    const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    this.setData({
      currentDate: currentDate
    })
    this.getHistoryList()
  },

  // 选择月份
  onDateChange: function(e) {
    this.setData({
      currentDate: e.detail.value
    })
    this.getHistoryList()
  },

  // 获取历史记录
  getHistoryList: function() {
    // 从本地存储获取报名记录
    const signups = wx.getStorageSync('signups') || []
    
    // 获取当前选择的年月
    const [year, month] = this.data.currentDate.split('-')
    
    // 筛选当前月份的记录并格式化
    const historyList = signups
      .filter(item => {
        const itemDate = new Date(item.signupTime)
        return itemDate.getFullYear() === parseInt(year) && 
               itemDate.getMonth() + 1 === parseInt(month)
      })
      .map(item => ({
        id: item.id,
        activityId: item.activityId,
        activityName: item.activityName,
        date: this.formatDate(item.signupTime),
        time: this.formatTime(item.signupTime),
        location: item.location,
        status: item.status || '已参加'
      }))
      .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))

    this.setData({
      historyList: historyList
    })
  },

  // 格式化日期
  formatDate(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  },

  // 格式化时间
  formatTime(timestamp) {
    const date = new Date(timestamp)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
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
    this.getHistoryList()
    wx.stopPullDownRefresh()
  }
}) 