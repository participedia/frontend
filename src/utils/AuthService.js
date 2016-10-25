import Auth0Lock from 'auth0-lock'
import { isTokenExpired } from './jwtHelper'
import { EventEmitter } from 'events'
/* eslint-env browser */

class AuthService extends EventEmitter {
  constructor (clientId, domain) {
    super()
    this.domain = domain
    // Configure Auth0
    // console.log("redirecting to", document.location)
    this.lock = new Auth0Lock(clientId, domain, {auth: {redirect: true,
      redirectUrl: document.location.origin
    }})
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication (authResult) {
    // Saves the user token
    console.log('in _doAuthentication', authResult)
    this.setToken(authResult.idToken)
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
  }

  _authorizationError (error) {
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  setProfile (profile) {
    // Saves profile data to localStorage
    console.log('setProfile',profile)
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile () {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    console.log('got profile', profile)
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  login () {
    // Call the show method to display the widget.
    var comp = this
    this.lock.show({authParams: { scope: 'openid email app_metadata' }},
      function (err, profile, idToken) {
        if (err) {
          console.log('There was an error :/', err)
          return
        }
        console.log('after lock', profile, idToken)
        comp.setProfile(profile)
        comp.setToken(idToken)
      }
    )
  }

  loggedIn () {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken (idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken () {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout () {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    this.emit('profile_updated', {})
  }
}

export default new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN)  // eslint-disable-line no-undef
