import React, { PropTypes as T } from 'react'  // eslint-disable-line no-unused-vars
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import {Link} from 'react-router'
import {injectIntl, intlShape} from 'react-intl'

import './LoginAvatar.css'
import AuthenticatedComponent from './AuthenticatedComponent'
import auth from './utils/AuthService'
console.log('auth', auth)
console.log('auth.getProfile', auth.getProfile())
class LoginAvatar extends AuthenticatedComponent {

  static propTypes = {
    intl: intlShape.isRequired
  }

  constructor (props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.state = {
      profile: props.auth.getProfile()
    }
    this.auth = auth
    // listen to profile_updated events to update internal state
    // so that we know to re-render
    let comp = this
    props.auth.on('profile_updated', (newProfile) => {
      console.log('got profile_updated', newProfile)
      comp.setState({profile: newProfile})
    })
  }

  signOut () {
    this.auth.logout()
    let locale = this.props.intl.locale
    this.props.history.push(`/${locale}/`)
  }

  signIn () {
    this.auth.login()
  }

  render () {
    let buttonStyle = {color: 'black'}
    let locale = this.props.intl.locale
    const { profile } = this.state
    if (profile.picture) {
      return (
        <div className='avatar'>
          <IconMenu
            iconButtonElement={<Avatar size={30} src={profile.picture} />}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem style={buttonStyle} containerElement={<Link to={'/'+locale+'/profile'} />}
              onTouchTap={this.handleClose}>Profile</MenuItem>
            <MenuItem style={buttonStyle} primaryText='Sign out'
              onTouchTap={this.signOut} />
          </IconMenu>
        </div>
      )
    } else {
      return (<div className='loginButton'><FlatButton onClick={this.signIn} onTouchTap={this.signIn} label='login' /></div>)
    }
  }
}

export default injectIntl(LoginAvatar)
