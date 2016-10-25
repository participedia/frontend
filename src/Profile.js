import React, { Component, PropTypes as T } from 'react'  // eslint-disable-line no-unused-vars
import {Link} from 'react-router'
import AuthService from './utils/AuthService'
import Avatar from 'material-ui/Avatar'
import SearchResults from './containers/SearchResults'
import './Profile.css'

class Profile extends Component {

  constructor (props) {
    super(props)
    this.state = {
      profile: {}
    }
  }

  render () {
    const { profile } = this.state

    // locale needs to be hooked up in render.

    return (
      <div className='profile'>
        <div className="profile-info-section">
          <div className='sidebar'>
            <div className="user-avatar"></div>
            <Link to="/en-US/profile/edit" className="edit-profile-button">Edit Profile</Link>
          </div>
          <div className='main-area'>
            <h2 className="name">{profile.name || 'Matthew Chan'}</h2>
            <div className="credentials">
              <p>Assistant Professor</p>
              <p>Department of Political Science. University of Baltimore</p>
              <p>Member since 03/22/2008</p>
            </div>
            <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper arcu vel nisl elementum tincidunt. Cras nec imperdiet metus. In pretium vel nisi sed varius. In et turpis odio. Nulla et justo nunc. Ut fermentum metus a lacus aliquam, dapibus auctor nisl blandit. Suspendisse sollicitudin consectetur neque, a elementum arcu eleifend non. Nam et nisi iaculis quam convallis efficitur.</p>
          </div>
        </div>
        <SearchResults />
      </div>
   )
  }
}
Profile.propTypes = {
  auth: T.instanceOf(AuthService)
}

export default Profile
