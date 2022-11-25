const mongoose  = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
let token = null
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany()
    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
    const saltRounds = 10
    const testingPassword = 'root'
    const passwordHash = await bcrypt.hash(testingPassword, saltRounds)

    const user = new User({
        username: 'root',
        name: 'mark joseph',
        passwordHash
    })

    await user.save()

    const response = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'root'
        })
    token = response.body.token
},100000)

describe('get requests from api/blogs', () => {
    test('get all blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blog.id to be defined', async () => {
        const response = await api.get('/api/blogs')
        await response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
},100000)

describe('post requests for /api/blogs', () => {
    test('adding new blogs', async () => {

        const blog = {
            title: 'async/await',
            author: 'self-author',
            url: '@async.await.com',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsInEnd = await helper.blogsInDb()
        expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('adding new blogs with 0 likes', async () => {
        const blog = {
            title: 'on 4th',
            author: 'me',
            url: 'me@4'
        }

        const addedBlog = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(blog)
        console.log(addedBlog.body)
        expect(addedBlog.body.likes).toBe(0)
    })

    test('adding blog without title or url', async () => {
        const blog = {
            author: 'meme'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(blog)
            .expect(400)
    })

    test('adding blog without token', async () => {
        const blog = {
            title: 'async/await',
            author: 'self-author',
            url: '@async.await.com',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(401)
    })
},100000)

afterAll(() => {
    mongoose.connection.close()
})