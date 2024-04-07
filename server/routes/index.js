const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const filtersRouter = require('./filtersRouter');
const cartOrderRouter = require('./cartOrderRouter');

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/filters', filtersRouter)
router.use('/cartOrder', cartOrderRouter)

module.exports = router