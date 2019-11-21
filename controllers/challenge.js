const challengeServices = require('../services').challenge

let challenge = {
  getChallengeList: async (ctx, next) => {
    const total = await challengeServices.getChallengeCount()
    const challenges = await challengeServices.getChallengeList(ctx.query)
    ctx.result = {
      total,
      challenges
    }
    return next()
  }
}
module.exports = challenge