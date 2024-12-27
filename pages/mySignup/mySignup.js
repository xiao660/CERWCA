// pages/mySignup/mySignup.js
Page({
  data: {
    signupList: [],
    currentStatus: 'all',
    filteredList: []
  },

  onShow() {
    this.getSignupList()
  },

  // 获取报名列表
  getSignupList() {
    const signups = wx.getStorageSync('signups') || []
    const formattedSignups = signups.map(item => ({
      ...item,
      activityId: item.activityId || 1,
      signupTimeStr: this.formatTime(item.signupTime)
    }))
    
    this.setData({
      signupList: formattedSignups.sort((a, b) => b.signupTime - a.signupTime)
    })
    this.filterList()
  },

  // 格式化时间
  formatTime(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hour}:${minute}`
  },

  // 格式化活动状态
  getActivityStatus: function(time) {
    const now = new Date().getTime()
    // 将日期格式转换为 iOS 支持的格式
    const formattedTime = time.replace(/-/g, '/')
    const activityTime = new Date(formattedTime).getTime()
    const endTime = activityTime + (3 * 60 * 60 * 1000)

    if (now < activityTime) {
      return {
        text: '未开始',
        class: 'status-upcoming'
      }
    } else if (now <= endTime) {
      return {
        text: '进行中',
        class: 'status-ongoing'
      }
    } else {
      return {
        text: '已结束',
        class: 'status-completed'
      }
    }
  },

  // 切换状态筛选
  switchTab(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ currentStatus: status })
    this.filterList()
  },

  // 筛选列表
  filterList() {
    let list = [...this.data.signupList]
    
    // 按状态筛选
    if (this.data.currentStatus !== 'all') {
      const status = this.data.currentStatus === 'active' ? '已报名' : '已取消'
      list = list.filter(item => item.status === status)
    }
    
    this.setData({ filteredList: list })
  },

  // 跳转到活动详情
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id
    const status = e.currentTarget.dataset.status
    if (status === '已取消') {
      wx.showToast({
        title: '报名已取消',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${id}`
    })
  },

  // 跳转到活动列表
  goToActivityList: function() {
    wx.switchTab({
      url: '/pages/activityList/activityList'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getSignupList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // TODO: 加载更多数据
  },

  // 处理取消报名
  handleCancel(e) {
    const id = e.currentTarget.dataset.id
    // 检查是否已签到
    const checkins = wx.getStorageSync('checkins') || {}
    const activityId = e.currentTarget.dataset.activityId
    if (checkins[activityId]) {
      wx.showToast({
        title: '已签到不可取消报名',
        icon: 'none'
      })
      return
    }
    wx.showModal({
      title: '取消报名',
      content: '确定要取消报名吗？',
      success: (res) => {
        if (res.confirm) {
          this.cancelSignup(id)
        }
      }
    })
  },

  // 取消报名
  cancelSignup(id) {
    const signups = wx.getStorageSync('signups') || []
    const index = signups.findIndex(item => item.id === id)
    if (index > -1) {
      signups[index].status = '已取消'
      wx.setStorageSync('signups', signups)
      this.getSignupList()
      wx.showToast({
        title: '已取消报名',
        icon: 'success'
      })
    }
  }
})