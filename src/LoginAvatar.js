import React, { PropTypes as T } from 'react'
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import {Link} from 'react-router'

import styles from './LoginAvatar.css'
import CSSModules from 'react-css-modules'
import AuthenticatedComponent from './AuthenticatedComponent'
import Auth0Lock from 'auth0-lock'
import AuthService from './utils/AuthService'

class LoginAvatar extends AuthenticatedComponent {

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor (props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.state = {
      profile: props.auth.getProfile()
    }
    this.auth = props.auth
    // listen to profile_updated events to update internal state
    // so that we know to re-render
    let comp = this
    props.auth.on('profile_updated', (newProfile) => {
      comp.setState({profile: newProfile})
    })
  }

  signOut () {
    this.auth.logout()
  }

  signIn () {
    this.auth.login()
  };

  render () {
    let buttonStyle = {color: 'black'}
    const { profile } = this.state
    if (profile.picture) {
      return (
        <div styleName="avatar">
          <IconMenu
            iconButtonElement={<Avatar size={30} src={profile.picture} />}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem linkButton style={buttonStyle} containerElement={<Link to="/profile" />}
              onTouchTap={this.handleClose}>Profile</MenuItem>
            <MenuItem style={buttonStyle} primaryText="Sign out"
              onTouchTap={this.signOut} />
          </IconMenu>
        </div>
      )
    } else {
      return (<div styleName="loginButton"><FlatButton onTouchTap={this.signIn} label="login" /></div>)
    }
  }
}

export default CSSModules(LoginAvatar, styles)
