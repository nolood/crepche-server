const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/CategoryController');

router.post('/', categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getOneCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router