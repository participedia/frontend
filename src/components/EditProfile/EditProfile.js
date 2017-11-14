import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import { FormattedMessage } from "react-intl";
import CountryMap from "../CountryMap";
import authService from "../../utils/AuthService";
import { object, array } from "prop-types";
import { Container, Col } from "reactstrap";
import "./EditProfile.css";
import "../GeoSuggest/GeoSuggest.css";
import "../CaseEditor.css";
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
import RelatedEditor from "../RelatedEditor";
import RaisedButton from "material-ui/RaisedButton";
import BodyEditor from "../BodyEditor";
import PublishIcon from "material-ui/svg-icons/editor/publish";

const buttonStyle = {
  marginTop: "2rem"
};

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
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.updateBody = this.updateBody.bind(this);
  }

  updateBody(body) {
    this.setState({
      user : {...this.state.user, bio: body}
    })
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
    // console.log("Submitting user", JSON.stringify(this.state.user));
    this.props.onChange(this.state.user);
  }

  handleUpdateInput(value) {
    this.setState({
      user : {...this.state.user, organization: value}
    })
  };

  render() {
    const { profile, user, intl } = this.props;
    const isAuthenticated = authService.isAuthenticated();

    let location = null;
    if (!user) return <div />;

    let avatarEditor = makeLocalizedAvatarEditor(intl, "picture_url", profile);
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
              <div className="form-group row">
                <Col xs={12} lg={3} md={4} className="sidebar">
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
                <Col xs={12} md={6} className="main-area mr-auto">
                  <div className="field-case top">
                    <h2 className="sub-heading">
                      <label className="form-label">
                        <FormattedMessage id="name" />
                      </label>
                    </h2>
                    <Field
                      type={Text}
                      fieldName="name"
                      name="name"
                      hintText={intl.formatMessage({ id: "name" })}
                      className="custom-field"
                    />
                  </div>
                  {locationEditor}
                  {/* <Geosuggest
                    className="org-input"
                    onSuggestSelect={function(data) {
                      user.location = encodeLocation(data);
                      onChange({ user });
                    }}
                  />*/}
                  <div className="field-case last">
                    <h2 className="sub-heading">
                      <label className="form-label">
                        <FormattedMessage id="biography" />
                      </label>
                    </h2>
                    <BodyEditor onEditorChange={this.updateBody} html={this.props.user.bio} />
                  </div>
                  <RaisedButton
                    className="customButton save-profile"
                    secondary
                    style={buttonStyle}
                    label="Label after"
                    labelPosition="after"
                    icon={<PublishIcon />}
                    type="submit"
                    label={intl.formatMessage({
                      id: "publish"
                    })}
                  />
                </Col>
              </div>
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
