const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
    return response.status(404).send({
        error: 'unknown endpoint'
    })
}

const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError'){
        return response.status(400).json(error.message)
    }else if(error.name === 'JsonWebTokenError'){
        return response.status(401).json(error.message)
    }

    logger.error(error.message)

    next(error)
}

const tokenExtractor = (request,response,next) => {
    console.log('here',request.token)
    const authorization = request.headers.authorization
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token = authorization.substring(7)
        next()
    }else{
        next()
    }
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    console.log('user ', user)
    if(user){
        request.user = user
        next()
    }else{
        next()
    }
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}