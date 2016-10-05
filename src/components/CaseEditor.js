
import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import {injectIntl, intlShape} from 'react-intl'
import { Field } from 'redux-form'

import styles from './CaseEditor.sass'
import CSSModules from 'react-css-modules'
import ReactQuill from 'react-quill/dist/react-quill'

// We don't want the Quill CSS to get name-mangled, as the library expects pure names.
import QuillCoreCSS from '!!style-loader!css-loader!../../node_modules/quill/dist/quill.core.css'
import QuillSnowCSS from '!!style-loader!css-loader!../../node_modules/quill/dist/quill.snow.css'


var _BodyEditor = React.createClass({
  render: function() {
    console.log("this.props", this.props)
    return (
      <div>
        <ReactQuill value={this.props.value} />
      </div>
    )
  }
})
var BodyEditor = CSSModules(_BodyEditor, QuillSnowCSS)

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
                  {caseObject.title_en}
                  </p>
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
              </div>
          </div>
        </div>
      </div>
    )
  }
}

_CaseEditor.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(CSSModules(_CaseEditor, styles))
