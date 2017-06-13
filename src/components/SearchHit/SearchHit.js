import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./SearchHit.css";
import { injectIntl, intlShape } from "react-intl";
import { Row, Col } from "reactstrap";
import backgroundImage from "../../img/pp-thumbnail-1.jpg";
import BookmarkToggle from "../BookmarkToggle";
import TimeAgo from "react-timeago";
import htmlToText from "html-to-text";

export class SearchHit extends React.Component {
  getInnerHTML() {
    return { __html: this.props.record.body };
  }
  render() {
    let result = this.props.record;
    let intl = this.props.intl;

    let awsUrl = process.env.REACT_APP_ASSETS_URL;
    let pic = "";
    if (result.lead_image.url) {
      pic = awsUrl + encodeURIComponent(result.lead_image.url);
    } else if (result.other_images && result.other_images.length > 0) {
      pic = awsUrl + encodeURIComponent(result.other_images[0].url);
    }
    let id = result.id;
    let type = result.type;
    let title = result.title;
    let body = htmlToText.fromString(result.body).substring(0, 200) + "...";
    let isAuthenticated = this.props.isAuthenticated;
    let link = `/${type}/${id}`;
    let thumbnailClass = "thumbnail " + type;
    let thumbnailStyle = {
      backgroundImageSrc: backgroundImage
    };
    let bookmarked = isAuthenticated && result.bookmarked;
    let bookmarkIcon = (
      <BookmarkToggle thingType="case" thingid={id} bookmarked={bookmarked} />
    );
    let blob = (
      <Col md={this.props.selectedViewType === "grid" ? "4" : "12"}>
        {this.props.selectedViewType === "grid"
          ? <div className="grid-item">
              <Link to={link} className="result-title">
                {pic
                  ? <div className="case-images">
                      <img alt="" src={pic} />
                    </div>
                  : <div className={thumbnailClass} style={thumbnailStyle} />}
              </Link>
              <small className="label">
                {(result.featured
                  ? intl.formatMessage({ id: "featured" }) + " "
                  : "") + result.type}
              </small>
              {bookmarkIcon}
              <Link to={link} className="result-title">
                <div className="result-title-text">{title}</div>
              </Link>
              <p>
                <TimeAgo date={result.updated_date} />
              </p>
            </div>
          : <Row className="list-item">
              <Col md="3" className="pt-1">
                {pic
                  ? <Link to={link}>
                      <div className="case-images">
                        <img alt="" src={pic} />
                      </div>
                    </Link>
                  : <Link to={link}>
                      <div className={thumbnailClass} style={thumbnailStyle} />
                    </Link>}
              </Col>
              <Col md="8" className="pt-1">
                <small className="label">
                  {(result.featured
                    ? intl.formatMessage({ id: "featured" }) + " "
                    : "") + result.type}
                </small>
                {bookmarkIcon}
                <Link to={link}>
                  <div className="result-title-text">{title}</div>
                </Link>
                <div>{body}</div>
                <p>
                  <TimeAgo date={result.updated_date} />
                </p>
              </Col>
              <div className="separator" />
            </Row>}
      </Col>
    );
    return blob;
  }
}

SearchHit.propTypes = {
  record: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(SearchHit);
