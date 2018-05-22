import React from "react";
import auth from "../../utils/AuthService";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FormattedDate } from "react-intl";
import Gallery from "../Gallery";
import BookmarkToggle from "../BookmarkToggle";
import AccordionTab from "../AccordionTab/AccordionTab";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentPencil from "material-ui/svg-icons/image/edit";
import caseIconFB from "../../img/pp-case-icon-fb.svg";
import caseIconTW from "../../img/pp-case-icon-tw.svg";
import caseIconLN from "../../img/pp-case-icon-ln.png";
import { ShareButtons } from "react-share";
import htmlToText from "html-to-text";
import "./ItemDetails.css";
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
    const { isAuthenticated } = auth;
    const { profile } = this.props;
    if (!isAuthenticated) return <div />;
    return isCurator(profile) ? (
      <div className="featuretoggle">
        <Toggle
          onToggle={this.onToggle.bind(this)}
          labelPosition="right"
          defaultToggled={this.props.thing.featured}
          label="Featured"
        />
      </div>
    ) : (
      <div />
    );
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
    return isCurator(profile) ? (
      <div className="featuretoggle">
        <Toggle
          onToggle={this.onToggle.bind(this)}
          labelPosition="right"
          defaultToggled={this.props.thing.hidden}
          label="Hidden"
        />
      </div>
    ) : (
      <div />
    );
  }
}

const defaultThing = {
  title: "Loading",
  type: "content",
  body: "Description",
  images: [],
  post_date: "2011-11-30T17:20:28",
  updated_date: "2011-11-30T17:20:28",
  location: {
    city: "",
    countrycode: ""
  },
  videos: [],
  creator: { name: "author name" },
  last_updated_by: { name: "author name" }
};

export default class ItemDetails extends React.Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { isAuthenticated, userProfile, getProfile } = auth;
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
    const intl = this.props.intl;
    const thing = this.props.data || defaultThing;
    let bookmarked = thing.bookmarked;
    let bookmarkIcon = (
      <BookmarkToggle
        thingType={thing.type}
        thingid={thing.id}
        bookmarked={bookmarked}
      />
    );
    let bodyText = htmlToText.fromString(thing.body);
    let currentUrl =
      process.env.REACT_APP_ROOT_URL + this.props.location.pathname;
    let textFacebook = bodyText.substring(0, 240) + "...";
    let creator = thing.creator;
    let creator_url = "/users/" + creator.user_id;
    let creator_name = creator.name;
    let last_updated_by = thing.last_updated_by;
    let last_updated_by_name = last_updated_by.name;
    let last_updated_by_url = "/users/" + last_updated_by.user_id;
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
              <Col
                md="3"
                className="d-none d-sm-block d-md-block d-lg-block d-xl-block sidepanel"
              >
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
              </Col>
              <Col md="6" xs="12" className="main-area">
                <div className="case-box">
                  <h3 className="category">
                    <FormattedMessage id={thing.type} />
                  </h3>
                  <h1 className="case-title">{thing.title}</h1>
                  <ul className="icons-mobile clearfix d-md-none d-lg-none d-xl-none">
                    <li>{bookmarkIcon}</li>
                    <li>
                      <FacebookShareButton
                        url={currentUrl}
                        quote={textFacebook}
                      >
                        <img src={caseIconFB} alt="" />
                      </FacebookShareButton>
                    </li>
                    <li>
                      <TwitterShareButton url={currentUrl} title={thing.title}>
                        <img src={caseIconTW} alt="" />
                      </TwitterShareButton>
                    </li>
                    <li>
                      <LinkedinShareButton
                        url={currentUrl}
                        description={textFacebook}
                        title={thing.title}
                      >
                        <img src={caseIconLN} alt="" />
                      </LinkedinShareButton>
                    </li>
                  </ul>
                  <Gallery thing={thing} />
                  <div className="mobile-metadata accordion d-md-none d-lg-none d-xl-none">
                    <AccordionTab titleId={thing.type + "_data"}>
                      <div className="content">{detailedBits}</div>
                    </AccordionTab>
                  </div>
                  <div className="authorship-details">
                    <p className="author-line">
                      First submitted by&nbsp;
                      <Link to={creator_url}>{creator_name}</Link>
                    </p>
                    <p className="date-line">
                      {thing.post_date ? (
                        <FormattedDate
                          value={thing.post_date}
                          year="numeric"
                          month="long"
                          day="2-digit"
                        />
                      ) : (
                        <span />
                      )}
                    </p>
                    <p className="author-line">
                      Most recent changes by&nbsp;
                      <Link to={last_updated_by_url}>
                        {last_updated_by_name}
                      </Link>
                    </p>
                    <p className="date-line">
                      {thing.updated_date ? (
                        <FormattedDate
                          value={thing.updated_date}
                          year="numeric"
                          month="long"
                          day="2-digit"
                        />
                      ) : (
                        <span />
                      )}
                    </p>
                  </div>
                  <div
                    className="case-html"
                    dangerouslySetInnerHTML={{ __html: thing.body }}
                  />
                </div>
              </Col>
              <Col
                md="3"
                className="case-tools d-none d-sm-block d-md-block d-lg-block d-xl-block"
              >
                <div className="top-icons">
                  {bookmarkIcon}
                  <FacebookShareButton url={currentUrl} quote={textFacebook}>
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
            <FloatingActionButton secondary={true} className="editButton">
              <ContentPencil />
            </FloatingActionButton>
          </Link>
        </div>
      </div>
    );
  }
}
