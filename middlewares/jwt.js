'use strict'

// const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')
// const jwtMiddleware = koaJwt({
//   secret: config.secret
// })

module.exports = function (ctx, next) {
  // 将 token 中的数据解密后存到 ctx 中
  try {
    const token = ctx.request.body.authorization || ctx.request.query.authorization || ctx.request.headers.authorization;
    if (typeof token === 'string') {
      ctx.jwtData = jwt.verify(token, config.secret);
      return next();
    } else {
      throw {
        code: 401,
        message: 'no authorization' 
      }
    }
  } catch (err) {
    throw {
      code: 401,
      message: err.message
    }
  }
  next()
}