import React from "react";
import { Link } from "react-router";
import { Container, Row, Col } from "reactstrap";
import RelatedContent from "../RelatedContent";
import Gallery from "../Gallery";
import BookmarkToggle from "../BookmarkToggle";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentPencil from "material-ui/svg-icons/image/edit";
import caseIconSettings from "../../img/pp-case-icon-settings.svg";
import caseIconFB from "../../img/pp-case-icon-fb.svg";
import caseIconTW from "../../img/pp-case-icon-tw.svg";
import caseIconShare from "../../img/pp-case-icon-share.svg";
import "./ItemDetails.css";
import TimeAgo from "react-timeago";

export default class ItemDetails extends React.Component {
  componentWillMount() {
    let component = this;
    let isAuthenticated = this.props.isAuthenticated;
    this.props.api(this.props.id).then(function(data) {
      component.setState({
        data: data,
        isAuthenticated: isAuthenticated
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.isAuthenticated
    });
  }

  render() {
    if (this.state && this.state.data) {
      const locale = this.props.intl.locale;
      const isAuthenticated = this.props.isAuthenticated;
      let intl = this.props.intl;
      let thing = this.state.data;
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

      let first_author = thing.authors[0];
      let first_author_url = "/" + locale + "/users/" + first_author.user_id;
      let first_author_name = first_author.name;
      let last_author = thing.authors.slice(-1)[0];
      let last_author_name = last_author.name;
      let last_author_url = "/" + locale + "/users/" + last_author.user_id;
      let id = this.props.id;
      let type = thing.type;
      let editLinkUrl = `/${locale}/${type}/${id}/edit`;
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
                    <Gallery thing={thing} />
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
                    <a href="#"><img src={caseIconFB} alt="" /></a>
                    <a href="#"><img src={caseIconTW} alt="" /></a>
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
    } else {
      return <div />;
    }
  }
}
