const Router = require('express')
const paymentController = require('../controllers/paymentController')

const router = new Router()

router.post('/create', paymentController.createPayment)
router.post('/UkassaWebHook', paymentController.ukassaWebHook)

module.exports = router