import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import RelatedContent from "../RelatedContent";
import Gallery from "../Gallery";
import ReactPlayer from "react-player";
import BookmarkToggle from "../BookmarkToggle";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentPencil from "material-ui/svg-icons/image/edit";
import caseIconFB from "../../img/pp-case-icon-fb.svg";
import caseIconTW from "../../img/pp-case-icon-tw.svg";
import caseIconLN from "../../img/pp-case-icon-ln.png";
import { ShareButtons } from "react-share";
import htmlToText from "html-to-text";
import "./ItemDetails.css";
import TimeAgo from "react-timeago";
import Toggle from "material-ui/Toggle";

function isCurator(profile) {
  if (!profile || !profile.app_metadata || !profile.app_metadata.authorization)
    return false;
  let groups = profile.app_metadata.authorization.groups;
  return groups.indexOf("Curators") !== -1;
}

class Featured extends React.Component {
  static propTypes = {
    toggleFeatured: PropTypes.func.isRequired,
    thing: PropTypes.object.isRequired
  };

  onToggle(object, value) {
    this.props.thing["featured"] = value;
    this.props.toggleFeatured(this.props.thing, value);
  }

  render() {
    const { isAuthenticated, profile } = this.props;
    if (!isAuthenticated) return <div />;
    return isCurator(profile)
      ? <div className="featuretoggle">
          <Toggle
            onToggle={this.onToggle.bind(this)}
            labelPosition="right"
            defaultToggled={this.props.thing.featured}
            label="Featured"
          />
        </div>
      : <div />;
  }
}

class Hidden extends React.Component {
  static propTypes = {
    toggleHidden: PropTypes.func.isRequired,
    thing: PropTypes.object.isRequired
  };

  onToggle(object, value) {
    this.props.thing["hidden"] = value;
    this.props.toggleHidden(this.props.thing, value);
  }

  render() {
    const { isAuthenticated, profile } = this.props;
    if (!isAuthenticated) return <div />;
    return isCurator(profile)
      ? <div className="featuretoggle">
          <Toggle
            onToggle={this.onToggle.bind(this)}
            labelPosition="right"
            defaultToggled={this.props.thing.hidden}
            label="Hidden"
          />
        </div>
      : <div />;
  }
}

const defaultThing = {
  title: "Loading",
  type: "content",
  body: "Description",
  lead_image: null,
  other_images: [],
  post_date: "2011-11-30T17:20:28",
  updated_date: "2011-11-30T17:20:28",
  location: {
    city: "",
    countrycode: ""
  },
  authors: [
    {
      name: "author name"
    }
  ]
};

export default class ItemDetails extends React.Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { isAuthenticated, userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile, isAuthenticated: isAuthenticated() });
      });
    } else {
      this.setState({
        profile: userProfile,
        isAuthenticated: isAuthenticated()
      });
    }
  }

  render() {
    const {
      FacebookShareButton,
      TwitterShareButton,
      LinkedinShareButton
    } = ShareButtons;
    const isAuthenticated = this.props.isAuthenticated;
    const intl = this.props.intl;
    const thing = this.props.data || defaultThing;
    let bookmarked = isAuthenticated && thing.bookmarked;
    let bookmarkIcon = (
      <BookmarkToggle
        thingType="case"
        thingid={thing.id}
        bookmarked={bookmarked}
      />
    );
    let bodyText = htmlToText.fromString(thing.body);
    let currentUrl =
      process.env.REACT_APP_ROOT_URL + this.props.location.pathname;
    let textFacebook = bodyText.substring(0, 240) + "...";

    let lead;
    let awsUrl = process.env.REACT_APP_ASSETS_URL;
    if (thing && thing.lead_image) {
      lead = awsUrl + encodeURIComponent(thing.lead_image.url);
    }

    let first_author = thing.authors[0];
    let first_author_url = "/users/" + first_author.user_id;
    let first_author_name = first_author.name;
    let last_author = thing.authors.slice(-1)[0];
    let last_author_name = last_author.name;
    let last_author_url = "/users/" + last_author.user_id;
    let id = this.props.id;
    let type = thing.type;
    let editLinkUrl = `/${type}/${id}/edit`;
    let detailedBits = React.createElement(this.props.details, {
      case: thing,
      intl
    });

    // XXX L10N -- lots of strings to extract.
    return (
      <div>
        <div className="main-contents">
          <Container className="detailed-case-component" fluid>
            <Row>
              <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down">
                <Featured
                  thing={thing}
                  profile={this.state.profile}
                  isAuthenticated={this.state.isAuthenticated}
                  toggleFeatured={this.props.toggleFeatured}
                />
                <Hidden
                  thing={thing}
                  profile={this.state.profile}
                  isAuthenticated={this.state.isAuthenticated}
                  toggleHidden={this.props.toggleHidden}
                />
                {detailedBits}
                <RelatedContent thing={thing} intl={intl} />
              </Col>
              <Col md="8" xs="12" className="main-area">
                <div className="case-box">
                  <h2 className="category">
                    {intl.formatMessage({ id: thing.type })}
                  </h2>
                  <h2 className="case-title">
                    {thing.title}
                  </h2>
                  <ul className="icons-mobile clearfix hidden-sm-up">
                    <li>{bookmarkIcon}</li>
                    <li>
                      <FacebookShareButton
                        url={currentUrl}
                        title={thing.title}
                        description={textFacebook}
                        picture={lead}
                      >
                        <img src={caseIconFB} alt="" />
                      </FacebookShareButton>
                    </li>
                    <li>
                      <TwitterShareButton url={currentUrl} title={thing.title}>
                        <img src={caseIconTW} alt="" />
                      </TwitterShareButton>
                    </li>
                  </ul>
                  {thing.vidURL
                    ? <Row>
                        <Col className="vid-container" md="6">
                          <ReactPlayer
                            width="100%"
                            controls
                            url={thing.vidURL}
                          />
                        </Col>
                        <Col md="6"><Gallery thing={thing} /></Col>
                      </Row>
                    : <Gallery thing={thing} />}
                  <div className="authorship-details">
                    <p className="author-line">
                      First submitted by&nbsp;
                      <Link to={first_author_url}>
                        {first_author_name}
                      </Link>
                    </p>
                    <p className="date-line">
                      {thing.post_date
                        ? <TimeAgo date={thing.post_date} />
                        : <span />}
                    </p>
                    <p className="author-line">
                      Most recent changes by&nbsp;
                      <Link to={last_author_url}>
                        {last_author_name}
                      </Link>
                    </p>
                    <p className="date-line">
                      {thing.updated_date
                        ? <TimeAgo date={thing.updated_date} />
                        : <span />}
                    </p>
                  </div>
                  <div
                    className="case-html"
                    dangerouslySetInnerHTML={{ __html: thing.body }}
                  />
                </div>
              </Col>
              <Col md="1" className="case-tools hidden-sm-down">
                <div className="top-icons">
                  {bookmarkIcon}
                  <FacebookShareButton
                    url={currentUrl}
                    title={thing.title}
                    description={textFacebook}
                    picture={lead}
                  >
                    <img src={caseIconFB} alt="" />
                  </FacebookShareButton>
                  <TwitterShareButton url={currentUrl} title={thing.title}>
                    <img src={caseIconTW} alt="" />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={currentUrl}
                    description={textFacebook}
                    title={thing.title}
                  >
                    <img src={caseIconLN} alt="" />
                  </LinkedinShareButton>
                </div>
              </Col>
            </Row>
          </Container>
          <Link to={editLinkUrl}>
            <FloatingActionButton className="editButton">
              <ContentPencil />
            </FloatingActionButton>
          </Link>
        </div>
      </div>
    );
  }
}

ItemDetails.propTypes = {
  auth: PropTypes.object.isRequired
};
