import React, { Component, PropTypes as T } from 'react'  // eslint-disable-line no-unused-vars
import AuthService from './utils/AuthService'
import './EditProfile.css'

class EditProfile extends Component {

  constructor (props) {
    super(props)
    // this.state = {
    //   profile: props.auth.getProfile()
    // }
    // this.auth = props.auth
    this.state = {
      profile: {}
    }
  }

  render () {
    const { profile } = this.state

    return (
      <div className='profile'>
        <div className="profile-info-section">
          <div className='sidebar'>
            <div className="user-avatar">
              <p className="change-avatar-button">Change</p>
            </div>
          </div>
          <div className='main-area'>
            <label className="form-label">Name</label>
            <input type="text" defaultValue={profile.name || 'Matthew Chan'} className="name-input" />
            <div className="divider"></div>
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
EditProfile.propTypes = {
  auth: T.instanceOf(AuthService)
}

export default EditProfile
