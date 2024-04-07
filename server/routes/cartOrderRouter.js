const Router = require('express')
const cartOrderController = require('../controllers/cartOrderController')
const router = new Router()


router.get('/all', cartOrderController.getAllCartOrdersItems)


module.exports = router