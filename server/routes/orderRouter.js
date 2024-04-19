const Router = require('express')
const orderController = require('../controllers/orderController')
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()


router.post('/create', orderController.createOrder)
router.get('/getAll', orderController.getAllOrders)


module.exports = router