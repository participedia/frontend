import React from 'react'
import styles from './Case.css'
import CSSModules from 'react-css-modules'
import Map from '../containers/Map'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {fetchMethodById} from '../searchlib'

import { getRandomInt, daysOfWeek } from '../util'

class Method extends React.Component {
  componentWillMount () {
    let component = this
    fetchMethodById(this.props.params.methodID).then(function (response) {
      response.json().then(function (json) {
        let caseData = json['_source']
        let htmlBody = ''

        if (caseData.ArticleHTML) {
          htmlBody = caseData.ArticleHTML
        }
        component.setState({caseData: caseData, htmlBody: htmlBody})
      }, function (error) {
        console.error(error.message)
      })
    })
  }

  getInnerHTML () {
    let input = ''
    console.log(this.state)
    if (this.state && this.state.htmlBody) {
      input = this.state.htmlBody
    }
    return {__html: input}
  }

  render () {
    let progressPercentage = 50
    if (this.state && this.state.caseData) {
      let datumObj = this.state.caseData
      console.log('datumObj', datumObj)
      return (
        <div>
          <Map />
          <FloatingActionButton styleName="editButton" iconClassName="attach-file" />
          <div styleName="main-contents">
            <div className="detailed-case-component">
              <div className="sidebar">
                <p className="sub-heading">
                  Related Content
                </p>
                <div className="related-content">
                  <a href="#">Cases</a>
                  <a href="#">Methods</a>
                  <a href="#">Surveys</a>
                  <a href="#">Datasets</a>
                </div>
              </div>
              <div className="main-area">
                <div className="case-box">
                  <div className="category">
                    Method
                  </div>
                  <p className="case-title">
                    {datumObj.Title}
                  </p>
                  <div className="case-html"
                    dangerouslySetInnerHTML={{__html: datumObj.ArticleHTML}} />
                </div>
                <div className="case-tools">
                  <div className="top-icons">
                    <a href="#"><img src="/img/pp-case-icon-bookmark.png" alt="" /></a>
                    <a href="#"><img src="/img/pp-case-icon-settings.png" alt="" /></a>
                    <a href="#"><img src="/img/pp-case-icon-fb.png" alt="" /></a>
                    <a href="#"><img src="/img/pp-case-icon-tw.png" alt="" /></a>
                    <a href="#"><img src="/img/pp-case-icon-share.png" alt="" /></a>
                  </div>
                  <div className="bottom-icons">
                    <a href="#"><img src="/img/pp-case-icon-edit.png" alt="" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)
    } else {
      return (<div></div>)
    }
  }
}

export default CSSModules(Method, styles)
