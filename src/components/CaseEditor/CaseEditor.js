import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import { Field } from "redux-form";
import Geosuggest from "react-geosuggest";
import "./CaseEditor.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
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

const renderGeoField = ({ input, label, type, meta: { touched, error } }) => {
  const onSuggestSelect = suggest => {
    input.onChange(suggest);
  };
  return <Geosuggest onSuggestSelect={onSuggestSelect} />;
};

class _CaseEditor extends Component {
  constructor(props) {
    super(props);
    this.makeLead = this.makeLead.bind(this);
    this.state = { 
      //need to make this conditional, set equal to leadImg (see below) if it exists
      lead: ''
    };
  }

  makeLead(src) {
    this.setState({ lead: src }); 
  }

  render() {
    const { handleSubmit } = this.props;
    const caseObject = this.props.case;
    let awsUrl = process.env.REACT_APP_ASSETS_URL;
    let leadImg = "";
    let otherImgs = [];
    if (caseObject && caseObject.lead_image) {
      leadImg = awsUrl + encodeURIComponent(caseObject.lead_image.url)
    }
    if (caseObject && caseObject.other_images.length) {
      Object.keys(caseObject.other_images).forEach(function (key) {
        let obj = caseObject.other_images[key]
        otherImgs.push(awsUrl + encodeURIComponent(obj.url))
      });
    }

    if (!caseObject) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="main-contents">
          <Container className="detailed-case-component" fluid={true}>
            <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down">
              <div className="case-location">
                <p className="sub-heading">
                  {this.props.intl.formatMessage({ id: "country_picker" })}
                </p>
                <Field name="location" component={renderGeoField} />
              </div>
              <p className="sub-heading">
                Keywords
              </p>
              keyword picker
              <p className="sub-heading">
                Related Content
              </p>
              <div className="related-content">
                <FormGroup className="relatedCases pb-1">
                  <h5>{this.props.intl.formatMessage({ id: "cases" })}</h5>
                  <AutoComplete
                    hintText={this.props.intl.formatMessage({
                      id: "search_related_cases"
                    })}
                    dataSource={this.props.cases}
                  />
                </FormGroup>
                <FormGroup className="relatedCases pb-1">
                  <h5>{this.props.intl.formatMessage({ id: "methods" })}</h5>
                  <AutoComplete
                    hintText={this.props.intl.formatMessage({
                      id: "search_related_methods"
                    })}
                    dataSource={this.props.methods}
                  />
                </FormGroup>
                <FormGroup className="relatedCases pb-1">
                  <h5>{this.props.intl.formatMessage({ id: "organizations" })}</h5>
                  <AutoComplete
                    hintText={this.props.intl.formatMessage({
                      id: "search_related_orgs"
                    })}
                    dataSource={this.props.organizations}
                  />
                </FormGroup>
                <a href="#">Surveys</a>
                <a href="#">Datasets</a>
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
                <form onSubmit={handleSubmit}>
                  <Row className="itemPics">
                    { leadImg ?
                      <Col sm="6" md="3">
                        <div className={this.state.lead === leadImg || this.state.lead === '' ? "box lead" : "box"}>
                          <div className="checkbox"></div>
                          <img className="img-fluid" onClick={this.makeLead.bind(this, leadImg)} src={leadImg} />
                          { this.state.lead === leadImg ||  this.state.lead === '' ?
                          <small>Lead Image</small>
                          : 
                          undefined
                          }
                        </div>  
                      </Col>
                      :
                      undefined
                    }
                    { otherImgs ?
                      otherImgs.map((photo, id) => 
                      <Col key={id} sm="6" md="3">
                        <div className={this.state.lead === photo ? "box lead" : "box"}>
                          <div className="checkbox"></div>
                          <img key={id} className="img-fluid" onClick={this.makeLead.bind(this, photo)} src={photo} />
                          { this.state.lead === photo ?
                            <small>Lead Image</small>
                            :
                            undefined 
                          } 
                        </div>
                      </Col>
                      )
                      :
                      undefined
                    }
                    <Col md="3"><Upload /></Col>
                  </Row>
                  <div>
                    <label htmlFor="title">Title</label>
                  </div>
                  <Field
                    component="input"
                    name="title"
                    type="text"
                    value={caseObject.title}
                  />
                  <div>
                    <label htmlFor="body_en">Body</label>
                  </div>
                  <BodyEditor value={caseObject.body} />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </Col>
          </Container>
        </div>
      </div>
    );
  }
}

_CaseEditor.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(_CaseEditor);
