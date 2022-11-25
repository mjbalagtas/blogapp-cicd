import React from 'react'

const Logout = ({ username, handleLogout }) => (
  <div>
    <p>{username} logged in
      <button id = "logout-button" onClick= {handleLogout}>logout</button>
    </p>
  </div>
)

export default Logout