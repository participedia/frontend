import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import { FormattedMessage } from "react-intl";
import CountryMap from "../CountryMap";
import { object, array } from "prop-types";
import { Container, Col } from "reactstrap";
import "./EditProfile.css";
import "../GeoSuggest/GeoSuggest.css";
import FloatingActionButton from "material-ui/FloatingActionButton";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import { Form, Field } from "simple-react-form";
import Text from "simple-react-form-material-ui/lib/text";
import Textarea from "simple-react-form-material-ui/lib/textarea";
import Select from "simple-react-form-material-ui/lib/select";
import {
  makeLocalizedLocationField,
  makeLocalizedAvatarEditor
} from "../PropEditors";
import { encodeLocation } from "../geoutils";

export default class EditProfile extends Component {
  static propTypes = {
    profile: object,
    user: object,
    intl: object.isRequired,
    organizations: array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = this.propsToDefaultState(props);
  }

  propsToDefaultState(props) {
    let { user, profile } = props;
    if (user) {
      user.picture =
        profile.user_metadata && profile.user_metadata.customPic
          ? profile.user_metadata.customPic
          : profile.picture;
      if (!user.location) {
        user.location = "";
      }
      if (typeof user.location !== typeof "") {
        // console.log("Have location of", user.location);
        user.location = encodeLocation(user.location);
      }
    }
    return { user };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.propsToDefaultState(nextProps));
  }
  onSubmit(event) {
    console.log("Submitting user", this.state.user);
    this.props.onChange(this.state.user);
  }

  render() {
    const { auth, profile, user, intl } = this.props;
    const isAuthenticated = auth.isAuthenticated();

    const nameStyle = {
      color: "#3f51b2",
      fontSize: 1.2 + "rem",
      paddingBottom: 7 + "px"
    };
    let location = null;
    if (!user) return <div />;

    let avatarEditor = makeLocalizedAvatarEditor(
      intl,
      "picture_url",
      profile,
      auth
    );
    let locationEditor = makeLocalizedLocationField(intl, "location");

    return (
      <Container fluid className="edit-profile">
        {isAuthenticated ? (
          <div>
            <Form
              onSubmit={this.onSubmit.bind(this)}
              state={user}
              onChange={changes => this.setState({ user: changes })}
            >
              <Col md="3" className="sidebar">
                {avatarEditor}

                {location ? (
                  <CountryMap
                    city={location.city}
                    countrycode={location.country}
                  />
                ) : (
                  <div />
                )}
              </Col>
              <Col md="9" className="main-area">
                <label className="form-label">
                  <FormattedMessage id="name" />
                </label>
                <Field
                  type={Text}
                  fieldName="name"
                  name="name"
                  inputStyle={nameStyle}
                  hintText={intl.formatMessage({ id: "name" })}
                  className="name-input"
                />
                <br />
                <div className="divider" />
                <label className="form-label">
                  <FormattedMessage id="location" />
                </label>
                {locationEditor}
                {/* <Geosuggest
                    className="org-input"
                    onSuggestSelect={function(data) {
                      user.location = encodeLocation(data);
                      onChange({ user });
                    }}
                  />*/}
                <label className="form-label organization">
                  <FormattedMessage id="organization" />
                </label>
                <div className="label-description">
                  <FormattedMessage id="organization_text" />
                </div>
                <Field
                  fieldName="organization"
                  name="organization"
                  type={Select}
                  options={this.props.organizations}
                />
                <br />
                <Field
                  type={Text}
                  fieldName="affiliation"
                  hintText={this.props.intl.formatMessage({
                    id: "department"
                  })}
                />
                <br />
                <Field
                  type={Text}
                  fieldName="title"
                  hintText={this.props.intl.formatMessage({
                    id: "job_title"
                  })}
                />
                <br />
                <Field
                  type={Text}
                  fieldName="website"
                  hintText={this.props.intl.formatMessage({
                    id: "website"
                  })}
                />
                <br />
                <div className="divider" />
                <label className="form-label">
                  <FormattedMessage id="biography" />
                </label>
                <Field
                  type={Textarea}
                  fieldName="bio"
                  name="bio"
                  className="biography-input"
                  placeholder={this.props.intl.formatMessage({
                    id: "tell_us"
                  })}
                />
              </Col>
              <FloatingActionButton
                onTouchTap={this.onSubmit.bind(this)}
                className="editButton"
              >
                <FileUpload />
              </FloatingActionButton>
            </Form>
          </div>
        ) : (
          <Col md={{ size: 9, offset: 1 }} className="main-area">
            <p>
              <FormattedMessage id="sorry" />
            </p>
          </Col>
        )}
      </Container>
    );
  }
}
