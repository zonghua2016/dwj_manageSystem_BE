const musiccollectServices = require('../services').musiccollect

let musiccollect = {
  async getMusicCollectList(ctx, next) {
    const mcCount = await musiccollectServices.getMusicCollectCount(ctx.request.query)
    const total = mcCount.length > 0 ? mcCount[0].total : 0
    const musicCollect = await musiccollectServices.getMusicCollectList(ctx.request.query)
    ctx.result = {
      musicCollect,
      total
    }
    return next()
  }
}

module.exports = musiccollect