const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', deviceController.create)
router.get('/:type', deviceController.getAll)
router.get('/', deviceController.getOne)


module.exports = router