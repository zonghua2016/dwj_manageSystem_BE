'use strict'

const Router = require('koa-router')
const controllers = require('../../controllers')
const jwtMiddleware = require('../../middlewares/jwt')

const router = new Router()
router.prefix('/api')
router.use(jwtMiddleware)

router.get('/users', controllers.user.users)
router.get('/users/:name', controllers.user.getUsersByName)
router.get('/userInfo', controllers.user.getUserInfo)

router.get('/video/list', controllers.video.getVdoList)
router.get('/tags/list', controllers.tags.getTagsList)

router.get('/challenge/list', controllers.challenge.getChallengeList)

router.get('/musiccollect/list', controllers.musiccollect.getMusicCollectList)
module.exports = router