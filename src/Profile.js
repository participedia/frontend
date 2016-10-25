import React, { Component, PropTypes as T } from 'react'  // eslint-disable-line no-unused-vars
import auth from './utils/AuthService'
import Avatar from 'material-ui/Avatar'
import {injectIntl, intlShape} from 'react-intl'
import './Profile.css'

class Profile extends Component {

  static propTypes = {
    intl: intlShape.isRequired
  }

  constructor (props) {
    super(props)
    console.log('in Profile.constructor, props = ', props)
    this.state = {
      profile: auth.getProfile()
    }
    this.auth = auth
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

export default injectIntl(Profile)
