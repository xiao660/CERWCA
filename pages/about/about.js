Page({
  data: {
    year: new Date().getFullYear(),
    features: [
      { text: '活动浏览', image: '/images/sy1.png' },
      { text: '在线报名', image: '/images/报名 (1).png'},
      { text: '记录查询', image:'/images/jilu.png' },
      { text: '活动提醒', image:'/images/tixing.png' },
    ],
  },

  onLoad: function() {
    // 页面加载时的初始化工作
  },

  // 复制联系方式
  copyContact: function(e) {
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
  },

  // 分享小程序
  onShareAppMessage: function() {
    return {
      title: '校园活动报名小程序',
      path: '/pages/index/index'
    }
  }
}) 