import React, { useState } from 'react'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const [hide, setHide] = useState(true)

  const hideWhenVisible = { display: hide ? 'none' : '' }

  let label = hide ? 'view': 'hide'

  const handleView = () => {
    setHide(!hide)
  }

  const handleLike = (event) => {
    event.preventDefault()
    blog.likes += 1
    updateLike({ ...blog })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(confirm){
      deleteBlog({ ...blog })
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style = {blogStyle} className= "blogDiv">
      <div>
        {blog.title} {blog.author}
        <button onClick={handleView}>
          {label}
        </button>
      </div>
      {!hide
        ?
        <div style={hideWhenVisible}>
          <div>
            {blog.url}
          </div>
          <div className= "likeDiv">
            {blog.likes}
            <button id = "like-button" onClick ={handleLike}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          <div>
            <button id = "delete-button" onClick={handleRemove}>remove</button>
          </div>
        </div>
        :<></>
      }
    </div>
  )
}


export default Blog