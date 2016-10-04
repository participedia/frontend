import React, { Component } from 'react';
import styles from './Case.sass'
import CSSModules from 'react-css-modules'
import {injectIntl, intlShape} from 'react-intl'
import api from '../utils/api'
import { Field, reduxForm } from 'redux-form'
import ReactQuill from 'react-quill'
import QuillCSS from '../../node_modules/quill/dist/quill.snow.css'

import {
  AutoComplete,
  Checkbox,
  DatePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui'


const mapStateToProps = (state, ownProps) => {
  console.log("in mapStateToProps:", state, ownProps);
  return state
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (data) => {
      console.log('FORM PROPS', data, ownProps)
    }
  }
}
export const fields = [ 'title_en', 'body_en' ]

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
]

var _MyComponent = React.createClass({
  /* ... */

  _quillModules: {
    toolbar: '#toolbar'
    /* ... other modules */
  },

  _quillFormats: [ 
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image' 
  ],

  render: function() {
    return (
      <div className='_quill'>
        <div id="toolbar">
          <button className="ql-bold">Bold</button>
          <button className="ql-italic">Italic</button>
        </div>
        <ReactQuill theme='snow' 
                    modules={this._quillModules}
                    formats={this._quillFormats}
                    toolbar={false} // Let Quill manage toolbar
                    bounds={'._quill'}>
          <div key="editor"
                ref="editor"
                className="quill-contents border_solid_top"
                dangerouslySetInnerHTML={{__html:this.props.value}} />
        </ReactQuill>
      </div>
    )
  }
})

var MyComponent = CSSModules(_MyComponent, QuillCSS)

class _CaseForm extends Component {
  componentWillMount () {
    let component = this
    api.fetchCaseById(this.props.params.nodeID).then(function (json) {
      console.log('in EditCase.js componentWillMount, json = ', json[0])
      let data = json[0]
      component.setState({initialValues: data})
    })
  }

  render() {
    const { handleSubmit } = this.props
    console.log("props", this.props)
    return (
        <div>
          <div styleName='main-contents'>
            <div styleName='detailed-case-component'>
              <div styleName='sidebar'>
                <p styleName='case-location'>
                  country picker
                </p>
                <p styleName='sub-heading'>
                  Keywords
                </p>
                keyword picker
                <p styleName='sub-heading'>
                  Related Content
                </p>
                <div styleName='related-content'>
                  <a href='#'>Cases</a>
                  <a href='#'>Methods</a>
                  <a href='#'>Surveys</a>
                  <a href='#'>Datasets</a>
                </div>
              </div>
              <div styleName='main-area'>
                <div styleName='case-box'>
                  <div styleName='category'>
                    Case
                  </div>
                  <p styleName='case-title'>
                  case title
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="title_en">Title</label>
                    </div>
                    <Field
                      component={TextField}
                      name="title_en" type="text"/>
                    <div>
                    <label htmlFor="body_en">Body</label>
                    </div>
                    <Field
                      component={MyComponent}
                      name="body_en" 
                      hintText="Remember the reader"
                      floatingLabelText="Case body"
                      multiLine={true}
                      rows={200}
                    />
                    <button type="submit">Submit</button>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}


_CaseForm.propTypes = {
  intl: intlShape.isRequired
}

// Decorate the form component
let CaseForm = reduxForm({
  form: 'caseform', // a unique name for this form
}, mapStateToProps, mapDispatchToProps)(injectIntl(CSSModules(_CaseForm, styles)))

export default CaseForm

