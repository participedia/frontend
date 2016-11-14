
import React, {Component} from 'react'
import {injectIntl, intlShape} from 'react-intl'
import { Field } from 'redux-form'

import '../containers/Case/Case.css'
import './CaseEditor.css'
import { Container, Row, Col } from 'reactstrap';
import ReactQuill from 'react-quill/dist/react-quill'

import '../quill.core.css'
import '../quill.snow.css'

var BodyEditor = React.createClass({
  _quillModules: {
    toolbar: [ 
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], 
        ['link', 'image'], 
        ['clean'] 
    ]
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
        <ReactQuill theme='snow' 
                    modules={this._quillModules}
                    formats={this._quillFormats}
                    toolbar={false}
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

class _CaseEditor extends Component {
  render() {
    const { handleSubmit } = this.props
    console.log('in CaseEditor.render, props=', this.props)
    const caseObject = this.props.case

    if (! caseObject) {
      return (<div>Loading...</div>)
    }

    return (
        <div>
          <div className='main-contents'>
            <Container className='detailed-case-component' fluid='true'>
              <Col md='3' className='hidden-sm-down sidepanel hidden-sm-down'>
                <p className='case-location'>
                  country picker
                </p>
                <p className='sub-heading'>
                  Keywords
                </p>
                keyword picker
                <p className='sub-heading'>
                  Related Content
                </p>
                <div className='related-content'>
                  <a href='#'>Cases</a>
                  <a href='#'>Methods</a>
                  <a href='#'>Surveys</a>
                  <a href='#'>Datasets</a>
                </div>
              </Col>
              <Col md='8' xs='12' className='main-area'>
                <div className='case-box'>
                  <h2 className='category'>
                    Case
                  </h2>
                  <h2 className='case-title'>
                  {caseObject.title_en}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="title_en">Title</label>
                    </div>
                    <Field
                      component='input'
                      name="title_en" type="text" value={caseObject.title_en}/>
                    <div>
                    <label htmlFor="body_en">Body</label>
                    </div>
                    <BodyEditor value={caseObject.body_en}/>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              </Col>
          </Container>
        </div>
      </div>
    )
  }
}

_CaseEditor.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(_CaseEditor)
