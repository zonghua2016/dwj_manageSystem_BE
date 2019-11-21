const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config');
const {
  logger
} = require('../middlewares/logger');

const url = `mongodb://${config.mongoDB.auth}:${config.mongoDB.password}@${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.database}`;
let mongo = mongoose.createConnection(url);

let db = {
  mongoose,
  mongo,
  models: {}
};
// 错误
mongo.on('error', err => {
  logger.error(new Error(err));
});
// 开启
mongo.once('open', () => {
  logger.info('mongo is opened');
})
// 整合models文件下其他js文件
fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(file => {
  let modelFile = require(path.join(__dirname, file));
  let schema = new mongoose.Schema(modelFile.schema);
  db.models[modelFile.name] = mongo.model(modelFile.name, schema, modelFile.name);
});

db.getModel = name => {
  return db.models[name]
}
module.exports = db;