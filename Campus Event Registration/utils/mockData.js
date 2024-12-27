const activities = [
  {
    id: 1,
    name: '创新创业大赛',
    time: '2024/12/27 16:00',
    location: '创新创业中心',
    coverImage: '/images/cye.jpg',
    status: '报名中',
    signupCount: 120,
    maxCount: 150,
    categoryName: '比赛',
    organizer: '创新创业中心',
    contact: '15935745685',
    type: 'academic',
    description: '激发创新思维，培养创业能力。欢迎各院系学生组队参加，优胜者将获得创业基金支持。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: true
  },
  {
    id: 2,
    name: '人工智能前沿讲座',
    time: '2025/01/10 14:00',
    location: '图书馆报告厅',
    coverImage: '/images/rgzn.png',
    status: '报名中',
    signupCount: 150,
    categoryName: '讲座',
    organizer: '计算机学院',
    contact: '16425648453',
    maxCount: 200,
    type: 'academic',
    description: '邀请行业专家分享人工智能最新发展趋势，探讨AI技术在各领域的应用前景。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: true
  },
  {
    id: 3,
    name: '校园十大歌手大赛',
    time: '2025/01/20 19:00',
    location: '大学生活动中心',
    coverImage: '/images/sdgs.png',
    status: '报名中',
    signupCount: 80,
    maxCount: 100,
    categoryName: '比赛',
    organizer: '玉林师范',
    contact: '0775-2666516',
    type: 'culture',
    description: '一年一度的校园歌手盛典，展示你的音乐才华，让青春唱响校园。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。'
    ],
    hot: true
  },
  {
    id: 4,
    name: '新年篮球联赛',
    time: '2025/01/05 14:00',
    location: '体育馆',
    coverImage: '/images/lq.jpg',
    status: '报名中',
    signupCount: 95,
    maxCount: 100,
    categoryName: '比赛',
    organizer: '体育学院',
    contact: '15624839755',
    type: 'sports',
    description: '迎新年校园篮球联赛，以球会友，展现青春活力。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: true
  },
  {
    id: 5,
    name: '寒假环保志愿行动',
    time: '2025/01/25 09:00',
    location: '校园广场',
    coverImage: '/images/hbzy.jpg',
    status: '报名中',
    signupCount: 45,
    maxCount: 50,
    categoryName: '志愿服务',
    organizer: '团委',
    contact: '18975335716',
    type: 'volunteer',
    description: '寒假环保公益活动，让我们一起为美丽校园贡献力量。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: false
  },
  {
    id: 6,
    name: '冬日摄影展',
    time: '2025/01/12 10:00',
    location: '艺术中心',
    coverImage: '/images/syz.jpg',
    status: '报名中',
    signupCount: 30,
    maxCount: 50,
    categoryName: '社团',
    organizer: '摄影社',
    contact: '14556788912',
    type: 'club',
    description: '记录冬日校园的美好瞬间，展示摄影社团成员的优秀作品。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: false
  },
  {
    id: 7,
    name: '元旦晚会',
    time: '2025/01/01 19:00',
    location: '大礼堂',
    coverImage: '/images/ydwh.jpg',
    status: '报名中',
    signupCount: 200,
    maxCount: 300,
    categoryName: '文化活动',
    organizer: '玉林师范',
    contact: '0775-2666516',
    type: 'culture',
    description: '精彩纷呈的元旦晚会，欢迎全校师生参与。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: true
  },
  {
    id: 8,
    name: '戏剧社新年公演',
    time: '2025/01/08 19:00',
    location: '大礼堂',
    coverImage: '/images/jusxngy.jpg',
    status: '报名中',
    signupCount: 60,
    maxCount: 100,
    categoryName: '文化活动',
    organizer: '戏剧社',
    contact: '13878945612',
    type: 'culture',
    description: '戏剧社新年大戏《青春万岁》，精彩不容错过。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: false
  },
  {
    id: 9,
    name: '寒假考研经验分享会',
    time: '2025/01/18 14:00',
    location: '教学楼报告厅',
    coverImage: '/images/kyfxh.jpg',
    status: '报名中',
    signupCount: 180,
    maxCount: 200,
    categoryName: '讲座',
    organizer: '玉林师范',
    contact: '0775-2666516',
    type: 'academic',
    description: '邀请考研成功学长学姐分享备考经验，助力考研梦想。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: true
  },
  {
    id: 10,
    name: '新年棋牌竞技赛',
    time: '2025/01/03 13:00',
    location: '学生活动中心',
    coverImage: '/images/xqbs.png',
    status: '报名中',
    signupCount: 40,
    maxCount: 60,
    categoryName: '比赛',
    organizer: '玉林师范',
    contact: '0775-2666516',
    type: 'club',
    description: '象棋、围棋、桥牌等多个项目的竞技比赛，欢迎参与。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: false
  },
  {
    id: 11,
    name: '冬季长跑挑战赛',
    time: '2025/01/06 08:00',
    location: '校园跑道',
    coverImage: '/images/djcp.jpg',
    status: '报名中',
    signupCount: 150,
    maxCount: 200,
    categoryName: '比赛',
    organizer: '玉林师范',
    contact: '0775-2666516',
    type: 'sports',
    description: '5公里冬季长跑挑战，锻炼身体，享受跑步乐趣。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: false
  },
  {
    id: 12,
    name: '寒假支教志愿者招募',
    time: '2025/01/28 14:00',
    location: '会议中心',
    coverImage: '/images/zyzm.jpeg',
    status: '报名中',
    signupCount: 25,
    maxCount: 30,
    categoryName: '志愿服务',
    organizer: '团委',
    contact: '18975335716',
    type: 'volunteer',
    description: '面向周边农村小学的寒假支教活动，传递知识和温暖。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: true
  },
  {
    id: 13,
    name: '迎新晚会',
    time: '2024/09/10 19:00',
    location: '大礼堂',
    coverImage: '/images/yxwh.jpg',
    status: '已结束',
    signupCount: 280,
    maxCount: 300,
    categoryName: '文化活动',
    organizer: '玉林师范',
    contact: '0775-2666516',
    type: 'culture',
    description: '欢迎2024级新同学，精彩纷呈的迎新晚会。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: false
  },
  {
    id: 14,
    name: '秋季运动会',
    time: '2024/09/15 08:00',
    location: '体育场',
    coverImage: '/images/qjydh.jpg',
    status: '已结束',
    signupCount: 500,
    maxCount: 500,
    categoryName: '比赛',
    organizer: '玉林师范',
    contact: '0775-2666516',
    type: 'sports',
    description: '2024年秋季校运会，展现体育风采。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: false
  },
  {
    id: 15,
    name: '社团招新节',
    time: '2024/09/20 14:00',
    location: '校园广场',
    coverImage: '/images/stzxxx.jpg',
    status: '已结束',
    signupCount: 200,
    maxCount: 200,
    categoryName: '社团',
    organizer: '团委',
    contact: '0775-2666516',
    type: 'club',
    description: '百团大战，找到你的兴趣社团。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: false
  },
  {
    id: 16,
    name: '开学典礼',
    time: '2024/09/01 09:00',
    location: '大礼堂',
    coverImage: '/images/kxdy.png',
    status: '已结束',
    signupCount: 1000,
    maxCount: 1000,
    categoryName: '文化活动',
    organizer: '玉林师范',
    contact: '0775-2666516',
    type: 'academic',
    description: '2024-2025学年开学典礼。',
    notices: [
      '活动期间，请大家遵守校园秩序，不打扰他人。',
      '请准时到达，不迟到、不早退。',
      '报名时请准确填写个人信息，确保联系方式畅通，以便活动通知和联系。',
    ],
    hot: false
  }
]

// 获取所有活动
const getAllActivities = () => {
  return [...activities].sort((a, b) => new Date(b.time) - new Date(a.time))
}

// 获取热门活动
const getHotActivities = () => {
  const now = new Date()
  return activities.filter(item => 
    item.hot && 
    new Date(item.time) > now
  )
}

// 获取最近活动（按时间排序）
const getRecentActivities = () => {
  const now = new Date()
  return [...activities]
    .filter(item => new Date(item.time) > now)
    .sort((a, b) => new Date(a.time) - new Date(b.time))
}

// 根据类型获取活动
const getActivitiesByType = (type) => {
  const list = type === 'all' ? activities : activities.filter(item => item.type === type)
  return [...list].sort((a, b) => new Date(b.time) - new Date(a.time))
}

// 获取轮播图数据
const getBannerList = () => {
  const now = new Date()
  return activities
    .filter(item => new Date(item.time) > now)
    .slice(0, 3)
    .map(item => ({
      id: item.id,
      imageUrl: item.coverImage,
      activityId: item.id,
      title: item.name
    }))
}

// 根据ID获取活动详情
const getActivityById = (id) => {
  return activities.find(item => item.id === Number(id))
}

// 活动分类数据
const categories = [
  { 
    id: 1, 
    name: '文化活动', 
    icon: '/images/sy1.png', 
    type: 'culture',
    description: '丰富多彩的校园文化活动'
  },
  { 
    id: 2, 
    name: '体育赛事', 
    icon: '/images/sy1.png', 
    type: 'sports',
    description: '激情四射的体育竞技'
  },
  { 
    id: 3, 
    name: '学术讲座', 
    icon: '/images/sy1.png', 
    type: 'academic',
    description: '充实的学术交流活动'
  },
  { 
    id: 4, 
    name: '志愿服务', 
    icon: '/images/sy1.png', 
    type: 'volunteer',
    description: '奉献爱心的志愿活动'
  },
  { 
    id: 5, 
    name: '社团活动', 
    icon: '/images/sy1.png', 
    type: 'club',
    description: '丰富多彩的社团活动'
  }
]

// 获取所有分类
const getCategories = () => {
  return categories
}

// 根据类型获取分类信息
const getCategoryByType = (type) => {
  return categories.find(item => item.type === type)
}

module.exports = {
  getAllActivities,
  getHotActivities,
  getRecentActivities,
  getActivitiesByType,
  getBannerList,
  getActivityById,
  getCategories,
  getCategoryByType
}