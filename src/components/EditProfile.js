import React, { Component, PropTypes as T } from 'react'  // eslint-disable-line no-unused-vars
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import { Container, Col, Row } from 'reactstrap'
import Geosuggest from 'react-geosuggest'
import RaisedButton from 'material-ui/RaisedButton'
import './EditProfile.css'
import './GeoSuggest.css'
import AutoComplete from 'material-ui/AutoComplete'

class EditProfile extends Component {

  static propTypes = {
    dispatch: T.func.isRequired,
    profile: T.object.isRequired,
    isAuthenticated: T.bool.isRequired
  }
  render () {
    const { profile } = this.props

    return (
      <Container fluid='true' className='profile'>
        <Col md='3' className='sidebar'>
          <div className="user-avatar">
            <Avatar size={200} src={profile.picture} />
            <p className="change-avatar-button">Change</p>
          </div>
          <div className='main-area'>
            <label className="form-label">Name</label>
            <input type="text" defaultValue={profile.name} className="name-input" />
            <div className="divider"></div>
            <label className="form-label">Location</label>
            <div className="location-section">
              <Geosuggest className="org-input" onSuggestSelect={this.props.onLocationSuggest}/>
            </div>
            <label className="form-label">Organization</label>
            <div className="label-description">You can connect your profile to an organization that is published on Participedia. Begin typing on the organization field below and select the organization from the dropdown list. Or, if you think your organization belongs on Participedia, publish it now by clicking Quick Submit.</div>
            <div className="org-section">
              <AutoComplete hintText="Organization autocomplete" dataSource={this.props.organizations} />
              <input type="text" className="org-input" placeholder="Department" />
              <input type="text" className="org-input" placeholder="Job Title" />
              <input type="text" className="org-input" placeholder="Website" />
            </div>
            <div className="divider"></div>
            <label className="form-label">Biography</label>
            <textarea className="biography-input" placeholder="Tell us about yourself"></textarea>
            <div className="quick-submit-section">
              <a href="#" className="quick-submit-button">Quick Submit</a>
            </div>
          </div>
          <label className="form-label organization">Organization</label>
          <div className="label-description">You can connect your profile to an organization that is published on Participedia. Begin typing on the organization field below and select the organization from the dropdown list. Or, if you think your organization belongs on Participedia, publish it now by clicking Quick Submit.</div>
          <Row className='org-field'>
            <Col md='7'>
              <AutoComplete className="auto-org" floatingLabelText="Begin Typing an Organization" dataSource={this.props.organizations} />
            </Col>
            <Col md='5'>
              <RaisedButton label="Quick Submit" className="org-submit" primary={true} />
              <div className="help-button"><a href="#"><span className="question">?</span></a></div>
            </Col>
          </Row>
            <input type="text" className="org-input" placeholder="Department" />
            <input type="text" className="org-input" placeholder="Job Title" />
            <input type="text" className="org-input" placeholder="Website" />
          <div className="divider"></div>
          <label className="form-label">Biography</label>
          <textarea className="biography-input" placeholder="Tell us about yourself"></textarea>
        </Col>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
  }
}

const mapDispatchToProps = () => {
  return {
    onSubmit: () => {
    },
    onLocationSuggest: () => {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
