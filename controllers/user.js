'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcrypt')
const userServices = require('../services').user
const {
  CodedError,
  InvalidQueryError
} = require('../lib/error')
let user = {}
user.login = async (ctx, next) => {
  let {
    username,
    password
  } = ctx.request.body
  if (!username || !password) {
    throw new InvalidQueryError()
  }
  const user = await userServices.login({
    username
  })
  if (!user) {
    ctx.result = ''
    ctx.msg = '用户不存在'
  } else {
    if (bcrypt.compareSync(password, user.password)) {
      ctx.result = {
        token: jwt.sign({
          data: user._id,
          // 设置 token 过期时间
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
        }, config.secret)
      }
    } else {
      ctx.result = {
        msg: '密码错误，请重试！'
      }
    }
  }
  return next()
}
user.regist = async (ctx, next) => {
  let {
    username,
    password
  } = ctx.request.body
  if (!username || !password) {
    throw new InvalidQueryError()
  }
  const users = await userServices.getUsersByName(username)
  password = bcrypt.hashSync(password, 10)
  if (users.length === 0) {
    let user = await userServices.regist({
      username,
      password,
      roles: ["admin",
        "editor"
      ],
      avatar: 'https://img.topgamers.cn/15624040000106280.png'
    })
    ctx.result = {
      _id: user._id,
      username: user.username,
      roles: user.roles,
      avatar: user.avatar
    }
    return next()
  } else {
    throw new CodedError('用户已存在')
  }
}
user.users = async (ctx, next) => {
  const users = await userServices.getAllUsers();
  ctx.result = {
    users
  }
  return next()
}
user.getUsersByName = async (ctx, next) => {
  const users = await userServices.getUsersByName(ctx.params.name)
  ctx.result = {
    users
  }
  return next()
}
user.getUserInfo = async (ctx, next) => {
  const user = await userServices.getUserInfo(ctx.jwtData.data)
  ctx.result = {
    user
  }
  return next()
}

module.exports = user