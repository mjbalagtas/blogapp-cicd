import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ userLoggingIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    userLoggingIn({
      username,
      password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            id = "username"
            type = "text"
            value = {username}
            name = "Username"
            onChange = {({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            id = "password"
            type = "text"
            value = {password}
            name = "Password"
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button id = "login-button" type= "submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm