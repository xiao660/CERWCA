Page({
  data: {
    typeList: [
      { name: '功能异常', type: 'bug' },
      { name: '体验问题', type: 'experience' },
      { name: '功能建议', type: 'suggestion' },
      { name: '其他', type: 'other' }
    ],
    currentType: '',
    content: '',
    images: [],
    contact: '',
    canSubmit: false
  },

  // 选择反馈类型
  selectType: function(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentType: type
    })
    this.checkCanSubmit()
  },

  // 输入反馈内容
  onContentInput: function(e) {
    this.setData({
      content: e.detail.value
    })
    this.checkCanSubmit()
  },

  // 输入联系方式
  onContactInput: function(e) {
    this.setData({
      contact: e.detail.value
    })
  },

  // 选择图片
  chooseImage: function() {
    wx.chooseImage({
      count: 3 - this.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          images: [...this.data.images, ...res.tempFilePaths]
        })
      }
    })
  },

  // 删除图片
  deleteImage: function(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images
    images.splice(index, 1)
    this.setData({
      images: images
    })
  },

  // 检查是否可以提交
  checkCanSubmit: function() {
    const canSubmit = this.data.currentType && this.data.content.length > 0
    this.setData({
      canSubmit: canSubmit
    })
  },

  // 提交反馈
  submitFeedback: function() {
    if (!this.data.canSubmit) return

    wx.showLoading({
      title: '提交中...'
    })

    // TODO: 调用提交接口
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      })
    }, 1500)
  }
}) 