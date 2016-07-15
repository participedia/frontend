import React, { PropTypes as T } from 'react'
import AuthService from './utils/AuthService'

export default class AuthenticatedComponent extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.state.loggedIn = false
  }

  onAuthStateChange (user) {
    if (user) {
      this.setState({user: user, loggedIn: true})
    } else {
      this.setState({user: {}, loggedIn: false})
    }
  }
}
