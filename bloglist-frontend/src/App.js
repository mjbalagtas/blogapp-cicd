import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import CreateUser from './components/CreateUser'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [success, setSuccess] = useState(null)

  const createBlogRef = useRef()
  const createUserRef = useRef()
  const loginRef = useRef()

  const handleLogin = async (userObject) => {
    try{
      loginRef.current.toggleVisibility()
      const user = await loginService.login({
        username: userObject.username,
        password: userObject.password })
      window.localStorage.setItem(
        'loggedInData', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    }catch(exception){
      setMessage('wrong username or password')
      setSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleCreateUser = async (userObject) => {
    try{
      createUserRef.current.toggleVisibility()
      await userService.createUser({
        username: userObject.username,
        password: userObject.password,
        name: userObject.name })
      // window.localStorage.setItem(
      //   'loggedInData', JSON.stringify(user)
      // )

      // blogService.setToken(user.token)
      // setUser(user)
      setMessage('A new user created. Please login')
      setSuccess(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }catch(exception){
      setMessage('invalid username or password')
      setSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInData')
    setUser(null)
  }

  const handleCreate = async (newObject) => {
    try{
      createBlogRef.current.toggleVisibility()
      const addedBlog = await blogService.create({
        title: newObject.title,
        author: newObject.author,
        url: newObject.url
      })
      setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author}`)
      setSuccess(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setToggle(!toggle)
    }catch(exception){
      setMessage('kulang input')
      setSuccess(false)
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
  }

  const handlePut = async (newObject) => {
    console.log('tttt',newObject)
    try{
      await blogService
        .update(newObject)

      setToggle(!toggle)
    }catch(error){
      console.log(error)
    }
  }

  const handleDelete = async (newObject) => {
    try{
      await blogService
        .remove(newObject)
      setToggle(!toggle)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(response => {
        setBlogs(response.sort((a,b) => {
          return b.likes - a.likes
        }))
      })
  },[toggle])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInData')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel="login" ref ={loginRef}>
      <LoginForm userLoggingIn={handleLogin} />
    </Togglable>
  )

  const createUser = () => (
    <Togglable buttonLabel="create new user" ref ={createUserRef}>
      <CreateUser createUser={handleCreateUser} />
    </Togglable>
  )

  const createForm = () => (
    <Togglable buttonLabel="create new blog" ref ={createBlogRef}>
      <CreateForm createBlog={handleCreate} />
    </Togglable>
  )

  const displayBlogs = () => (
    <div id = "all-blogs">
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          name={blog.user.name}
          updateLike={handlePut}
          deleteBlog={handleDelete}
        />
      )}
    </div>
  )

  return(
    <>
      {user === null
        ? <div>
          <h2>Blogs</h2>
          <Notification message={message} success={success} />
          {loginForm()}
          {createUser()}
        </div>
        : <div>
          <h2>Blogs</h2>
          <Notification message={message} success={success} />
          <Logout username={user.name} handleLogout={handleLogout} />
          {createForm()}
          {displayBlogs()}
        </div>
      }
    </>
  )
}

export default App