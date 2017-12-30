import React, { Component } from "react";
import { Field } from "simple-react-form";
import { Row, Col } from "reactstrap";
import Upload from "../Upload";
import authService from "../utils/AuthService";
import { FormattedMessage } from "react-intl";

class FileListEditorField extends Component {
  constructor(props) {
    super(props);
    // this.makeLead = this.makeLead.bind(this);
    this.handleNewImg = this.handleNewImg.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    let files = props.value;
    this.state = {
      files
    };
  }
  componentWillReceiveProps(props) {
    let files = props.value;
    files = files.filter(function(img) {
      if (!img) return false;
      if (!img.length && img.src === "") return false;
      return true;
    });
    this.setState({
      files
    });
  }

  // makeLead(img) {
  //   // our convention is that the first image is the lead image
  //   let files = this.state.files;
  //   let index = files.indexOf(img);
  //   files.splice(index, 1);
  //   files.unshift(img);
  //   this.setState({ files });
  //   this.props.onChange(files);
  // }

  handleNewImg(img) {
    let files = this.state.files || [];
    files.push(img);
    this.setState({ files });
    this.props.onChange(files);
  }

  deleteImg(img) {
    let files = this.state.files;
    files.splice(files.indexOf(img), 1);
    this.setState({ files });
    this.props.onChange(files);
  }

  render() {
    // don't use the CDN as it won't be there yet.
    const awsUrl = process.env.REACT_APP_UPLOADS_S3_BUCKET;
    let files = this.state.files;
    let urls = [];
    if (files) {
      urls = files.map(function(img) {
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
          // return awsUrl + encodeURIComponent(url);
          return encodeURIComponent(url);
        }
      });
    }
    let bits = urls.map((photo, id) => (
      <div className="file">
        <div
          className="trash"
          onClick={this.deleteImg.bind(this, files[id])}
        />
        <span>{photo}</span>
      </div>
    ));
    return (
      <div>
        <p className="explanatory-text"><FormattedMessage id="files_instructional" /></p> 
        <Row className="itemPics">{bits}</Row>
        <Upload auth={authService} uploaderType="files" itemEdit addToList={this.handleNewImg} />
      </div>
    );
  }
}

export default class FileListEditor extends Component {
  render() {
    let { property } = this.props;
    return (
      <Field
        fieldName={property}
        id={property}
        name={property}
        type={FileListEditorField}
      />
    );
  }
}
