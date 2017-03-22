import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import { Form, Text } from "react-form";

import "./CaseEditor.css";
import { Container, Col } from "reactstrap";
import ReactQuill from "react-quill";

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
  render() {
    const { handleSubmit } = this.props;
    const caseObject = this.props.case;

    if (!caseObject) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Form
          onSubmit={values => {
            console.log("Success!", values);
          }}
          validate={({ name }) => {
            return {
              name: !name ? "A name is required" : undefined
            };
          }}
        >
          {({ submitForm }) => {
            return (
              <form onSubmit={submitForm}>
                <Text field="name" />
                <button type="submit">Submit</button>
              </form>
            );
          }}
          <div className="main-contents">
            <Container className="detailed-case-component" fluid={true}>
              <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down">
                <p className="case-location">
                  country picker
                </p>
                <p className="sub-heading">
                  Keywords
                </p>
                keyword picker
                <p className="sub-heading">
                  Related Content
                </p>
                <div className="related-content">
                  <a href="#">Cases</a>
                  <a href="#">Methods</a>
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
                    <div>
                      <label htmlFor="title">Title</label>
                    </div>
                    <Text
                      // component="input"
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
        </Form>
      </div>
    );
  }
}

_CaseEditor.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(_CaseEditor);
