const app = getApp()
const auth = require('../../utils/auth.js')

Page({
  data: {
    formData: {
      school: '',
      className: '',
      studentId: '',
      phone: ''
    },
    isFromSignup: false  // 标记是否从报名页面跳转来的
  },

  onLoad(options) {
    // 获取来源标记
    this.setData({
      isFromSignup: options.from === 'signup'
    })

    // 获取已有信息
    const userInfo = auth.getUserInfo()
    if (userInfo) {
      this.setData({
        formData: {
          school: userInfo.school || '',
          className: userInfo.className || '',
          studentId: userInfo.studentId || '',
          phone: userInfo.phone || ''
        }
      })
    }
  },

  // 监听页面返回
  onUnload() {
    // 如果是从报名页面来且没有保存信息，返回时提示
    if (this.data.isFromSignup && !auth.isProfileComplete()) {
      wx.showToast({
        title: '请完善信息后报名',
        icon: 'none'
      })
    }
  },

  // 输入处理函数
  onInputSchool(e) {
    this.setData({
      'formData.school': e.detail.value
    })
  },

  onInputClass(e) {
    this.setData({
      'formData.className': e.detail.value
    })
  },

  onInputStudentId(e) {
    this.setData({
      'formData.studentId': e.detail.value
    })
  },

  onInputPhone(e) {
    this.setData({
      'formData.phone': e.detail.value
    })
  },

  // 保存信息
  handleSave() {
    const { formData } = this.data
    // 验证所有必填字段
    if (!formData.school || !formData.className || !formData.studentId || !formData.phone) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    
    // 验证手机号
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    
    // 保存用户信息
    const userInfo = auth.getUserInfo()
    const updatedUserInfo = {
      ...userInfo,
      ...formData
    }
    auth.saveUserInfo(updatedUserInfo)
    // 标记个人信息已完善
    auth.saveProfileComplete(true)
    
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      success: () => {
        setTimeout(() => {
          // 如果是从报名页面来的，保存后返回继续报名
          if (this.data.isFromSignup) {
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.navigateBack()
          }
        }, 1500)
      }
    })
  }
}) 