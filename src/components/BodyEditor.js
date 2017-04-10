import React from "react";
import ReactQuill from "react-quill";
import "../quill.core.css";
import "../quill.snow.css";
import "./BodyEditor.css";
import { Container, Row, Col } from "reactstrap";
import ScrollEvent from "react-onscroll";

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
  ];
  /* ... other modules */
}

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
];

class BodyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fixedBar: false };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    let el = this.toolBarContainer;
    let rect = el.getBoundingClientRect();
    console.log("rect", rect);
    if (rect.top <= 0) {
      this.setState({ fixedBar: true });
    } else {
      this.setState({ fixedBar: false });
    }
  }

  render() {
    return (
      <div className="_quill">
        <div
          ref={ref => this.toolBarContainer = ref}
          className={
            this.state.fixedBar ? "body-editor-box fixed" : "body-editor-box"
          }
        >
          <ScrollEvent handleScrollCallback={this.handleScroll} />
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
      </div>
    );
  }
}

export default BodyEditor;
