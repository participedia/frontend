import React from 'react'  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {  // eslint-disable-line no-undef
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
