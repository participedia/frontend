import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Upload from "../Upload";

class ImageListEditor extends Component {
  constructor(props) {
    super(props);
    this.makeLead = this.makeLead.bind(this);
    this.handleNewImg = this.handleNewImg.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.deleteLead = this.deleteLead.bind(this);
    this.state = {
      lead: "",
      newImg: false,
      delImg: false
    };
  }

  makeLead(src) {
    this.setState({ lead: src });
  }

  handleNewImg(img) {
    this.setState({ newImg: true });
    let currentImgs = this.props.thing.other_images.length;
    this.props.thing.other_images[currentImgs] = { url: img };
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
    const awsUrl = process.env.REACT_APP_ASSETS_URL;
    let leadImg = "";
    let otherImgs = [];
    let thing = this.props.thing;
    if (thing && thing.lead_image) {
      leadImg = awsUrl + encodeURIComponent(thing.lead_image.url);
    }
    if (thing && thing.other_images) {
      Object.keys(thing.other_images).forEach(function(key) {
        let obj = thing.other_images[key];
        if (obj.url.substring(0, 4) === "blob") {
          otherImgs.push(obj.url);
        } else {
          otherImgs.push(awsUrl + encodeURIComponent(obj.url));
        }
      });
    }
    return (
      <Row className="itemPics">
        {leadImg
          ? <Col sm="6" md="3">
              <div
                className={
                  this.state.lead === leadImg || this.state.lead === ""
                    ? "box lead"
                    : "box"
                }
              >
                <div
                  className="checkbox"
                  onClick={this.makeLead.bind(this, leadImg)}
                />
                <div
                  className="trash"
                  onClick={this.deleteLead.bind(this, leadImg)}
                />
                <img className="img-fluid" alt="" src={leadImg} />
                {this.state.lead === leadImg || this.state.lead === ""
                  ? <small>Lead Image</small>
                  : undefined}
              </div>
            </Col>
          : undefined}
        {otherImgs
          ? otherImgs.map((photo, id) => (
              <Col key={id} sm="6" md="3">
                <div className={this.state.lead === photo ? "box lead" : "box"}>
                  <div
                    className="checkbox"
                    onClick={this.makeLead.bind(this, photo)}
                  />
                  <div
                    className="trash"
                    onClick={this.deleteImg.bind(this, photo)}
                  />
                  <img key={id} alt="" className="img-fluid" src={photo} />
                  {this.state.lead === photo
                    ? <small>Lead Image</small>
                    : undefined}
                </div>
              </Col>
            ))
          : undefined}
        <Col md="3">
          <Upload
            auth={this.props.auth}
            itemEdit={true}
            addToList={this.handleNewImg}
          />
        </Col>
      </Row>
    );
  }
}

export default ImageListEditor;
