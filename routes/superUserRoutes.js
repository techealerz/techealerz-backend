const { createUser, login, logout, checkOTP } = require('../controllers/superUserController')
const authenticateUser = require('../middleware/authMiddleware')

const router = require('express').Router()

router.post('/api/v1/createSuperUser', createUser)
    .post('/api/v1/loginSuperUser', login)
    .post('/api/v1/otplogin', checkOTP)
    .post('/api/v1/logout', authenticateUser, logout)

module.exports = router