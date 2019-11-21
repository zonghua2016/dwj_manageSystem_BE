const tagServices = require('../services').tags

let tags = {
  getTagsList: async (ctx, next) => {
    const tags = await tagServices.getTagsList(ctx.query)
    ctx.result = {
      tags
    }
    return next()
  }
}
module.exports = tags