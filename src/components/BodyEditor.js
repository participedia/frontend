import React, { Component } from "react";
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

export default BodyEditor;
