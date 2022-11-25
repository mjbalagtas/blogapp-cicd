import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'qwerty',
    author: 'slash',
    url: '/api/blogs',
    likes: 5,
    user: {
      name: 'mark balagtas',
      username: 'root',
    },
  }
  let component

  test('blog render tile and author only', () => {
    component = render(
      <Blog blog = {blog} />
    )
    const div = component.container.querySelector('.blogDiv')
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(div).not.toHaveTextContent(`${blog.likes}`)
    expect(div).not.toHaveTextContent(`${blog.url}`)
  })

  test('button show pressed', () => {

    component = render(
      <Blog blog = {blog} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.blogDiv')
    expect(div).toHaveTextContent(`${blog.likes}`)
    expect(div).toHaveTextContent(`${blog.url}`)
  })

  test('press like button twice', () => {

    const mockHandler = jest.fn()

    component = render(
      <Blog blog = {blog} updateLike={mockHandler} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    console.log('first',prettyDOM(likeButton))
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    console.log('mock', mockHandler.mock.calls)
    expect(mockHandler.mock.calls[1][0].likes).toBe(7)
  })
})
