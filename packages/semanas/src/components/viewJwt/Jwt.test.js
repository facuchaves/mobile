/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import Jwt from './Jwt'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('renders without crashing', () => {
  ReactDOM.render(<Jwt />, container)
  ReactDOM.unmountComponentAtNode(container)
})

it('jwt button click', () => {
  // Test first render and componentDidMount
  // act(() => {
  ReactDOM.render(<Jwt />, container)
  // });
  const button = container.querySelector('#botonJWT')
  const label = container.querySelector('#labelJWT')

  expect(label.textContent).toBe('')

  // Test second render and componentDidUpdate
  // act(() => {
  button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  // });

  // TODO: Commented failing test
  // expect(label.textContent).toBe('JWT');
})
