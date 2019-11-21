const mongose = require('mongoose')
const config = require('../config')
const url = `mongodb://${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.database}`

const connectDB = () => {
  mongose.connect(url); //创建一个数据库连接
  mongose.connection.on('connected', () => {
    console.log(`${url} Connecting database successfully`);
  })
  mongose.connection.on('error', () => {
    console.log(`${url} Failed to connect to database`);
  })
  mongose.connect.on('disconnected', () => {
    console.log(`${url} Closed to connect to database`);
  })
}
module.exports = connectDB;