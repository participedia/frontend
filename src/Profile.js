import React, { Component, PropTypes as T } from 'react'
import AuthService from './utils/AuthService'
import Avatar from 'material-ui/Avatar'
import styles from './Profile.css'
import CSSModules from 'react-css-modules'

export default class Profile extends Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor (props) {
    super(props)
    this.state = {
      profile: props.auth.getProfile()
    }
    this.auth = props.auth
  }

  render () {
    const { profile } = this.state

    return (
      <div styleName="profile">
        <Avatar styleName="avatar" size={128} src={profile.picture} />
        <h2>{profile.name}</h2>
        <p> This page requires one to be logged in (just for testing purposes right now).</p>
      </div>
   )
  }
}

export default CSSModules(Profile, styles)
