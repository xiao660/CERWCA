// pages/profile/profile.js
const app = getApp()
const auth = require('../../utils/auth.js')
const defaultAvatarUrl = '/images/mryh.png'

Page({
  data: {
    userInfo: null,
    defaultAvatarUrl: defaultAvatarUrl
  },

  onLoad() {
    // 检查本地是否有用户信息
    const userInfo = auth.getUserInfo()
    if (userInfo) {
      this.setData({ userInfo })
    }
  },

  onShow() {
    // 每次显示页面时获取最新的用户信息
    const userInfo = auth.getUserInfo()
    if (userInfo) {
      this.setData({ userInfo })
    }
  },

  // 处理微信登录
  handleWXLogin(e) {
    console.log('点击微信登录按钮')
    const { avatarUrl } = e.detail
    console.log('选择头像:', avatarUrl)

    wx.login({
      success: (loginRes) => {
        if (loginRes.code) {
          console.log('获取code成功：', loginRes.code)
          
          // 构建用户信息
          const fullUserInfo = {
            avatarUrl: avatarUrl,
            nickName: '微信用户', // 默认昵称
            code: loginRes.code,
            loginTime: new Date().toLocaleString()
          }
          
          // 保存用户信息
          auth.saveUserInfo(fullUserInfo)
          
          // 更新全局数据
          if (!app.globalData) {
            app.globalData = {}
          }
          app.globalData.userInfo = fullUserInfo
          
          // 更新页面数据
          this.setData({ 
            userInfo: fullUserInfo
          })
          
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
        }
      },
      fail: (err) => {
        console.error('登录失败：', err)
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },

  // 功能菜单点击事件
  goToUserInfo() {
    if (!this.checkLogin()) return
    wx.navigateTo({
      url: '/pages/completeInfo/completeInfo'
    })
  },

  // 我的报名
  goToMySignup() {
    if (!this.checkLogin()) return
    wx.switchTab({
      url: '/pages/mySignup/mySignup'
    })
  },

  // 我的收藏
  goToMyCollect() {
    if (!this.checkLogin()) return
    wx.navigateTo({
      url: '/pages/myCollect/myCollect'
    })
  },

  // 历史记录
  goToHistory() {
    if (!this.checkLogin()) return
    wx.navigateTo({
      url: '/pages/history/history'
    })
  },

  // 意见反馈
  goToFeedback() {
    if (!this.checkLogin()) return
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    })
  },

  // 关于我们
  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  // 检查登录状态
  checkLogin() {
    if (!this.data.userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 退出登录
  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          auth.clearUserInfo()
          app.globalData.userInfo = null
          this.setData({ userInfo: null })
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  }
})