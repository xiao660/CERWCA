// pages/activityDetail/activityDetail.js
const mockData = require('../../utils/mockData.js')
const auth = require('../../utils/auth.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: null,
    isCollected: false,
    commentList: [],
    commentText: '',
    isCheckedIn: false,
    showCheckinBtn: true,  // 默认显示签到按钮
    isSignedUp: false,
    canSignup: false,
    countdown: '',
    countdownType: '',
    timer: null,
    isRemindSet: false,
    remindTime: 30,
    showFloatButtons: true  // 控制浮动按钮显示/隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 根据id获取活动详情
    if (options.id) {
      this.getActivityDetail(options.id)
      this.checkCollectionStatus(options.id)
      this.checkCheckinStatus(options.id)
      this.getCommentList(options.id)
      this.checkSignupStatus(options.id)
      this.checkRemindStatus(options.id)
      this.getUserInfo()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 清除定时器
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 获取活动详情
  getActivityDetail: function(id) {
    const activity = mockData.getActivityById(id)
    if (!activity) return
    
    // 检查是否可以报名
    const now = new Date()
    const activityTime = new Date(activity.time)
    
    // 更新活动状态
    if (now > activityTime) {
      activity.status = '已结束'
      activity.canSignup = false
    } else {
      activity.status = '报名中'
      activity.canSignup = true
    }

    this.setData({
      activity: activity,
      canSignup: activity.canSignup
    })
    this.startCountdown()
    this.getRelatedActivities(activity.type)
  },

  // 获取相关活动
  getRelatedActivities: function(type) {
    // 获取同类型的其他活动
    const relatedActivities = mockData.getActivitiesByType(type)
      .filter(item => item.id !== this.data.activity.id)
      .slice(0, 3)
    
    this.setData({
      relatedActivities: relatedActivities
    })
  },

  // 跳转到相关活动
  goToActivity: function(e) {
    const id = e.currentTarget.dataset.id
    wx.redirectTo({
      url: `/pages/activityDetail/activityDetail?id=${id}`
    })
  },

  // 处理报名
  handleSignup: function() {
    // 如果已经报名，显示提示
    if (this.data.isSignedUp) {
      wx.showToast({
        title: '您已报名该活动',
        icon: 'none'
      })
      return
    }

    // 检查登录状态
    const userInfo = auth.getUserInfo()
    if (!userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再报名',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/profile/profile'
            })
          }
        }
      })
      return
    }

    // 检查个人信息是否已完善
    if (!auth.checkProfileComplete(userInfo)) {
      wx.showModal({
        title: '提示',
        content: '请先完善个人信息',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/completeInfo/completeInfo?from=signup'
            })
          }
        }
      })
      return
    }

    // 检查报名条件
    if (!this.data.canSignup) {
      wx.showToast({
        title: '报名已截止或名额已满',
        icon: 'none'
      })
      return
    }

    // 显示报名确认弹窗
    wx.showModal({
      title: '确认报名',
      content: '是否确认报名参加该活动？',
      success: (res) => {
        if (res.confirm) {
          this.submitSignup()
        }
      }
    })
  },

  // 提交报名
  submitSignup: function() {
    const signups = wx.getStorageSync('signups') || []
    
    // 添加报名记录
    signups.unshift({
      id: Date.now(),
      activityId: this.data.activity.id,
      activityName: this.data.activity.name,
      coverImage: this.data.activity.coverImage,  // 保存活动封面图片
      time: this.data.activity.time,
      location: this.data.activity.location,
      status: '已报名',
      signupTime: Date.now(),  // 使用时间戳便于排序
      userInfo: this.data.userInfo
    })
    
    wx.setStorageSync('signups', signups)
    
    // 更新报名状态和人数
    this.setData({
      isSignedUp: true,
      'activity.signupCount': this.data.activity.signupCount + 1
    })
    
    wx.showToast({
      title: '报名成功',
      icon: 'success'
    })
  },

  // 检查收藏状态
  checkCollectionStatus: function(id) {
    const collects = wx.getStorageSync('collects') || []
    const isCollected = collects.some(item => item.id === parseInt(id, 10))
    this.setData({ isCollected })
  },

  // 处理收藏
  handleCollect: function() {
    if (!auth.checkLogin()) return

    const collects = wx.getStorageSync('collects') || []
    const isCollected = collects.some(item => item.id === parseInt(this.data.activity.id))
    
    if (isCollected) {
      // 取消收藏
      const newCollects = collects.filter(item => item.id !== parseInt(this.data.activity.id))
      wx.setStorageSync('collects', newCollects)
      this.setData({ isCollected: false })
      wx.showToast({
        title: '已取消收藏',
        icon: 'success'
      })
    } else {
      // 添加收藏
      const collectInfo = {
        id: parseInt(this.data.activity.id),
        name: this.data.activity.name,
        time: this.data.activity.time,
        location: this.data.activity.location,
        status: this.data.activity.status,
        signupCount: this.data.activity.signupCount,
        maxCount: this.data.activity.maxCount,
        type: this.data.activity.type,
        description: this.data.activity.description,
        coverImage: this.data.activity.coverImage,
        collectTime: Date.now()
      }
      collects.push(collectInfo)
      wx.setStorageSync('collects', collects)
      this.setData({ isCollected: true })
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      })
    }
  },

  // 获取评论列表
  getCommentList: function(activityId) {
    const comments = wx.getStorageSync('comments') || {}
    const activityComments = comments[activityId] || []
    this.setData({
      commentList: activityComments.sort((a, b) => b.timestamp - a.timestamp)
    })
  },

  // 评论输入
  onCommentInput: function(e) {
    this.setData({
      commentText: e.detail.value
    })
  },

  // 提交评论
  submitComment: function() {
    // 如果评论为空，直接返回
    const content = this.data.commentText.trim()
    if (!content) {
      return
    }
    
    // 检查登录状态
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再评论',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/profile/profile'
            })
          }
        }
      })
      return
    }

    wx.showLoading({
      title: '发送中...'
    })

    // 构建评论数据
    const newComment = {
      id: Date.now(),
      activityId: this.data.activity.id,
      userId: userInfo.id,
      userName: userInfo.nickName,
      userAvatar: userInfo.avatarUrl,
      content: content,
      time: this.formatTime(new Date()),
      timestamp: Date.now()
    }

    // 保存评论
    const comments = wx.getStorageSync('comments') || {}
    const activityComments = comments[this.data.activity.id] || []
    activityComments.unshift(newComment)
    comments[this.data.activity.id] = activityComments
    wx.setStorageSync('comments', comments)

    // 更新页面
    this.setData({
      commentList: activityComments,
      commentText: ''
    })

    wx.hideLoading()
    wx.showToast({
      title: '评论成功',
      icon: 'success'
    })
  },

  // 格式化时间
  formatTime: function(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  },

  // 检查签到状态
  checkCheckinStatus: function(activityId) {
    const checkins = wx.getStorageSync('checkins') || {}
    const isCheckedIn = checkins[activityId] || false
    
    // 检查活动时间
    const activityTime = new Date(this.data.activity.time).getTime()
    const now = new Date().getTime()
    // 只在活动开始前后2小时内可以签到
    const canCheckin = Math.abs(now - activityTime) <= 2 * 60 * 60 * 1000
    
    this.setData({ 
      isCheckedIn,
      showCheckinBtn: true  // 始终显示签到按钮
    })
  },

  // 处理签到
  handleCheckin: function() {
    // 检查登录状态
    const userInfo = auth.getUserInfo()
    if (!userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再签到',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/profile/profile'
            })
          }
        }
      })
      return
    }

    // 检查是否已报名
    if (!this.data.isSignedUp) {
      wx.showModal({
        title: '提示',
        content: '请先报名活动后再签到',
        success: (res) => {
          if (res.confirm) {
            // 可以滚动到报名按钮位置
            wx.pageScrollTo({
              selector: '.signup-btn',
              duration: 300
            })
          }
        }
      })
      return
    }

    // 检查活动时间
    const activityTime = new Date(this.data.activity.time).getTime()
    const now = new Date().getTime()
    if (Math.abs(now - activityTime) > 2 * 60 * 60 * 1000) {
      wx.showToast({
        title: '不在签到时间内',
        icon: 'none'
      })
      return
    }

    // 如果已经签到，显示提示
    if (this.data.isCheckedIn) {
      wx.showToast({
        title: '已完成签到',
        icon: 'success'
      })
      return
    }

    wx.showLoading({
      title: '签到中...'
    })

    // 模拟签到请求
    setTimeout(() => {
      // 保存签到状态到本地存储
      const activityId = this.data.activity.id
      const checkins = wx.getStorageSync('checkins') || {}
      checkins[activityId] = true
      wx.setStorageSync('checkins', checkins)

      // 更新页面状态
      this.setData({
        isCheckedIn: true
      })

      wx.hideLoading()
      wx.showToast({
        title: '签到成功',
        icon: 'success'
      })
    }, 500)
  },

  // 检查报名状态
  checkSignupStatus: function(activityId) {
    const signups = wx.getStorageSync('signups') || []
    const isSignedUp = signups.some(item => 
      item.activityId === Number(activityId) && 
      item.status === '已报名'
    )
    
    this.setData({ 
      isSignedUp,
      // 更新报名按钮状态
      canSignup: !isSignedUp && this.data.activity.signupCount < this.data.activity.maxCount
    })

    // 更新签到按钮状态
    this.checkCheckinStatus(activityId)
  },

  // 开始倒计时
  startCountdown: function() {
    const now = new Date().getTime()
    const activityTime = new Date(this.data.activity.time).getTime()

    const updateCountdown = () => {
      const currentTime = new Date().getTime()
      let diff
      
      if (currentTime < activityTime) {
        // 距离活动开始
        diff = activityTime - currentTime
        this.setData({ countdownType: '距活动开始' })
      } else {
        // 活动已开始
        diff = currentTime - activityTime
        this.setData({ countdownType: '活动已开始' })
      }

      // 计算时间
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      let countdownText = ''
      if (days > 0) {
        countdownText = `${days}天${hours}小时`
      } else if (hours > 0) {
        countdownText = `${hours}小时${minutes}分`
      } else {
        countdownText = `${minutes}分${seconds}秒`
      }

      this.setData({ countdown: countdownText })
    }

    // 立即执行一次
    updateCountdown()

    // 设置定时器
    this.data.timer = setInterval(updateCountdown, 1000)
  },

  // 检查提醒状态
  checkRemindStatus: function(activityId) {
    const reminders = wx.getStorageSync('reminders') || {}
    const isRemindSet = reminders[activityId] || false
    this.setData({
      isRemindSet
    })
  },

  // 处理提醒设置
  handleRemind: function() {
    // 检查登录状态
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再设置提醒',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/profile/profile'
            })
          }
        }
      })
      return
    }

    if (this.data.isRemindSet) {
      // 取消提醒
      wx.showModal({
        title: '取消提醒',
        content: '确定要取消活动提醒吗？',
        success: (res) => {
          if (res.confirm) {
            this.cancelReminder()
          }
        }
      })
    } else {
      // 设置提醒
      wx.showActionSheet({
        itemList: ['提前30分钟', '提前1小时', '提前2小时', '提前1天'],
        success: (res) => {
          const times = [30, 60, 120, 1440]
          this.setReminder(times[res.tapIndex])
        }
      })
    }
  },

  // 设置提醒
  setReminder: function(minutes) {
    const activityTime = new Date(this.data.activity.time).getTime()
    const remindTime = activityTime - minutes * 60 * 1000

    // 保存提醒设置
    const reminders = wx.getStorageSync('reminders') || {}
    reminders[this.data.activity.id] = {
      activityId: this.data.activity.id,
      activityName: this.data.activity.name,
      activityTime: this.data.activity.time,
      remindTime: remindTime,
      minutes: minutes
    }
    wx.setStorageSync('reminders', reminders)

    this.setData({
      isRemindSet: true,
      remindTime: minutes
    })

    wx.showToast({
      title: '提醒设置成功',
      icon: 'success'
    })
  },

  // 取消提醒
  cancelReminder: function() {
    const reminders = wx.getStorageSync('reminders') || {}
    delete reminders[this.data.activity.id]
    wx.setStorageSync('reminders', reminders)

    this.setData({
      isRemindSet: false
    })

    wx.showToast({
      title: '已取消提醒',
      icon: 'success'
    })
  },

  // 获取用户信息
  getUserInfo: function() {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({ userInfo })
  },

  // 页面滚动监听
  onPageScroll: function(e) {
    // 获取当前滚动方向
    const currentScrollTop = e.scrollTop
    if (!this.lastScrollTop) {
      this.lastScrollTop = 0
    }
    
    // 向下滚动超过50px时隐藏按钮，向上滚动时显示按钮
    if (currentScrollTop > this.lastScrollTop && currentScrollTop > 50) {
      // 向下滚动
      if (this.data.showFloatButtons) {
        this.setData({ showFloatButtons: false })
      }
    } else if (currentScrollTop < this.lastScrollTop) {
      // 向上滚动
      if (!this.data.showFloatButtons) {
        this.setData({ showFloatButtons: true })
      }
    }
    
    // 更新上次滚动位置
    this.lastScrollTop = currentScrollTop
  },

  // 复制文本
  copyText: function(e) {
    const text = e.currentTarget.dataset.text
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        })
      }
    })
  }
})