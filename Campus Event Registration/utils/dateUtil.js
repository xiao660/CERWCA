const formatDate = (dateStr) => {
  // 将时间字符串转换为展示格式
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const parseDate = (dateStr) => {
  // 将日期字符串转换为标准格式
  return dateStr.replace(' ', 'T')
}

const isNewActivity = (dateStr) => {
  const activityDate = new Date(dateStr)
  const now = new Date()
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
  return activityDate > threeDaysAgo
}

module.exports = {
  formatDate,
  parseDate,
  isNewActivity
} 