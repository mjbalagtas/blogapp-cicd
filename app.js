const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        logger.info('connected to DB')
    })
    .catch(error => {
        logger.error('error connecting to DB...', error.message)
    })

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if(process.env.NODE_ENV === 'test'){
    const resetRouter = require('./controllers/testing')

    app.use('/api/testing', resetRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app