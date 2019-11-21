const {
  toDateTime
} = require('../lib/utils')
const Challenge = require('../models/index').getModel('c_challenge')

const challenge = {
  async getChallengeCount(params) {
    return await Challenge.find(params).count()
  },
  async getChallengeList(params) {
    // console.log('参数params参数:::', params);
    // console.log('参数===', generateRegParams(params))
    const {
      pageNo,
      length
    } = params
    return await Challenge.find(generateRegParams(params)).skip(length * (pageNo - 1)).limit(Number(length))
  }
}

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
    if (parm === 'pageNo' || parm === 'length') {
      return false;
    }
    if (parm === 'member' && params[parm] !== '') {
      regParams['member.nickName'] = {
        $regex: params[parm],
        $options: '$i'
      }
      return
    }
    if (parm === 'title') {
      regParams[parm] = {
        $regex: params[parm],
        $options: '$i'
      }
      return
    }
    regParams[parm] = params[parm]
  })
  return regParams;
}
module.exports = challenge