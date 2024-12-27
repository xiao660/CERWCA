const AUTH_KEY = 'userInfo'
const PROFILE_COMPLETE_KEY = 'profileComplete'

const auth = {
  // 保存用户信息
  saveUserInfo(userInfo) {
    wx.setStorageSync(AUTH_KEY, userInfo)
  },

  // 获取用户信息
  getUserInfo() {
    return wx.getStorageSync(AUTH_KEY)
  },

  // 清除用户信息
  clearUserInfo() {
    wx.removeStorageSync(AUTH_KEY)
    wx.removeStorageSync(PROFILE_COMPLETE_KEY)
  },

  // 检查登录状态
  checkLogin() {
    const userInfo = this.getUserInfo()
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 保存个人信息完善状态
  saveProfileComplete(complete = true) {
    wx.setStorageSync(PROFILE_COMPLETE_KEY, complete)
  },

  // 检查个人信息是否已完善
  isProfileComplete() {
    return wx.getStorageSync(PROFILE_COMPLETE_KEY) || false
  },

  // 检查个人信息是否完整
  checkProfileComplete(userInfo) {
    if (!userInfo) return false
    return !!(userInfo.school && userInfo.className && userInfo.studentId && userInfo.phone)
  }
}

module.exports = auth 