/**
 * 配置mongo查询参数
 * @param {搜索参数} params 
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
    if (parm === 'challengeID' && params[parm] !== '') {
      regParams['challenges.title'] = {
        $regex: params[parm],
        $options: '$i'
      }
      return
    }
    if (parm === 'title' || parm === 'tags') {
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
// 转账时间戳
function toDateTime(date) {
  return new Date(date).getTime()
}
module.exports = {
  generateRegParams,
  toDateTime
}