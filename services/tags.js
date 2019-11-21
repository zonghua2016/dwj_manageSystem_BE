const Tags = require('../models/index').getModel('c_tags')

const tags = {
  async getTagsList(params) {
    const {
      name
    } = params
    return await Tags.find({
      name: {
        $regex: name,
        $options: '$i'
      }
    })
  }
}

module.exports = tags