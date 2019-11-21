module.exports = {
  name: 'c_video',
  schema: {
    '_id': Number,
    'title': String,
    'cover': String,
    "categoryId": Number,
    "comments": Number,
    "praises": Number,
    "shares": Number,
    "plays": Number,
    "additionalPraises": Number,
    "additionalVV": Number,
    "nums": Number,
    "weight": Number,
    "status": String,
    "isDel": String,
    "mDel": String,
    "isOfficial": String,
    "visible": String,
    "isExample": String,
    "music": {
      "_id": Number,
      "name": String
    },
    "member": {
      "_id": Number,
      "nickName": String,
      "avatar": String,
      "userId": String
    },
    "createDate": Number,
    "modifyDate": Number,
    "index_img": String,
    "width": String,
    "height": String,
    "size": String,
    "isRecommend": String,
    "video_bk": String,
    "name": String,
    "challengeId": Number,
    "validPlays": Number,
    "invalidPlays": Number,
    "videoView": Number,
    "sensitiveWordsCount": Number,
    "sensitiveWordsDetail": String,
    "remarks": String,
    "domains": Array,
    "genres": String,
    "tags": Array,
    "challenges": Array,
    "transStatus": String,
    "waterMarkVideo": String,
    "visualangle": String,
    "playmethod_id": Number,
    "censorId": String,
    "wplays": Number,
    "wvalidPlays": Number,
    "winvalidPlays": Number,
    "wadditionalVV": Number,
    "videox": String,
    "video2": String,
    "waterMarkVideo2": String
  }
}