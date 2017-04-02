import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import { Form, Text } from "react-form";
import Geosuggest from "react-geosuggest";
import "./CaseEditor.css";
import { Container, Row, Col } from "reactstrap";
import ReactQuill from "react-quill";
import Upload from "../../Upload";
import AutoComplete from "material-ui/AutoComplete";
import "../GeoSuggest/GeoSuggest.css";
import "../../quill.core.css";
import "../../quill.snow.css";

let BodyEditor = React.createClass({
  _quillModules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ]
    /* ... other modules */
  },

  _quillFormats: [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ],

  render: function() {
    return (
      <div className="_quill">
        <ReactQuill
          theme="snow"
          modules={this._quillModules}
          formats={this._quillFormats}
          bounds={"._quill"}
        >
          <div
            key="editor"
            ref="editor"
            className="quill-contents border_solid_top"
            dangerouslySetInnerHTML={{ __html: this.props.value }}
          />
        </ReactQuill>
      </div>
    );
  }
});

class _CaseEditor extends Component {
  constructor(props) {
    super(props);
    this.makeLead = this.makeLead.bind(this);
    this.handleNewImg = this.handleNewImg.bind(this);
    this.deleteImg = this.deleteNewImg.bind(this);
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
    let currentImgs = this.props.case.other_images.length
    this.props.case.other_images[currentImgs] = {url:img};
  }

  deleteNewImg(photo) {
    this.setState({ delImg: true });
    // Is this img from otherImgs or lead? Is it from the DB or newly uploaded?
    let currentImgs = this.props.case.other_images
    let index = Object.keys(currentImgs).find(key => 'http://assets.participedia.xyz.s3-website-us-east-1.amazonaws.com/' + currentImgs[key]['url'] === photo);
    console.log(index, 'index')
    if (index) {
      this.props.case.other_images.splice(index,1)
    }
  }


  render() {
    const { onSubmit } = this.props;
    const caseObject = this.props.case;
    let awsUrl = process.env.REACT_APP_ASSETS_URL;
    let leadImg = "";
    let otherImgs = [];
    if (caseObject && caseObject.lead_image) {
      leadImg = awsUrl + encodeURIComponent(caseObject.lead_image.url);
    }
    if (caseObject && caseObject.other_images) {
      Object.keys(caseObject.other_images).forEach(function(key) {
        let obj = caseObject.other_images[key];
        if ((obj.url).substring(0,4) === 'blob') {
          otherImgs.push(obj.url);
        } else {
          otherImgs.push(awsUrl + encodeURIComponent(obj.url));
        }
      });
    }

    if (!caseObject) {
      return <div>Loading...</div>;
    }

    return (
      <Form onSubmit={onSubmit} defaultValues={caseObject}>
        {({ submitForm }) => {
          return (
            <form onSubmit={submitForm}>
              <div className="main-contents">
                <Container className="detailed-case-component" fluid={true}>
                  <Col
                    md="3"
                    className="hidden-sm-down sidepanel hidden-sm-down"
                  >
                    <div className="case-location">
                      <p className="sub-heading">
                        {this.props.intl.formatMessage({
                          id: "country_picker"
                        })}
                      </p>
                      <Geosuggest />
                    </div>
                    <p className="sub-heading">
                      Keywords
                    </p>
                    keyword picker
                    <p className="sub-heading">
                      Related Content
                      {this.state.andrea}
                    </p>
                    <div className="related-content">
                      <div className="pb-1">
                        <h5>
                          {this.props.intl.formatMessage({ id: "cases" })}
                        </h5>
                        <AutoComplete
                          hintText={this.props.intl.formatMessage({
                            id: "search_related_cases"
                          })}
                          dataSource={this.props.cases}
                        />
                      </div>
                      <div className="pb-1">
                        <h5>
                          {this.props.intl.formatMessage({ id: "methods" })}
                        </h5>
                        <AutoComplete
                          hintText={this.props.intl.formatMessage({
                            id: "search_related_methods"
                          })}
                          dataSource={this.props.methods}
                        />
                      </div>
                      <div className="pb-1">
                        <h5>
                          {this.props.intl.formatMessage({
                            id: "organizations"
                          })}
                        </h5>
                        <AutoComplete
                          hintText={this.props.intl.formatMessage({
                            id: "search_related_orgs"
                          })}
                          dataSource={this.props.organizations}
                        />
                      </div>
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
                      <Row className="itemPics">
                        {leadImg
                          ? <Col sm="6" md="3">
                              <div
                                className={
                                  this.state.lead === leadImg ||
                                    this.state.lead === ""
                                    ? "box lead"
                                    : "box"
                                }
                              >
                                <div className="checkbox" onClick={this.makeLead.bind(this, leadImg)} />
                                <div className="trash" onClick={this.deleteImg.bind(this, leadImg)} />
                                <img
                                  className="img-fluid"
                                  alt=""
                                  src={leadImg}
                                />
                                {this.state.lead === leadImg ||
                                  this.state.lead === ""
                                  ? <small>Lead Image</small>
                                  : undefined}
                              </div>
                            </Col>
                          : undefined}
                        {otherImgs
                          ? otherImgs.map((photo, id) => (
                              <Col key={id} sm="6" md="3">
                                <div
                                  className={
                                    this.state.lead === photo
                                      ? "box lead"
                                      : "box"
                                  }
                                >
                                  <div className="checkbox" onClick={this.makeLead.bind(this, photo)} />
                                  <div className="trash" onClick={this.deleteImg.bind(this, photo)} />
                                  <img
                                    key={id}
                                    alt=""
                                    className="img-fluid"
                                    src={photo}
                                  />
                                  {this.state.lead === photo
                                    ? <small>Lead Image</small>
                                    : undefined}
                                </div>
                              </Col>
                            ))
                          : undefined}
                        <Col md="3"><Upload itemEdit={true} addToList={this.handleNewImg} /></Col>
                      </Row>
                      <div>
                        <label htmlFor="title">Title</label>
                      </div>
                      <Text field="title" placeholder="case title" />
                      <div>
                        <label htmlFor="body_en">Body</label>
                      </div>
                      <BodyEditor value={caseObject.body} />
                    </div>
                    <button type="submit">Submit</button>
                  </Col>
                </Container>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}

_CaseEditor.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(_CaseEditor);
