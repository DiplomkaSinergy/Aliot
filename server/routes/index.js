const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const filtersRouter = require('./filtersRouter');
const cartOrderRouter = require('./cartOrderRouter');
const paymentRouter = require('./paymentRouter');
const adminRouter = require('./adminRouter');
const orderRouter = require('./orderRouter');

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/filters', filtersRouter)
router.use('/cartOrder', cartOrderRouter)
router.use('/payment', paymentRouter)
router.use('/admin', adminRouter)
router.use('/order', orderRouter)

module.exports = router