import React, { Component, PropTypes as T } from 'react'  // eslint-disable-line no-unused-vars
import AuthService from './utils/AuthService'
import Avatar from 'material-ui/Avatar'
import './Profile.css'

class Profile extends Component {

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
      <div className='profile'>
        <Avatar className='avatar' size={128} src={profile.picture} />
        <h2>{profile.name}</h2>
        <p> This page requires one to be logged in (just for testing purposes right now).</p>
      </div>
   )
  }
}
Profile.propTypes = {
  auth: T.instanceOf(AuthService)
}

export default Profile
