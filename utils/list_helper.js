const _ = require('lodash')

const dummy = (blogs) => {
    return blogs.length
}

const totalLikes = (blogs) => {
    if(blogs.length === 0) return 0
    else if(blogs.length === 1) return blogs[0].likes
    else{
        return blogs.reduce((a,b) => {
            return a + b.likes
        },0)
    }
}

const favoriteBlog = (blogs) => {
    const allLikes = blogs.map(({ likes }) => {
        return likes
    })
    const highestLike = Math.max(...allLikes)
    return blogs.find(({ likes }) => {return likes === highestLike})
}

const mostBlogs = (blogs) => {
    const allAuthors = blogs.map(({ author }) => author)
    const toSet = _.countBy(allAuthors)
    const authors = Object.keys(toSet)
    const iteration = Object.values(toSet)
    const correctIndex = iteration.indexOf(Math.max(...iteration))
    return {
        author: authors[correctIndex],
        blogs: iteration[correctIndex]
    }
}

const mostLikes = (blogs) => {
    const authorsAndLikes = blogs.map(({ author, likes }) => {
        return { author,likes }
    })
    console.log('all', authorsAndLikes)
    const onlyAuthors = blogs.map(({ author }) => {
        return { author,likes:0 }
    })
    let uniqAuthor = _.uniqBy(onlyAuthors,'author')

    uniqAuthor = uniqAuthor.map(({ author,likes }) => {
        authorsAndLikes.forEach( data => {
            if(data.author === author){
                likes += data.likes
            }
        })
        return {
            author,
            likes
        }
    })
    const likesOnly = uniqAuthor.map(({ likes }) => {
        return likes
    })
    return uniqAuthor.find(author => {
        return author.likes === Math.max(...likesOnly)
    })
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}