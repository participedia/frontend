import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./SearchHit.css";
import { injectIntl, intlShape } from "react-intl";
import { Row, Col } from "reactstrap";
import backgroundImage from "../../img/pp-thumbnail-1.jpg";
import TimeAgo from "react-timeago";

export class SearchHit extends React.Component {
  getInnerHTML() {
    return { __html: this.props.record.body };
  }
  render() {
    let result = this.props.record;
    let awsUrl = process.env.REACT_APP_ASSETS_URL;
    let pic = "";
    if (result.lead_image) {
      pic = awsUrl + encodeURIComponent(result.lead_image.url);
    } else if (result.other_images && result.other_images.length > 0) {
      pic = awsUrl + encodeURIComponent(result.other_images[0].url);
    }
    let id = result.id;
    let type = result.type;
    let title = result.title;
    let link = `/${type}/${id}`;
    let thumbnailClass = "thumbnail " + type;
    let thumbnailStyle = {
      backgroundImageSrc: backgroundImage
    };
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
                <small className="label">{result.type}</small>
              </Link>
              <div className="result-title-text">{title}</div>
              <Link to={link} className="result-title">
                <p className="result-date">
                  <TimeAgo date={result.updated_date} />
                </p>
              </Link>
            </div>
          : <Row className="list-item">
              <Col md="3">
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
              <Col md="6">
                <small className="label">{result.type}</small>
                <Link to={link}>
                  <div className="result-title-text">{title}</div>
                </Link>
                <p className="result-date">
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
