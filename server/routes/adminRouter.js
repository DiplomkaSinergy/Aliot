const Router = require('express')
const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')
const router = new Router()


router.get('/users', adminController.getUsers)
router.get('/products', adminController.getProducts)
router.put('/update-role', adminController.updateRole)
router.post('/create-product', productController.createProduct)

module.exports = router