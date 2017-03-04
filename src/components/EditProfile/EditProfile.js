import React, { Component, PropTypes as T } from "react"; // eslint-disable-line no-unused-vars
import Avatar from "material-ui/Avatar";
import { connect } from "react-redux";
import { Container, Col } from "reactstrap";
import Geosuggest from "react-geosuggest";
import "./EditProfile.css";
import "../GeoSuggest/GeoSuggest.css";
import AutoComplete from "material-ui/AutoComplete";
import TextField from "material-ui/TextField";
import Upload from "../../Upload";
import { injectIntl } from "react-intl";

class EditProfile extends Component {
  static propTypes = {
    dispatch: T.func.isRequired,
    profile: T.object.isRequired,
    isAuthenticated: T.bool.isRequired
  };

  render() {
    const { isAuthenticated, profile } = this.props;

    const nameStyle = {
      color: "#3f51b2",
      fontSize: 2.2 + "rem",
      paddingBottom: 7 + "px"
    };

    const customStyle = {
      borderRadius: 5,
      position: "absolute",
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      bottom: "28px",
      left: 0,
      width: "100%",
      textAlign: "center",
      color: "#fff",
      padding: "7px 0",
      boxSizing: "border-box"
    };

    return (
      <Container fluid={true} className="edit-profile">
        {isAuthenticated
          ? <div>
              <Col md="3" className="sidebar">
                <div className="user-avatar">
                  {profile.user_metadata && profile.user_metadata.customPic
                    ? <Avatar
                        size={200}
                        src={profile.user_metadata.customPic}
                      />
                    : <Avatar size={200} src={profile.picture} />}
                  <Upload
                    customStyle={customStyle}
                    profile={profile}
                    updatePicture={true}
                  />
                </div>
              </Col>
              <Col md="9" className="main-area">
                <label className="form-label">
                  {this.props.intl.formatMessage({ id: "name" })}
                </label>
                <TextField
                  inputStyle={nameStyle}
                  hintText={this.props.intl.formatMessage({ id: "name" })}
                  defaultValue={profile.name}
                  className="name-input"
                />
                <br />
                <div className="divider" />
                <label className="form-label">
                  {this.props.intl.formatMessage({ id: "location" })}
                </label>
                <Geosuggest
                  className="org-input"
                  onSuggestSelect={this.props.onLocationSuggest}
                />
                <label className="form-label organization">
                  {this.props.intl.formatMessage({ id: "organization" })}
                </label>
                <div className="label-description">
                  {this.props.intl.formatMessage({ id: "organization_text" })}
                </div>
                <AutoComplete
                  className="auto-org"
                  floatingLabelText={this.props.intl.formatMessage({
                    id: "type_org"
                  })}
                  dataSource={this.props.organizations}
                />
                <br />
                <TextField
                  hintText={this.props.intl.formatMessage({ id: "department" })}
                />
                <br />
                <TextField
                  hintText={this.props.intl.formatMessage({ id: "job_title" })}
                />
                <br />
                <TextField
                  hintText={this.props.intl.formatMessage({ id: "website" })}
                />
                <br />
                <div className="divider" />
                <label className="form-label">
                  {this.props.intl.formatMessage({ id: "biography" })}
                </label>
                <textarea
                  className="biography-input"
                  placeholder={this.props.intl.formatMessage({ id: "tell_us" })}
                />
              </Col>
            </div>
          : <Col md={{ size: 9, offset: 1 }} className="main-area">
              <p>{this.props.intl.formatMessage({ id: "sorry" })}</p>
            </Col>}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile
  };
}

const mapDispatchToProps = () => {
  return {
    onSubmit: () => {},
    onLocationSuggest: () => {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(EditProfile)
);
