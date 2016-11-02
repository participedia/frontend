import React, { Component, PropTypes as T } from 'react'  // eslint-disable-line no-unused-vars
import Avatar from 'material-ui/Avatar'
import {injectIntl, intlShape} from 'react-intl'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import SearchResults from './containers/SearchResults'

import './Profile.css'

class Profile extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    profile: T.object.isRequired
  }

  render () {
    const { profile } = this.props
    let jobtitle = ''
    profile.identities.forEach(function (identity) {
      if (identity.provider === 'linkedin') {
        jobtitle = identity.profileData.headline
      }
    })

    
    return (
      <div className='profile'>
        <div className="profile-info-section">
          <div className='sidebar'>
            <Avatar size={200} src={profile.picture} />
            <Link to="/en-US/profile/edit" className="edit-profile-button">Edit Profile</Link>
          </div>
          <div className='main-area'>
            <h2 className="name">{profile.name || 'Matthew Chan'}</h2>
            <div className="credentials">
              <p>{jobtitle}</p>
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

function mapStateToProps(state) {
  return {profile: state.auth.profile}
}

export default injectIntl(connect(mapStateToProps)(Profile))

