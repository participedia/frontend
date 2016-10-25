import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import App from './App'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

