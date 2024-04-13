const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const filtersRouter = require('./filtersRouter');
const cartOrderRouter = require('./cartOrderRouter');
const paymentRouter = require('./paymentRouter');

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/filters', filtersRouter)
router.use('/cartOrder', cartOrderRouter)
router.use('/payment', paymentRouter)

module.exports = router