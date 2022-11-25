const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = [  {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    }]

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
