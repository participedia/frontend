import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./BodyEditor.css";

export default class BodyEditor extends Component {
  constructor(props) {
    super(props);
    const html = this.props.html;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
     this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(final){
    let toSave = draftToHtml(convertToRaw(final.getCurrentContent()));
    this.setState({
    editorState:final,
    });        
    this.props.onEditorChange(toSave);      
  }


  render() {
    const { editorState } = this.state;

    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          toolbar={{options: ["inline", "blockType", "list", "link"]}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
