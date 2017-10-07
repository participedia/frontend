import React from "react";
import auth from "../../utils/AuthService";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import RelatedContent from "../RelatedContent";
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
import CountryMap from "../CountryMap";
import Joyride from 'react-joyride';
// import "../../StaticPages.css";

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
  authors: [
    {
      name: "author name"
    }
  ]
};

export default class ItemDetails extends React.Component {
  constructor(props, context) {
    super(props);
    this.context = context;
    this.state = { 
      joyrideOverlay: true,
      joyrideType: 'continuous',
      isRunning: true,
      stepIndex: 0,
      steps: [],
      selector: '',
    };
    this.setState = this.setState.bind(this);
    this.callback = this.callback.bind(this);
    this.next = this.next.bind(this);
  }


  next() {
    this.joyride.next();
  }

  callback(data) {
    if (data.type === 'step:before') {
      localStorage.setItem('tutorial-was-shown', true);
    }

    this.setState({
      selector: data.type === 'tooltip:before' ? data.step.selector : '',
    });
  }

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
    let first_author = thing.authors[0];
    let first_author_url = "/users/" + first_author.user_id;
    let first_author_name = first_author.name;
    let last_author = thing.authors.slice(-1)[0];
    let last_author_name = last_author.name;
    let last_author_url = "/users/" + last_author.user_id;
    let id = this.props.id;
    let type = thing.type;
    let editLinkUrl = `/${type}/${id}/edit`;
    console.log(this.props.details, 'ROPS')
    let detailedBits = React.createElement(this.props.details, {
      case: thing,
      intl
    });
    const {
      isRunning,
      joyrideOverlay,
      joyrideType,
      selector,
      stepIndex,
    } = this.state;
    let steps;
    const stepsAll = [
      {
        title: 'Edit',
        text: 'Edit any case, method or organization if you have data or new information to contribute.',
        selector: '.editButton0',
        position: 'top',
        isFixed: true,
        type: 'hover',
      },
      {
        title: 'Related Content',
        selector: '.related-content',
        text: 'See what other cases, methods or organizations on Participedia are directly related to this particular case.',
        position: 'top',
        type: 'hover',
      },
      {
        title: 'Data',
        selector: '.details',
        text: 'See what data has been entered about this ' + type + '.',
        position: 'top',
        type: 'hover',
      },
    ];
    const stepsNoRelated = [
      {
        title: 'Edit',
        text: 'Edit any case, method or organization if you have data or new information to contribute.',
        selector: '.editButton0',
        position: 'top',
        isFixed: true,
        type: 'hover',
      },
      {
        title: 'Data',
        selector: '.details',
        text: 'See what data has been entered about this ' + type + '.',
        position: 'top',
        type: 'hover',
      },
    ];
    (thing.related_cases && thing.related_cases.length) ||
    (thing.related_methods && thing.related_methods.length) ||
    (thing.related_organizations && thing.related_organizations.length) ?
      steps = stepsAll 
    : 
      steps = stepsNoRelated
    // XXX L10N -- lots of strings to extract.
    return (
      <div>
        <Joyride
          ref={c => (this.joyride = c)}
          callback={this.callback}
          debug={false}
          disableOverlay={selector === '.card-tickets'}
          allowClicksThruHole={true}
          locale={{
            back: (<span>Back</span>),
            close: (<span>Close</span>),
            last: (<span>Last</span>),
            next: (<span>Next</span>),
            skip: (<span>Skip</span>),
          }}
          run={isRunning}
          showOverlay={joyrideOverlay}
          showSkipButton={true}
          showStepsProgress={true}
          stepIndex={stepIndex}
          steps={steps}
          type={joyrideType}
        />
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
                  {thing.location ? (
                    <CountryMap
                      city={thing.location.city}
                      countrycode={thing.location.country}
                    />
                  ) : (
                    <div />
                  )}
                  <RelatedContent className="related-content" thing={thing} />
                  {detailedBits}
                </Col>
                <Col md="8" xs="12" className="main-area">
                  <div className="case-box">
                    <h2 className="category">
                      <FormattedMessage id={thing.type} />
                    </h2>
                    <h2 className="case-title">{thing.title}</h2>
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
                      <AccordionTab titleId="related_content">
                        <div className="content">
                          <RelatedContent thing={thing} />
                        </div>
                      </AccordionTab>
                      <AccordionTab titleId={thing.type + "_data"}>
                        <div className="content">{detailedBits}</div>
                      </AccordionTab>
                    </div>
                    <div className="authorship-details">
                      <p className="author-line">
                        First submitted by&nbsp;
                        <Link to={first_author_url}>{first_author_name}</Link>
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
                        <Link to={last_author_url}>{last_author_name}</Link>
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
                  md="1"
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
            <div className="editButton">
              <Link to={editLinkUrl}>
                <FloatingActionButton className="editButton0">
                  <ContentPencil />
                </FloatingActionButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
