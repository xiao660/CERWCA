// pages/activityList/activityList.js
const mockData = require('../../utils/mockData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    currentType: 'all',
    currentFilter: '',
    showOnlySignup: false,
    searchHistory: [],
    categories: [
      { name: '全部', type: 'all', icon: '/images/sy1.png' },
      { name: '文化活动', type: 'culture', text: '文化活动', icon: '/images/sy1.png' },
      { name: '体育赛事', type: 'sports', text: '体育赛事', icon: '/images/sy1.png' },
      { name: '学术讲座', type: 'academic', text: '学术讲座', icon: '/images/sy1.png' },
      { name: '志愿服务', type: 'volunteer', text: '志愿服务', icon: '/images/sy1.png' },
      { name: '社团活动', type: 'club', text: '社团活动', icon: '/images/sy1.png' }
    ],
    activityList: [],
    pageNum: 1,
    pageSize: 10,
    hasMore: true,
    isLoading: false,
    isRefreshing: false,
    collectedIds: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 如果从首页分类点击进来，设置当前分类
    if (options.type) {
      this.setData({
        currentType: options.type
      })
    }
    this.getActivities()
    // 获取搜索历史
    this.getSearchHistory()
    this.getCollectionStatus()
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      pageNum: 1,
      hasMore: true,
      isRefreshing: true
    })
    this.getActivityList(() => {
      wx.stopPullDownRefresh()
      this.setData({
        isRefreshing: false
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.data.hasMore || this.data.isLoading) return
    
    this.setData({
      isLoading: true,
      pageNum: this.data.pageNum + 1
    })
    
    this.getActivityList(() => {
      this.setData({
        isLoading: false
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 获取活动列表
  getActivities: function() {
    const mockData = require('../../utils/mockData.js')
    const activities = mockData.getAllActivities()
    this.setData({
      activityList: activities
    })
  },

  // 搜索输入
  onSearchInput: function(e) {
    this.setData({
      searchKey: e.detail.value
    })
    // 如果输入框被清空，恢复所有活动列表
    if (!e.detail.value) {
      this.getActivities()
    }
  },

  // 点击搜索图标或按下回车键
  onSearch: function() {
    // 获取去除前后空格的搜索关键词
    const searchKey = this.data.searchKey.trim()
    
    // 如果搜索关键词为空，显示提示
    if (!searchKey) {
      if (this.data.activityList.length === 0) {
        this.getActivities()
      }
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
      return
    }

    // 保存搜索历史
    let searchHistory = wx.getStorageSync('searchHistory') || []
    if (!searchHistory.includes(searchKey)) {
      searchHistory.unshift(searchKey)
      if (searchHistory.length > 10) {
        searchHistory = searchHistory.slice(0, 10)
      }
      wx.setStorageSync('searchHistory', searchHistory)
      this.setData({ 
        searchHistory,
        currentType: 'all',  // 重置分类
        currentFilter: '',    // 重置筛选
        showOnlySignup: false // 重置报名筛选
      })
    }

    // 执行搜索
    this.searchActivities(searchKey)
  },

  // 搜索活动
  searchActivities: function(keyword) {
    const activities = mockData.getAllActivities()
    // 转换为小写进行不区分大小写的搜索
    const lowerKeyword = keyword.toLowerCase()
    const searchResult = activities.filter(item => 
      item.name.toLowerCase().includes(lowerKeyword) ||
      item.location.toLowerCase().includes(lowerKeyword) ||
      (item.description && item.description.toLowerCase().includes(lowerKeyword))
    )

    this.setData({
      activityList: searchResult,
      isLoading: false,
      hasMore: false
    })

    // 显示搜索结果数量
    wx.showToast({
      title: `找到 ${searchResult.length} 个活动`,
      icon: 'none'
    })
  },

  // 切换分类标签
  switchTab: function(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentType: type
    })
    this.getActivityList()
  },

  // 切换筛选条件
  switchFilter: function(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentFilter: this.data.currentFilter === type ? '' : type
    })
    this.getActivityList()
  },

  // 切换只看可报名
  toggleSignupFilter: function() {
    this.setData({
      showOnlySignup: !this.data.showOnlySignup
    })
    this.getActivityList()
  },

  // 跳转到活动详情
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${id}`
    })
  },

  // 判断是否为新活动（7天内）
  isNewActivity: function(activityTime) {
    const now = new Date()
    const activityDate = new Date(activityTime)
    const diffDays = Math.floor((activityDate - now) / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 7
  },

  // 获取活动列表
  getActivityList: function(callback) {
    // 获取所有活动
    let list = mockData.getAllActivities()
    
    // 根据分类筛选
    if (this.data.currentType !== 'all') {
      list = mockData.getActivitiesByType(this.data.currentType)
    }

    // 根据关键词搜索
    if (this.data.searchKey) {
      const key = this.data.searchKey.toLowerCase()
      list = list.filter(item => {
        // 搜索权重计算
        let weight = 0
        // 活动名称匹配（最高权重）
        if (item.name.toLowerCase().includes(key)) weight += 3
        // 活动地点匹配
        if (item.location.toLowerCase().includes(key)) weight += 2
        // 活动类型匹配
        if (item.type.toLowerCase().includes(key)) weight += 2
        // 状态匹配
        if (item.status === '报名中' && key.includes('报名')) weight += 1
        if (item.signupCount >= item.maxCount && key.includes('满')) weight += 1
        
        // 保存权重用于排序
        item.searchWeight = weight
        return weight > 0
      })
      
      // 按搜索权重排序
      list.sort((a, b) => b.searchWeight - a.searchWeight)
    }

    // 根据筛选条件排序
    if (this.data.currentFilter === 'time') {
      list.sort((a, b) => {
        // 先按状态排序（报名中优先），再按时间排序
        if (a.status !== b.status) {
          return a.status === '报名中' ? -1 : 1
        }
        return new Date(a.time) - new Date(b.time)
      })
    } else if (this.data.currentFilter === 'hot') {
      list.sort((a, b) => {
        // 计算报名进度
        const aProgress = a.signupCount / a.maxCount
        const bProgress = b.signupCount / b.maxCount
        if (Math.abs(aProgress - bProgress) > 0.1) {
          return bProgress - aProgress
        }
        // 进度相近时，报名人数多的优先
        return b.signupCount - a.signupCount
      })
    } else {
      // 默认排序：新活动优先，然后是热门活动
      list.sort((a, b) => {
        const aIsNew = this.isNewActivity(a.time)
        const bIsNew = this.isNewActivity(b.time)
        if (aIsNew !== bIsNew) return bIsNew - aIsNew
        
        const aHot = a.signupCount / a.maxCount
        const bHot = b.signupCount / b.maxCount
        return bHot - aHot
      })
    }

    // 只看可报名
    if (this.data.showOnlySignup) {
      list = list.filter(item => 
        item.status === '报名中' && 
        item.signupCount < item.maxCount
      )
    }

    // 模拟分页
    const start = (this.data.pageNum - 1) * this.data.pageSize
    const end = start + this.data.pageSize
    const pageList = list.slice(start, end)
    
    // 更新列表数据
    this.setData({
      activityList: this.data.pageNum === 1 ? pageList : [...this.data.activityList, ...pageList],
      hasMore: end < list.length
    })

    callback && callback()
  },

  // 获取搜索历史
  getSearchHistory: function() {
    const history = wx.getStorageSync('searchHistory') || []
    this.setData({
      searchHistory: history
    })
  },

  // 清除搜索历史
  clearSearchHistory: function() {
    wx.showModal({
      title: '提示',
      content: '确定要清除搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('searchHistory')
          this.setData({
            searchHistory: []
          })
        }
      }
    })
  },

  // 点击历史记录
  onHistoryTap: function(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({
      searchKey: keyword,
      currentType: 'all',  // 重置分类
      currentFilter: '',    // 重置筛选
      showOnlySignup: false // 重置报名筛选
    })
    this.searchActivities(keyword)
  },

  // 重置搜索
  resetSearch: function() {
    this.setData({
      searchKey: '',
      currentType: 'all',
      currentFilter: '',
      showOnlySignup: false,
      pageNum: 1
    })
    this.getActivityList()
  },

  // 获取收藏状态
  getCollectionStatus: function() {
    const collections = wx.getStorageSync('collections') || []
    this.setData({
      collectedIds: collections
    })
  },

  // 处理收藏
  handleCollect: function(e) {
    const id = e.currentTarget.dataset.id
    const collections = wx.getStorageSync('collections') || []
    const index = collections.indexOf(id)
    
    if (index > -1) {
      collections.splice(index, 1)
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    } else {
      collections.push(id)
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      })
    }
    
    wx.setStorageSync('collections', collections)
    this.setData({
      collectedIds: collections
    })
  },

  // 处理分享
  handleShare: function(e) {
    const id = e.currentTarget.dataset.id
    const activity = this.data.activityList.find(item => item.id === id)
    
    wx.showActionSheet({
      itemList: ['分享给好友', '生成分享海报'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage']
          })
        } else {
          // TODO: 生成分享海报
        }
      }
    })
  }
})