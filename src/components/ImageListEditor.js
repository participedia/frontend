import React, { Component } from "react";
import { Field } from "simple-react-form";
import { Row, Col } from "reactstrap";
import Upload from "../Upload";
import authService from "../utils/AuthService";

class ImageListEditorField extends Component {
  constructor(props) {
    super(props);
    this.makeLead = this.makeLead.bind(this);
    this.handleNewImg = this.handleNewImg.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.state = {
      images: props.value
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      images: props.value
    });
  }

  makeLead(img) {
    let src = img.url;
    // our convention is that the first image is the lead image
    let images = this.state.images;
    images = images.filter(x => x.url !== src);
    images.unshift(img);
    this.setState({ images });
    this.props.onChange(images);
  }

  handleNewImg(img) {
    let images = this.state.images || [];
    images.push({ url: img });
    this.setState({ images });
    this.props.onChange(images);
  }

  deleteImg(img) {
    let images = this.state.images;
    images = images.filter(x => x.url !== img.url);
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
        if (img.url) {
          url = img.url;
        } else {
          url = img.src;
        }
        if (url.substring(0, 4) === "blob") {
          return url;
        } else {
          return awsUrl + encodeURIComponent(url);
        }
      });
    }
    let bits = urls.map((photo, id) =>
      <Col key={id} sm="6" md="3" className="pb-1">
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
            src={photo}
          />
          {this.state.lead === photo ? <small>Lead Image</small> : undefined}
        </div>
      </Col>
    );
    return (
      <Row className="itemPics">
        {bits}
        <Col md="3">
          <Upload auth={authService} itemEdit addToList={this.handleNewImg} />
        </Col>
      </Row>
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
