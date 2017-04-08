import React from "react";
import { connect } from "react-redux";
import "./Case.css";
import { injectIntl, intlShape } from "react-intl";
import { Link } from "react-router";
import api from "../../utils/api";
import moment from "moment";
import { Container, Row, Col } from "reactstrap";
import CountryMap from "../../components/CountryMap";
import SearchLink from "../../components/SearchLink";
import RelatedContent from "../../components/RelatedContent";
import Gallery from "../../components/Gallery";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentPencil from "material-ui/svg-icons/image/edit";
import BookmarkToggle from "../../components/BookmarkToggle";
import caseIconSettings from "../../img/pp-case-icon-settings.svg";
import caseIconFB from "../../img/pp-case-icon-fb.svg";
import caseIconTW from "../../img/pp-case-icon-tw.svg";
import caseIconShare from "../../img/pp-case-icon-share.svg";

function mapStateToProps({ auth }) {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated
  };
}

export class Case extends React.Component {
  componentWillMount() {
    let component = this;
    let isAuthenticated = this.props.isAuthenticated;
    api.fetchCaseById(this.props.params.nodeID).then(function(data) {
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
      let issue = thing.issue;
      let audience = (
        <SearchLink
          intl={intl}
          tag="communication_with_audience"
          value={thing.communication_with_audience}
        />
      );
      let tags = <div />;
      if (thing.tags) {
        tags = thing.tags.map(tag => (
          <SearchLink intl={intl} key={tag} tag="tag" value={tag} />
        ));
      }
      let communication_mode = (
        <SearchLink
          intl={intl}
          tag="communication_mode"
          value={thing.communication_mode}
        />
      );
      let decision_method = (
        <SearchLink
          intl={intl}
          tag="decision_method"
          value={thing.decision_method}
        />
      );
      let facetoface = thing.facetoface_online_or_both;
      if (!facetoface) {
        facetoface = "facetoface_not_specified";
      } else {
        facetoface = "facetoface_" + facetoface;
      }
      facetoface = intl.formatMessage({ id: facetoface });
      facetoface = (
        <SearchLink
          intl={intl}
          tag="facetoface_online_or_both"
          value={facetoface}
        />
      );

      let facilitated = String(thing.facilitated);
      if (facilitated === "null") facilitated = "not_specified";
      if (facilitated) facilitated = facilitated.toLowerCase();
      if (facilitated)
        facilitated = intl.formatMessage({
          id: facilitated
        });
      facilitated = (
        <SearchLink intl={intl} tag="facilitated" value={facilitated} />
      );

      let voting = intl.formatMessage({ id: thing.voting });
      voting = <SearchLink intl={intl} tag="voting" value={voting} />;

      let numberDays = thing.number_of_meeting_days;
      numberDays = (
        <SearchLink
          intl={intl}
          tag="number_of_meeting_days"
          value={numberDays}
        />
      );

      let post_date = moment(thing.post_date).format("LL");
      let updated_date = moment(thing.updated_date).format("LL");
      let first_author = thing.authors[0];
      let first_author_url = "/" + locale + "/users/" + first_author.user_id;
      let first_author_name = first_author.name;
      let last_author = thing.authors.slice(-1)[0];
      let last_author_name = last_author.name;
      let last_author_url = "/" + locale + "/users/" + last_author.user_id;
      let id = this.props.params.nodeID;
      let editLinkUrl = `/${locale}/case/${id}/edit`;

      // XXX L10N -- lots of strings to extract.
      return (
        <div>
          <div className="main-contents">
            <Container className="detailed-case-component" fluid={true}>
              <Row>
                <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down">
                  <CountryMap
                    city={thing.location.city}
                    countrycode={thing.location.country}
                  />
                  <p className="sub-heading">
                    Keywords
                  </p>
                  <p className="sub-sub-heading">
                    Tags:
                  </p>
                  <div className="tags">
                    {tags}
                  </div>
                  <p className="sub-sub-heading">
                    Specific Topic:
                  </p>
                  <div className="tags">
                    {issue}
                  </div>
                  <p className="sub-sub-heading">
                    Communication Mode:
                  </p>
                  <div className="tags">
                    {communication_mode}
                  </div>
                  <p className="sub-sub-heading">
                    Communication with audience:
                  </p>
                  <div className="tags">
                    {audience}
                  </div>
                  <p className="sub-sub-heading">
                    Decision Method:
                  </p>
                  <div className="tags">
                    {decision_method}
                  </div>
                  <p className="sub-sub-heading">
                    Face to face, online, or both:
                  </p>
                  <div className="tags">
                    {facetoface}
                  </div>
                  <p className="sub-sub-heading">
                    Facilitated:
                  </p>
                  <div className="tags">
                    {facilitated}
                  </div>
                  <p className="sub-sub-heading">
                    Voting:
                  </p>
                  <div className="tags">
                    {voting}
                  </div>
                  <p className="sub-sub-heading">
                    Number of meeting Days:
                  </p>
                  <div className="tags">
                    {numberDays}
                  </div>
                  <RelatedContent thing={thing} intl={intl} />
                </Col>
                <Col md="8" xs="12" className="main-area">
                  <div className="case-box">
                    <h2 className="category">
                      Case
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
                        {post_date}
                      </p>
                      <p className="author-line">
                        Most recent changes by&nbsp;
                        <Link to={last_author_url}>
                          {last_author_name}
                        </Link>
                      </p>
                      <p className="date-line">
                        {updated_date}
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

Case.propTypes = {
  intl: intlShape.isRequired
};

export default connect(mapStateToProps)(injectIntl(Case));
