import React, { PropTypes as T } from 'react'
import AuthService from './utils/AuthService'

class AuthenticatedComponent extends React.Component {

  constructor (props) {
    super(props)
    this.state = {loggedIn: false}
  }

  onAuthStateChange (user) {
    if (user) {
      this.setState({user: user, loggedIn: true})
    } else {
      this.setState({user: {}, loggedIn: false})
    }
  }
}

AuthenticatedComponent.propTypes = {
  auth: T.instanceOf(AuthService)
}

export default AuthenticatedComponent
