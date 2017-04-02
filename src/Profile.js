import React, { Component, PropTypes as T } from "react"; // eslint-disable-line no-unused-vars
import Avatar from "material-ui/Avatar";
import { Container, Row, Col } from "reactstrap";
import { injectIntl, intlShape } from "react-intl";
import { Link } from "react-router";
import { connect } from "react-redux";
import Bookmarked from "./containers/Bookmarked";

import "./Profile.css";

class Profile extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    profile: T.object.isRequired
  };

  render() {
    const { profile } = this.props;
    let jobtitle = "";
    profile.identities.forEach(function(identity) {
      if (identity.provider === "linkedin") {
        jobtitle = identity.profileData.headline;
      }
    });

    return (
      <Container fluid={true} className="profile">
        <Row className="profile-info-section">
          <Col lg={3} md={4} className="sidebar">
            <div className="user-avatar">
              {profile.user_metadata && profile.user_metadata.customPic
                ? <Avatar size={200} src={profile.user_metadata.customPic} />
                : <Avatar size={200} src={profile.picture} />}
            </div>
            <Link to="/en-US/profile/edit" className="edit-profile-button">
              Edit Profile
            </Link>
          </Col>
          <Col lg={9} md={8} className="main-area">
            <h2 className="name">{profile.name || "Matthew Chan"}</h2>
            <div className="credentials">
              <p>{jobtitle}</p>
              <p>Member since 03/22/2008</p>
            </div>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper arcu vel nisl elementum tincidunt. Cras nec imperdiet metus. In pretium vel nisi sed varius. In et turpis odio. Nulla et justo nunc. Ut fermentum metus a lacus aliquam, dapibus auctor nisl blandit. Suspendisse sollicitudin consectetur neque, a elementum arcu eleifend non. Nam et nisi iaculis quam convallis efficitur.
            </p>
          </Col>
        </Row>
        <Bookmarked />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.auth.profile };
}

export default injectIntl(connect(mapStateToProps)(Profile));
