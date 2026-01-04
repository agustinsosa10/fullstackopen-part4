const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('conectado a MongoDB')
    })
    .catch( (error) => {
        logger.error('error al conectar a MongoDB', error.message)
    })

app.use(express.static('dist'))
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app