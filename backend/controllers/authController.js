const User = require("../models/user")
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

// Test Endpoint
const test = (req, res) => {
    res.json('test is working');
  };

// Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body

        // Check if user exists
        const user = await User.findOne({ username })
        if(!user) {
            return res.status(404).json({ error: 'No user found' })
        }

        // Check if passwords match
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
            return res.status(404).json({ error: 'Bad password' })
        }

        // Generate JWT Token
        const token = jwt.sign(
            {username: user.username, id: user._id, name: user.name},
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        const oldTokens = (user.tokens || []).filter(t => {
            const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000
            return timeDiff < 86400
        })

        oldTokens.push({ token, signedAt: Date.now().toString() })

        await User.findByIdAndUpdate(user._id, { tokens: oldTokens })

        res.cookie('token', token, { httpOnly: true, secure: true }).json(user)
        
    } catch (error) {
        console.log('Login error', error)
        res.status(500).json({ error: 'Internal server error'})
    }
}

// Profile Endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies
    if(!token) {
        return res.status(401).json(null)
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
        if(err) {
            console.error('JWT verification error', err)
            return res.status(401).json(null)
        }
        res.json(decoded)
    })    
}

module.exports = {
    test,
    loginUser,
    getProfile
}