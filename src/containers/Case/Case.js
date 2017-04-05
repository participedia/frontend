import React from "react";
import "./Case.css";
import { injectIntl, intlShape } from "react-intl";
import { Link } from "react-router";
import api from "../../utils/api";
import moment from "moment";
import { Container, Row, Col } from "reactstrap";
import CountryMap from "../../components/CountryMap";
import ItemGallery from "./ItemGallery";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentPencil from "material-ui/svg-icons/image/edit";
import caseIconBookmark from "../../img/pp-case-icon-bookmark.svg";
import caseIconSettings from "../../img/pp-case-icon-settings.svg";
import caseIconFB from "../../img/pp-case-icon-fb.svg";
import caseIconTW from "../../img/pp-case-icon-tw.svg";
import caseIconShare from "../../img/pp-case-icon-share.svg";

class SearchLink extends React.Component {
  render() {
    let tag = this.props.tag;
    let value = this.props.value;
    let locale = this.props.locale;
    if (tag && value && locale) {
      let mapping = {};
      mapping[tag] = value;
      return (
        <Link
          to={{
            pathname: "/" + locale + "/search",
            query: mapping
          }}
        >
          {value}
        </Link>
      );
    } else {
      return <div>None specified</div>; // L10N
    }
  }
}
export class Case extends React.Component {
  componentWillMount() {
    let component = this;
    api.fetchCaseById(this.props.params.nodeID).then(function(the_case) {
      component.setState({ data: the_case, htmlBody: the_case.body });
    });
  }

  getInnerHTML() {
    let input = "";
    if (this.state && this.state.htmlBody) {
      input = this.state.htmlBody;
    }
    return { __html: input };
  }

  render() {
    if (this.state && this.state.data) {
      const locale = this.props.intl.locale;
      let intl = this.props.intl;
      let caseObject = this.state.data;
      let issue = caseObject.issue;
      let audience = (
        <SearchLink
          locale={locale}
          tag="communication_with_audience"
          value={caseObject.communication_with_audience}
        />
      );
      let tags = <div />;
      if (caseObject.tags) {
        tags = caseObject.tags.map(tag => (
          <SearchLink key={tag} locale={locale} tag="tag" value={tag} />
        ));
      }
      let communication_mode = (
        <SearchLink
          locale={locale}
          tag="communication_mode"
          value={caseObject.communication_mode}
        />
      );
      let decision_method = (
        <SearchLink
          locale={locale}
          tag="decision_method"
          value={caseObject.decision_method}
        />
      );
      let facetoface = caseObject.facetoface_online_or_both;
      if (!facetoface) {
        facetoface = "facetoface_not_specified";
      } else {
        facetoface = "facetoface_" + facetoface;
      }
      facetoface = intl.formatMessage({ id: facetoface });
      facetoface = (
        <SearchLink
          locale={locale}
          tag="facetoface_online_or_both"
          value={facetoface}
        />
      );

      let facilitated = intl.formatMessage({ id: caseObject.facilitated });
      facilitated = (
        <SearchLink locale={locale} tag="facilitated" value={facilitated} />
      );

      let voting = intl.formatMessage({ id: caseObject.voting });
      voting = <SearchLink locale={locale} tag="voting" value={voting} />;

      let numberDays = caseObject.number_of_meeting_days;
      numberDays = (
        <SearchLink
          locale={locale}
          tag="number_of_meeting_days"
          value={numberDays}
        />
      );

      let post_date = moment(caseObject.post_date).format("LL");
      let updated_date = moment(caseObject.updated_date).format("LL");
      let first_author = caseObject.authors[0];
      let first_author_url = "/" + locale + "/users/" + first_author.user_id;
      let first_author_name = first_author.name;
      let last_author = caseObject.authors.slice(-1)[0];
      let last_author_name = last_author.name;
      let last_author_url = "/" + locale + "/users/" + last_author.user_id;
      let id = this.props.params.nodeID;
      let editLinkUrl = `/${locale}/case/${id}/edit`;
      let awsUrl = process.env.REACT_APP_ASSETS_URL;
      let theLength = "";
      let pics = [];
      if (caseObject && caseObject.lead_image) {
        pics.push(awsUrl + encodeURIComponent(caseObject.lead_image.url));
      }
      if (caseObject && caseObject.other_images.length) {
        theLength = caseObject.other_images;
        Object.keys(theLength).forEach(function(key) {
          let obj = theLength[key];
          pics.push(awsUrl + encodeURIComponent(obj.url));
        });
      }

      return (
        <div>
          <div className="main-contents">
            <Container className="detailed-case-component" fluid={true}>
              <Row>
                <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down">
                  <CountryMap
                    city={caseObject.location.city}
                    countrycode={caseObject.location.country}
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
                  <p className="sub-heading">
                    Related Content
                  </p>
                  <div className="related-content">
                    <a href="#">Cases</a>
                    <a href="#">Methods</a>
                    <a href="#">Surveys</a>
                    <a href="#">Datasets</a>
                  </div>
                </Col>
                <Col md="8" xs="12" className="main-area">
                  <div className="case-box">
                    <h2 className="category">
                      Case
                    </h2>
                    <h2 className="case-title">
                      {caseObject.title}
                    </h2>
                    <ItemGallery items={pics} />
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
                      dangerouslySetInnerHTML={{ __html: caseObject.body }}
                    />
                  </div>
                </Col>
                <Col md="1" className="case-tools hidden-sm-down">
                  <div className="top-icons">
                    <a href="#"><img src={caseIconBookmark} alt="" /></a>
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

export default injectIntl(Case);
