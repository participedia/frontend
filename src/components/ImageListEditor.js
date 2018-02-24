import React, { Component } from "react";
import { Field } from "simple-react-form";
import { Row, Col } from "reactstrap";
import Upload from "../Upload";
import authService from "../utils/AuthService";
import { FormattedMessage } from "react-intl";

class ImageListEditorField extends Component {
  constructor(props) {
    super(props);
    this.makeLead = this.makeLead.bind(this);
    this.handleNewImg = this.handleNewImg.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    let images = props.value;
    this.state = {
      images
    };
  }
  componentWillReceiveProps(props) {
    let images = props.value;
    images = images.filter(function(img) {
      if (!img) return false;
      if (!img.length && img.src === "") return false;
      return true;
    });
    this.setState({
      images
    });
  }

  makeLead(img) {
    // our convention is that the first image is the lead image
    let images = this.state.images;
    let index = images.indexOf(img);
    images.splice(index, 1);
    images.unshift(img);
    this.setState({ images });
    this.props.onChange(images);
  }

  handleNewImg(img) {
    let images = this.state.images || [];
    images.push(img);
    this.setState({ images });
    this.props.onChange(images);
  }

  deleteImg(img) {
    let images = this.state.images;
    images.splice(images.indexOf(img), 1);
    this.setState({ images });
    this.props.onChange(images);
  }

  render() {
    // don't use the CDN as it won't be there yet.
    const awsUrl = process.env.REACT_APP_UPLOADS_S3_BUCKET;
    let images = this.state.images;
    let urls = [];
    if (images) {
      urls = images.map(function(img) {
        let url;
        if (typeof img === "string") {
          url = img;
        } else {
          url = img.src;
        }
        if (!url) return "";
        if (url.substring(0, 4) === "blob") {
          return url;
        } else {
          return awsUrl + encodeURIComponent(url);
        }
      });
    }
    let bits = urls.map((image, id) => (
      <Col key={id} xs="12" md="6" lg="4" className="pl-0 box-container">
        <div className={id === 0 ? "box lead" : "box"}>
          <div
            className="checkbox"
            onClick={this.makeLead.bind(this, images[id])}
          />
          <div
            className="trash"
            onClick={this.deleteImg.bind(this, images[id])}
          />
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            key={id}
            alt=""
            className="img-fluid"
            src={image}
          />
          {this.state.lead === image ? <small>Lead Image</small> : undefined}
        </div>
      </Col>
    ));
    return (
      <div>
        <Row className="itemPics">{bits}</Row>
        <p className="explanatory-text">
          <FormattedMessage id="images_instructional" />
        </p>
        <Upload auth={authService} itemEdit addToList={this.handleNewImg} />
      </div>
    );
  }
}

export default class ImageListEditor extends Component {
  render() {
    let { property } = this.props;
    return (
      <Field
        fieldName={property}
        id={property}
        name={property}
        type={ImageListEditorField}
      />
    );
  }
}
