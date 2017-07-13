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
    let images = props.value;
    this.state = {
      images
    };
  }
  componentWillReceiveProps(props) {
    let images = props.value;
    images = images.filter(function(img) {
      if (!img) return false;
      if (!img.length && img.src == "") return false;
      return true;
    });
    this.setState({
      images
    });
  }

  makeLead(img) {
    let src = img;
    // our convention is that the first image is the lead image
    let images = this.state.images;
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
        <Col md="12" className="p-0">
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
