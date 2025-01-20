const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, loginUser, getProfile } = require('../controllers/authController')


router.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
)
router.get('/', test)
router.post('/login', loginUser)
router.get('/profile', getProfile)

module.exports = router
