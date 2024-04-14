const Router = require('express')
const adminController = require('../controllers/adminController')
const router = new Router()


router.get('/users', adminController.getUsers)
router.get('/products', adminController.getProducts)
router.put('/update-role', adminController.updateRole)

module.exports = router