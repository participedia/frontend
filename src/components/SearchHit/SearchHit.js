import React, { PropTypes } from "react";
import { Link } from "react-router";
import "./SearchHit.css";
import { injectIntl, intlShape } from "react-intl";
import { Row, Col } from "reactstrap";
import moment from "moment";
import backgroundImage from "../../img/pp-thumbnail-1.jpg";

export class SearchHit extends React.Component {
  getInnerHTML() {
    return { __html: this.props.record._source.body_en };
  }

  render() {
    let result = this.props.record._source;
    let awsUrl = process.env.REACT_APP_ASSETS_URL;
    let pic = "";
    let otherImg = "";
    if (result.lead_image) {
      let comma = result.lead_image.search(",");
      pic = awsUrl + encodeURIComponent(result.lead_image.slice(9, comma - 1));
    }
    if (result.other_images) {
      let bracket = result.other_images.search("]");
      otherImg = awsUrl +
        encodeURIComponent(result.other_images.slice(2, bracket - 1));
    }
    let locale = this.props.intl.locale;
    let id = result.id;
    let type = result.type_;
    let title = type + ": " + result.title_en;
    let link = `/${locale}/${type}/${id}`;
    let firstSubmit = moment(result.post_date).format("dddd, MMMM Do YYYY");
    if (!title) {
      console.log("missing title: ", result);
    }
    let thumbnailStyle = { backgroundImageSrc: backgroundImage };
    let dateString = moment(result.updated_date).fromNow();
    let blob = (
      <Col md={this.props.selectedViewType === "grid" ? "4" : "12"}>
        {this.props.selectedViewType === "grid"
          ? <div className="grid-item">
              <Link to={link} className="result-title">
                {pic && pic.length > awsUrl.length
                  ? <div className="case-images">
                      <img role="presentation" src={pic} />
                    </div>
                  : otherImg && otherImg.length > awsUrl.length
                      ? <div className="case-images">
                          <img role="presentation" src={otherImg} />
                        </div>
                      : <div className="thumbnail" style={thumbnailStyle} />}
                <div className="result-title-text">{title}</div>
              </Link>
              <p className="result-author">
                {firstSubmit}
              </p>
              <p className="result-date">
                {dateString}
              </p>
            </div>
          : <Row className="list-item">
              <Col md="3">
                {pic && pic.length > awsUrl.length
                  ? <Link to={link}>
                      <div className="case-images">
                        <img role="presentation" src={pic} />
                      </div>
                    </Link>
                  : otherImg && otherImg.length > awsUrl.length
                      ? <Link to={link}>
                          <div className="case-images">
                            <img role="presentation" src={otherImg} />
                          </div>
                        </Link>
                      : <Link to={link}>
                          <div className="thumbnail" style={thumbnailStyle} />
                        </Link>}
              </Col>
              <Col md="6">
                <Link to={link}>
                  <div className="result-title-text">{title}</div>
                </Link>
                <p className="result-author">
                  {firstSubmit}
                </p>
                <p className="result-date">
                  {dateString}
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
