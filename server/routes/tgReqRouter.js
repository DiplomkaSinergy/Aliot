const Router = require('express')
const tgReqController = require('../controllers/tgReqController')
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()


router.post('/custom-products', tgReqController.postReqCustomProduct)


module.exports = router