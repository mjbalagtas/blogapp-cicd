import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateUser = ({ createUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleCreateUser = (event) => {
    event.preventDefault()
    createUser({
      username,
      password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleCreateUser}>
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
          <label>Name: </label>
          <input
            id = "name"
            type = "text"
            value = {name}
            name = "name"
            onChange = {({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            id = "password"
            type = "password"
            value = {password}
            name = "Password"
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button id = "create-user-button" type= "submit">Create</button>
      </form>
    </div>
  )
}

CreateUser.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default CreateUser