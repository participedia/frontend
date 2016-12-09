import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import queryString from 'query-string'
import App from './App'
import Auth0 from 'auth0-js'

let auth0 = new Auth0({
  domain:       process.env.REACT_APP_AUTH0_DOMAIN,
  clientID:     process.env.REACT_APP_AUTH0_CLIENT_ID
})
let parsed = queryString.parse(window.location.hash)
if (parsed.id_token) {
  localStorage.setItem('id_token', parsed.id_token)
}
let id_token = localStorage.getItem('id_token')
if (id_token) {
  auth0.getProfile(id_token, function (err, profile) {
    if (err) {
      console.log('error getting profile', err)
    } else {
      localStorage.setItem('profile', JSON.stringify(profile))
    }
  })
}

// make store configuration happen after we set the profile in localstorage
import configureStore from './configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

let store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
      
