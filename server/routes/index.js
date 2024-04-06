const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const productRouter = require('./productRouter');
const filtersRouter = require('./filtersRouter');

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/filters', filtersRouter)

module.exports = router