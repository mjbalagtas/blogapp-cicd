import React from 'react'

const Notification = ( { message, success } ) => {
  const notificationStyle = {
    color: success ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if(message === null) return null
  return(
    <div style = {notificationStyle} className = "error" >
      {message}
    </div>
  )
}

export default Notification