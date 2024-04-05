const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');
const filtersRouter = require('./filtersRouter');

router.use('/user', userRouter)
router.use('/device', deviceRouter)
router.use('/filters', filtersRouter)

module.exports = router