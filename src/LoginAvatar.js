import React, { PropTypes as T } from 'react'  // eslint-disable-line no-unused-vars
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import {Link} from 'react-router'
import {injectIntl, intlShape} from 'react-intl'
import './LoginAvatar.css'
import { login, logoutUser } from './actions'
import { connect } from 'react-redux'

class LoginAvatar extends React.Component {

  static propTypes = {
    dispatch: T.func.isRequired,
    intl: intlShape.isRequired,
    profile: T.object.isRequired,
    isAuthenticated: T.bool.isRequired
  }

  render () {
    const { dispatch, profile, isAuthenticated } = this.props
    let buttonStyle = {color: 'black'}
    let locale = this.props.intl.locale
    if (isAuthenticated) {
      return (
        <div className='avatar'>
          <IconMenu
            iconButtonElement={<IconButton><Avatar size={30} src={profile.picture} /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem style={buttonStyle} containerElement={<Link to={'/'+locale+'/profile'} />}
              onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem style={buttonStyle} primaryText='Sign out'
              onClick={() => dispatch(logoutUser())} />
          </IconMenu>
        </div>
      )
    } else {
      return (<div className='loginButton'><FlatButton onClick={() => dispatch(login())} onTouchTap={this.signIn} label='login' /></div>)
    }
  }
}

function mapStateToProps(state) {
  return state
}

export default injectIntl(connect(mapStateToProps)(LoginAvatar))
