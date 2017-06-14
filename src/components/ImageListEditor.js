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
    this.deleteLead = this.deleteLead.bind(this);
    this.state = {
      lead: "",
      newImg: false,
      delImg: false,
      images: props.value
    };
  }

  makeLead(src) {
    // this.setState({ lead: src });
  }

  handleNewImg(img) {
    let images = this.state.images;
    images.push(img); // or do we just want URLs?
    this.setState({ images });

    // console.log("img", img, "this.props", this.props);

    // if (this.props.thing.lead_image) {
    //   if (this.props.thing.other_images) {
    //     let currentImgs = this.props.thing.other_images.length;
    //     this.props.thing.other_images[currentImgs] = { url: img };
    //   }
    // } else {
    //   this.props.thing.lead_image = { url: img };
    // }
    // this.setState({ newImg: true });
    this.props.onChange(images);
    // this.setState({ lead_image: { src: img } });
  }

  deleteImg(photo) {
    this.setState({ delImg: true });
    let currentImgs = this.props.thing.other_images;
    let awsUrl = process.env.REACT_APP_ASSETS_URL;
    let index = Object.keys(currentImgs).find(
      key =>
        awsUrl + currentImgs[key]["url"] === photo ||
        currentImgs[key]["url"] === photo
    );
    if (index) {
      this.props.thing.other_images.splice(index, 1);
    }
  }

  deleteLead(photo) {
    this.setState({ delImg: true });
    let currentImgs = this.props.thing.other_images;
    this.props.thing.lead_image = null;
    if (currentImgs.length > 0) {
      this.setState({ lead: currentImgs[0]["url"] });
    }
  }

  render() {
    // don't use the CDN as it won't be there yet.
    const awsUrl = process.env.REACT_APP_UPLOADS_S3_BUCKET;
    let images = this.state.images;
    // let thing = this.props.thing;
    console.log("this", this);
    let urls = images.map(function(img) {
      if (img.substring(0, 4) === "blob") {
        return img;
      } else {
        return awsUrl + encodeURIComponent(img);
      }
    });
    console.log("URLs", urls);
    let bits = urls.map((photo, id) =>
      <Col key={id} sm="6" md="3">
        <div className={id === 0 ? "box lead" : "box"}>
          <div className="checkbox" onClick={this.makeLead.bind(this, photo)} />
          <div className="trash" onClick={this.deleteImg.bind(this, photo)} />
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
    let { property, intl } = this.props;
    return (
      <Field
        fieldName={property}
        id={property}
        name={property}
        label={intl.formatMessage({ id: property })}
        type={ImageListEditorField}
      />
    );
  }
}
