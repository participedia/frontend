import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import authService from "../utils/AuthService";
import Avatar from "material-ui/Avatar";
import RaisedButton from "material-ui/RaisedButton";
import UserIcon from "material-ui/svg-icons/social/person";
import AddIcon from "material-ui/svg-icons/content/add";
import BookmarkBorder from "material-ui/svg-icons/action/bookmark-border";
import { Container, Row, Col } from "reactstrap";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import SearchHit from "./SearchHit/SearchHit";
import TimeAgo from "react-timeago";
import Membership from "material-ui/svg-icons/action/card-membership";
import Location from "material-ui/svg-icons/maps/place";
import DownloadButton from "material-ui/svg-icons/action/get-app";
import EditIcon from "material-ui/svg-icons/editor/mode-edit";
import { stringifyLocation } from "./geoutils";
import preventDefault from "react-prevent-default";
import searchGridIcon from "../img/pp-search-grid-icon.png";
import searchGridIconActive from "../img/pp-search-grid-icon-active.png";
import searchListIcon from "../img/pp-search-list-icon.png";
import searchListIconActive from "../img/pp-search-list-icon-active.png";
import "./Profile.css";
import "./SearchResultsView/SearchResultsView.css";
import { deDupeThings } from "../util.js";

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { selectedViewType: "grid", selectedCategory: "Authored" };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onLayoutChange(layout) {
    this.setState({ selectedViewType: layout });
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = authService;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  handleChange(event) {
    this.setState({ selectedCategory: event.target.value });
  }

  isProfileOwner() {
    const { profile } = this.state;
    const { user } = this.props;

    if (!profile || !user) return false;

    return user.email === profile.email;
  }

  render() {
    const profile = this.state.profile;
    const selectedViewType = this.state.selectedViewType;
    if (profile === {}) {
      return <div />;
    }
    const { user, intl } = this.props;
    let data = [
      { type: "case", hits: deDupeThings(user.cases) },
      { type: "method", hits: deDupeThings(user.methods) },
      { type: "organizations", hits: deDupeThings(user.organizations) },
    ];

    let authored = [];

    data.forEach(function(batch) {
      batch.hits.forEach(function(hit, index) {
        authored.push(
          <SearchHit
            selectedViewType={selectedViewType}
            key={"authored-" + batch.type + "-" + index}
            record={hit}
          />
        );
      });
    });
    if (authored.length === 0) {
      authored = (
        <Col md={{ size: 12 }} className="nothing-yet mr-auto">
          <FormattedMessage id="no_content_yet_1" />
          <RaisedButton
            className="qs-button customButton mr-2"
            label={intl.formatMessage({id: "quick_submit"})}
            labelPosition="after"
            icon={<AddIcon />}
          />
          <FormattedMessage id="no_content_yet_2" />
        </Col>
      );
    }
    let bookmarked = deDupeThings(user.bookmarks).map((hit, index) => (
      <SearchHit
        selectedViewType={selectedViewType}
        key={"bookmarked-" + index}
        record={hit}
      />
    ));
    if (bookmarked.length === 0) {
      bookmarked = (
        <Col md={{ size: 12 }} className="nothing-yet bookmarks mr-auto">
          <FormattedMessage id="no_bookmarks_yet_1" />
          <BookmarkBorder />
          <FormattedMessage id="no_bookmarks_yet_2" />
        </Col>
      );
    }
    let location = stringifyLocation(user.location);

    return (
      <Container fluid className="profile">
        <Row className="profile-info-section">
          <Col xs={12} md={3} lg={3} className="sidebar">
            <div className="user-avatar">
              { user.picture_url ?
              <Avatar size={160} src={user.picture_url} />
              :
              <UserIcon style={{width:"140", height:"140", fill: 'white'}} />
              }
            </div>
          </Col>
          <Col xs={12} md={9} lg={6} className="main-area">
            <h2 className="name">{user.name}</h2>
            <Link  className="d-block d-md-none d-lg-none d-xl-none text-center" to="/profile/edit">
              <RaisedButton
                className="customButton"
                label={intl.formatMessage({id: "edit_profile"})}
                labelPosition="after"
                icon={<EditIcon />}
                secondary
                type="submit"
              />
            </Link>
            <div className="credentials">
              {user.join_date ? (
                <div>
                  <Membership/>
                  <span>
                   Joined <TimeAgo date={user.join_date} />
                  </span>
                </div>
              ) : (
                <div />
              )}
              {location ?
                <div>
                  <Location/>
                  <span>{location}</span>
                </div>
                :
                <div />
              }
            </div>
            <div className="bio-profile"
              dangerouslySetInnerHTML={{ __html: user.bio }}
            />
            {this.isProfileOwner() ? (
                <Link  className="editProfile d-none d-md-block d-lg-block d-xl-block" to="/profile/edit">
                  <RaisedButton
                    className="customButton"
                    label={intl.formatMessage({id: "edit_profile"})}
                    labelPosition="after"
                    icon={<EditIcon />}
                    secondary
                    type="submit"
                  />
                </Link>
            ) : (
              <div />
            )}
          </Col>
        </Row>
        <Col md={12}>
          <div className="clearfix search-actions-area">
            <div className="filters d-none d-md-block d-lg-block d-xl-block">
              <div
                onClick={() => {
                  this.setState({
                    selectedCategory: "Authored"
                  });
                }}
                className={
                  this.state.selectedCategory === "Authored"
                    ? "selected"
                    : "unselected"
                }
              >
                <FormattedMessage id="authored" />
              </div>
              {this.isProfileOwner() ?
                <div
                  onClick={() => {
                    this.setState({
                      selectedCategory: "Bookmarked"
                    });
                  }}
                  className={
                    this.state.selectedCategory === "Bookmarked"
                      ? "selected"
                      : "unselected"
                  }
                >
                  <FormattedMessage id="bookmarked" />
                </div>
                :
                undefined
              }
            </div>
            {this.isProfileOwner() ?
              <select
                className="mobile-select d-md-none"
                value={this.state.selectedCategory}
                onChange={this.handleChange}
              >
                <option value="Authored">
                  <FormattedMessage id="authored" />
                </option>
                <option value="Bookmarked">
                  <FormattedMessage id="bookmarked" />
                </option>
              </select>
              :
              undefined
            }
            <div className="view-types d-none d-sm-block d-md-block d-lg-block d-xl-block">
              <div
                onClick={() => preventDefault(this.onLayoutChange("grid"))}
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
                onClick={() => preventDefault(this.onLayoutChange("list"))}
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
              <div>
                <DownloadButton />
              </div>
            </div>
          </div>
          <Row>
            { this.state.selectedCategory === "Authored" ?
              authored
              :
              bookmarked
            }
          </Row>
        </Col>
      </Container>
    );
  }
}

export default injectIntl(Profile);
