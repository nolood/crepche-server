const Router = require('express')
const router = new Router()
const itemController = require('../controllers/ItemController')

router.post('/', itemController.addItem)
router.get('/', itemController.getAllItems)
router.get('/:id', itemController.getOneItem)
router.delete('/:id', itemController.deleteItem)

module.exports = router