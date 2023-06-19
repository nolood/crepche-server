const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/AuthMiddleware')
const roleMiddleware = require('../middleware/RoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/role', userController.addRole)

module.exports = router