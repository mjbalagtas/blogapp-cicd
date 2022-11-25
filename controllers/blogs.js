const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const body = request.body
    console.log('user',request.user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: request.user._id,
        comments: []
    })


    if(blog.title === undefined && blog.url === undefined){
        return response.status(400).end()
    }

    const savedBlog = await blog.save()
    console.log('savedBlog', savedBlog)
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request,response) => {

    const blogToDelete = request.user.blogs.find(blog => {return blog.toString() === request.params.id} )
    console.log('blog to delete', blogToDelete)
    if(blogToDelete){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
        console.log('deleted')
    }else{
        return response.status(401).json({ error: 'Only the logged in user can delete the blog' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new:true })
    response.json(updatedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request,response) => {
    const body = request.body
    const blog = await Blog.findById(request.params.id)
    blog.comments = blog.comments.concat(body.comment)
    const savedComment = await blog.save()
    response.status(200).json(savedComment)
})

module.exports = blogsRouter