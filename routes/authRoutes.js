const express = require('express')
const router = express.Router()
const {authenticateUser,authorizePermissions} = require('../middleware/authentication')

const { register, registerContributor, login, logout } = require('../controllers/authController')

router.post('/register', register)

router.route('/registerContributor').post(authenticateUser, authorizePermissions('admin'), registerContributor)

router.post('/login', login)
router.get('/logout', logout)

module.exports = router;