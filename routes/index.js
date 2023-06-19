const Router = require('express')
const router = new Router()

const itemRouter = require('./itemRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const subCategoryRouter = require('./subCategoryRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/subcategory', subCategoryRouter)
router.use('/item', itemRouter)

module.exports = router