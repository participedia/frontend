import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import { Container, Row, Col } from "reactstrap";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SearchHit from "./SearchHit/SearchHit";
import TimeAgo from "react-timeago";
import authService from "../utils/AuthService";

import "./Profile.css";

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const profile = authService.getProfile();
    let isLoggedIn = authService.loggedIn();
    const { user } = this.props;
    let data = [
      { type: "case", hits: user.cases },
      { type: "method", hits: user.methods }
    ];

    let authored = [];

    data.forEach(function(batch) {
      batch.hits.forEach(function(hit, index) {
        authored.push(
          <SearchHit
            selectedViewType="grid"
            key={"authored-" + batch.type + "-" + index}
            record={hit}
          />
        );
      });
    });
    if (authored.length === 0) {
      authored = <div className="nothing-yet">Nothing yet</div>;
    }
    let bookmarked = user.bookmarks.map((hit, index) => (
      <SearchHit
        selectedViewType="grid"
        key={"bookmarked-" + index}
        record={hit}
      />
    ));
    if (bookmarked.length === 0) {
      bookmarked = <div className="nothing-yet">Nothing yet</div>;
    }

    return (
      <Container fluid={true} className="profile">
        <Row className="profile-info-section">
          <Col lg={3} md={4} className="sidebar">
            <div className="user-avatar">
              <Avatar size={200} src={user.picture_url} />
            </div>
            {isLoggedIn && user.email === profile.email
              ? <Link to="/en-US/profile/edit" className="edit-profile-button">
                  Edit Profile
                </Link>
              : <div />}
          </Col>
          <Col lg={9} md={8} className="main-area">
            <h2 className="name">{user.name}</h2>
            <div className="credentials">
              <p>{user.title}</p>
              <p>{user.affiliation}</p>
              {user.join_date
                ? <p>Joined <TimeAgo date={user.join_date} /></p>
                : <div />}
            </div>
            <div className="main-contents">
              <div className="authored-content">
                <div className="heading">Authored Content</div>
                <div className="search-results">
                  <div className="search-description" />
                  <div className="result-count">
                    <div className="results-box">
                      {authored}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bookmarked-content">
                <div className="heading">Bookmarked Content</div>
                <div className="search-results">
                  <div className="search-description" />
                  <div className="result-count">
                    <div className="results-box">
                      {bookmarked}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.auth.profile };
}

export default injectIntl(connect(mapStateToProps)(Profile));
