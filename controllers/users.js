const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (request,response) => {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const validPass = body.password.length >= 3

    if(!validPass){
        return response.status(400).json({
            error: 'password too short. Atleast 3 length for valid password'
        }).end()
    }

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',{ url: 1, title: 1, author: 1 })
    console.log('users:' , users)
    response.json(users)
})

module.exports = usersRouter