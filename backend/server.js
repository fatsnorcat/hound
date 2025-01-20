const express = require('express')
const cors = require('cors') // access server from different domains
require('dotenv/config')
const { mongoose } = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')

// Database connection
mongoose.connect(process.env.DB_URI)
.then(() => console.log('MongoDB: Connection successful'))
.catch((err) => console.log('MongoDB: Not connected', err))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

const port = process.env.PORT
const server = app.listen(port, () => {
    console.log('Server is running on port ${port}')
})
