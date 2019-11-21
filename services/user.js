const User = require('../models/index').getModel('user')

const user = {
  async login(userData) {
    return await User.findOne(userData)
  },
  async regist(userData) {
    // return await User.insert(userData)
    return await new User(userData).save()
  },
  async getAllUsers() {
    return await User.find({})
  },
  async getUsersByName(username) {
    return await User.find({
      username
    })
  },
  async getUserInfo(token) {
    return await User.findOne({
      _id: token
    })
  }
}

module.exports = user