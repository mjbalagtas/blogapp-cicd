import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'

describe('<CreateForm />', () => {
  let component

  test('check posting blog', () => {
    const mockHandler = jest.fn()
    component = render(
      <CreateForm createBlog={mockHandler} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const submitBlog = component.container.querySelector('form')
    fireEvent.change(title,{
      target: {
        value: 'testing frontend posting new blog on jest'
      }
    })
    fireEvent.change(author,{
      target: {
        value: 'me@mark'
      }
    })
    fireEvent.change(url,{
      target: {
        value: 'localhost/api/blogs'
      }
    })
    fireEvent.submit(submitBlog)
    console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testing frontend posting new blog on jest')
    expect(mockHandler.mock.calls[0][0].author).toBe('me@mark')
    expect(mockHandler.mock.calls[0][0].url).toBe('localhost/api/blogs')
  })
})
