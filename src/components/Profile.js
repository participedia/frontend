import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import { Container, Row, Col } from "reactstrap";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import SearchHit from "./SearchHit/SearchHit";
import TimeAgo from "react-timeago";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentPencil from "material-ui/svg-icons/image/edit";
import { stringifyLocation } from "./geoutils";
import preventDefault from "react-prevent-default";
import searchGridIcon from "../img/pp-search-grid-icon.png";
import searchGridIconActive from "../img/pp-search-grid-icon-active.png";
import searchListIcon from "../img/pp-search-list-icon.png";
import searchListIconActive from "../img/pp-search-list-icon-active.png";
import "./Profile.css";

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {selectedViewType: "grid"};
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    this.setState({ selectedViewType: layout });
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const profile = this.state.profile;
    const selectedViewType = this.state.selectedViewType;
    if (profile === {}) {
      return <div />;
    }
    const { user } = this.props;
    let data = [
      { type: "case", hits: user.cases },
      { type: "method", hits: user.methods }
    ];

    let authored = [];
    let intl = this.props.intl;

    data.forEach(function(batch) {
      batch.hits.forEach(function(hit, index) {
        authored.push(
          <SearchHit
            selectedViewType={selectedViewType}
            key={"authored-" + batch.type + "-" + index}
            record={hit}
            intl={intl}
          />
        );
      });
    });
    if (authored.length === 0) {
      authored = <div className="nothing-yet">Nothing yet</div>;
    }
    let bookmarked = user.bookmarks.map((hit, index) =>
      <SearchHit
        selectedViewType={selectedViewType}
        key={"bookmarked-" + index}
        record={hit}
        intl={intl}
      />
    );
    if (bookmarked.length === 0) {
      bookmarked = <div className="nothing-yet">Nothing yet</div>;
    }
    let location = stringifyLocation(user.location);

    return (
      <Container fluid className="profile pb-3">
        <Row className="profile-info-section">
          <Col lg={3} md={4} className="sidebar">
            <div className="user-avatar">
              <Avatar size={200} src={user.picture_url} />
            </div>
          </Col>
          <Col lg={9} md={8} className="main-area">
            <h2 className="name">{user.name}</h2>
            <div className="credentials">
              <p>{user.title}</p>
              <p>{user.affiliation}</p>
              <p>{location}</p>
              {user.join_date
                ? <p>Joined <TimeAgo date={user.join_date} /></p>
                : <div />}
              <p>{user.bio}</p>
            </div>
            <div className="main-contents">
              <div className="authored-content">
                <div className="heading">Authored Content</div>
                  <div className="view-types-cont">
                    <div className="view-types hidden-sm-down">
                      <div
                        onClick={() =>
                          preventDefault(this.onLayoutChange("grid"))}
                        className={
                          this.state.selectedViewType === "grid"
                            ? "selected"
                            : "unselected"
                        }
                      >
                        <img src={searchGridIcon} className="grid-icon" alt="" />
                        <img
                          src={searchGridIconActive}
                          className="grid-icon"
                          alt=""
                        />
                      </div>
                      <div
                        onClick={() =>
                          preventDefault(this.onLayoutChange("list"))}
                        className={
                          this.state.selectedViewType === "list"
                            ? "selected"
                            : "unselected"
                        }
                      >
                        <img src={searchListIcon} className="list-icon" alt="" />
                        <img
                          src={searchListIconActive}
                          className="list-icon"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  {authored}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="profile-info-section">
          <Col lg={{size: 9, offset: 3}} md={{size: 8, offset: 4}} className="main-area">
            <div className="bookmarked-content">
              <div className="heading pb-1">Bookmarked Content</div>
              {bookmarked}
            </div>
          </Col>
        </Row>
        {user.email === profile.email ?
          <Link to="/profile/edit">
            <FloatingActionButton className="editButton">
              <ContentPencil />
            </FloatingActionButton>
          </Link>
          : <div />
        }
      </Container>
    );
  }
}

export default injectIntl(Profile);
