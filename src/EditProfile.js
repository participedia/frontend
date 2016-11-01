import React, { Component, PropTypes as T } from 'react'  // eslint-disable-line no-unused-vars
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import Geosuggest from 'react-geosuggest'
import './EditProfile.css'
import './GeoSuggest.css'

class EditProfile extends Component {

  static propTypes = {
    dispatch: T.func.isRequired,
    profile: T.object.isRequired,
    isAuthenticated: T.bool.isRequired
  }
  render () {
    const { profile } = this.props

    return (
      <div className='profile'>
        <div className="profile-info-section">
          <div className='sidebar'>
            <div className="user-avatar">
              <Avatar size={200} src={profile.picture} />
              <p className="change-avatar-button">Change</p>
            </div>
          </div>
          <div className='main-area'>
            <label className="form-label">Name</label>
            <input type="text" defaultValue={profile.name} className="name-input" />
            <div className="divider"></div>
            <label className="form-label">Location</label>
            <div className="location-section">
              <Geosuggest className="org-input"/>
            </div>
            <label className="form-label">Organization</label>
            <div className="label-description">You can connect your profile to an organization that is published on Participedia. Begin typing on the organization field below and select the organization from the dropdown list. Or, if you think your organization belongs on Participedia, publish it now by clicking Quick Submit.</div>
            <div className="org-section">
              <div className="quick-submit-section">
                <input type="text" className="org-input" placeholder="Begin Typing an Organization" />
                <a href="#" className="quick-submit-button">Quick Submit</a>
                <a href="#" className="help-button">?</a>
              </div>
              <input type="text" className="org-input" placeholder="Department" />
              <input type="text" className="org-input" placeholder="Job Title" />
              <input type="text" className="org-input" placeholder="Website" />
            </div>
            <div className="divider"></div>
            <label className="form-label">Biography</label>
            <textarea className="biography-input" placeholder="Tell us about yourself"></textarea>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {profile: state.auth.profile}
}

export default connect(mapStateToProps)(EditProfile)
