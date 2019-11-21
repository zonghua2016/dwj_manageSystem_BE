const modles = require('../models')
const MusicCollection = modles.getModel('c_musiccollect')
const {
  toDateTime
} = require('../lib/utils')
const musiccollect = {
  /**
   * 根据传入参数计算总数
   * @param {传入的参数} params 
   */
  async getMusicCollectCount(params) {
    let newParams = getParams(params)
    newParams.push({
      $group: {
        _id: null,
        total: {
          $sum: 1
        }
      }
    })
    return await MusicCollection.aggregate(newParams)
  },
  /**
   * 根据传入参数查询结果
   * @param {传入的参数} params 
   */
  async getMusicCollectList(params) {
    const {
      pageNo,
      length
    } = params

    let newParams = getParams(params)
    newParams.push({
      $skip: length * (pageNo - 1)
    }, {
      $limit: Number(length)
    })
    return await MusicCollection.aggregate(newParams)
  }
}

/**
 * 根据传入参数拼接查询字符串
 * @param {传入的参数} params 
 */
function getParams(params) {
  return [{
    $lookup: {
      from: 'c_music',
      localField: 'musicId',
      foreignField: '_id',
      as: 'music'
    }
  }, {
    $lookup: {
      from: 'c_member',
      localField: 'memberId',
      foreignField: '_id',
      as: 'member'
    }
  }, {
    $unwind: '$music'
  }, {
    $unwind: '$member'
  }, {
    $match: generateRegParams(params)
  }]
}
/**
 * 根据传入参数拼接查询字段
 * @param {传入参数} params 
 */
function generateRegParams(params) {
  let regParams = {
    createDate: {
      $gte: toDateTime('1970-01-01'),
      $lte: Date.now()
    }
  };
  Object.keys(params).forEach(parm => {
    if (params[parm] === '') {
      return false;
    }
    if (parm === 'beginDate' && params[parm] !== '') {
      regParams['createDate']['$gte'] = toDateTime(params[parm])
      return;
    }
    if (parm === 'endDate' && params[parm] !== '') {
      regParams['createDate']['$lte'] = toDateTime(params[parm])
      return;
    }
    if (parm === 'pageNo' || parm === 'length' || parm === 'authorization') {
      return false;
    }
    if (parm === 'nickName' && params[parm] !== '') {
      regParams['member.nickName'] = {
        $regex: params[parm],
        $options: '$i'
      }
      return
    }
    if (parm === 'author' && params[parm] !== '') {
      regParams['music.author'] = {
        $regex: params[parm],
        $options: '$i'
      }
      return
    }
    if (parm === 'musicName' && params[parm] !== '') {
      regParams['music.name'] = {
        $regex: params[parm],
        $options: '$i'
      }
      return
    }
    regParams[parm] = params[parm]
  })
  return regParams;
}

module.exports = musiccollect