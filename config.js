'use strict'

const path = require('path')

module.exports = {
  port: '3001',
  secret: 'secret',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  mongoDB: {
    database: 'db_video',
    auth: 'admin',
    username: 'admin',
    password: 'admin',
    host: '47.105.144.108',
    port: 3717
  },
  // local
  // mongoDB: {
  //   database: 'blog',
  //   username: 'root',
  //   password: 'root',
  //   host: '127.0.0.1',
  //   port: 27017
  // },
  mysql: {
    database: 'blog',
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306
  }
}