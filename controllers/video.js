const vdoServices = require('../services').video

let video = {
  getVdoList: async (ctx, next) => {
    const total = await vdoServices.getVdoCount(ctx.request.query)
    const videos = await vdoServices.getVdoList(ctx.request.query)
    ctx.result = {
      videos,
      total
    }
    return next()
  }
}
module.exports = video