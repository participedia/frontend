import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import RelatedContent from "../RelatedContent";
import Gallery from "../Gallery";
import ReactPlayer from 'react-player'
import BookmarkToggle from "../BookmarkToggle";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentPencil from "material-ui/svg-icons/image/edit";
import caseIconSettings from "../../img/pp-case-icon-settings.svg";
import caseIconFB from "../../img/pp-case-icon-fb.svg";
import caseIconTW from "../../img/pp-case-icon-tw.svg";
import caseIconShare from "../../img/pp-case-icon-share.svg";
import { ShareButtons } from "react-share";
import htmlToText from "html-to-text";
import "./ItemDetails.css";
import TimeAgo from "react-timeago";

export default class ItemDetails extends React.Component {
  render() {
    const { FacebookShareButton, TwitterShareButton } = ShareButtons;
    const isAuthenticated = this.props.isAuthenticated;
    let intl = this.props.intl;
    let thing = this.props.data;
    let bookmarked = isAuthenticated && thing.bookmarked;
    let bookmarkIcon = <div />;
    if (isAuthenticated) {
      bookmarkIcon = (
        <BookmarkToggle
          thingType="case"
          thingID={thing.id}
          bookmarked={bookmarked}
        />
      );
    }
    let bodyText = htmlToText.fromString(thing.body);
    let currentUrl = "https://participedia.xyz" +  this.props.location.pathname;
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
          <Container className="detailed-case-component" fluid={true}>
            <Row>
              <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down">
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
                  { thing.vidURL ?
                  <Row>
                    <Col className="vid-container" md="6"><ReactPlayer width="100%"  controls={true} url={thing.vidURL} /></Col>
                    <Col md="6"><Gallery thing={thing} /></Col>
                  </Row>
                  :
                  <Gallery thing={thing} />
                  }
                  <div className="authorship-details">
                    <p className="author-line">
                      First submitted by&nbsp;
                      <Link to={first_author_url}>
                        {first_author_name}
                      </Link>
                    </p>
                    <p className="date-line">
                      <TimeAgo date={thing.post_date} />
                    </p>
                    <p className="author-line">
                      Most recent changes by&nbsp;
                      <Link to={last_author_url}>
                        {last_author_name}
                      </Link>
                    </p>
                    <p className="date-line">
                      <TimeAgo date={thing.updated_date} />
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
                  <a href="#"><img src={caseIconSettings} alt="" /></a>
                  <FacebookShareButton
                    url={currentUrl}
                    title={thing.title}
                    description={textFacebook}
                    picture={lead}
                  >
                    <img src={caseIconFB} alt="" />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={currentUrl}
                    title={thing.title}
                  >
                    <img src={caseIconTW} alt="" />
                  </TwitterShareButton>
                  <a href="#"><img src={caseIconShare} alt="" /></a>
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
