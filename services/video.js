const {
  generateRegParams
} = require('../lib/utils')
const Video = require('../models/index').getModel('c_video')

const video = {
  // 获取视频总数
  async getVdoCount(params) {
    return await Video.find(generateRegParams(params)).count()
  },
  // 获取视频列表
  async getVdoList(params) {
    // console.log('参数params参数:::', params);
    // console.log('参数===', generateRegParams(params))
    const {
      pageNo,
      length
    } = params
    return await Video.find(generateRegParams(params)).skip(length * (pageNo - 1)).limit(Number(length))
  }
}

module.exports = video