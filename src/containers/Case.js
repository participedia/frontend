import React from 'react'
import styles from './Case.css'
import CSSModules from 'react-css-modules'
import Map from '../containers/Map'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentPencil from 'material-ui/svg-icons/image/edit';
import api from '../utils/api'

import { getRandomInt, daysOfWeek } from '../util'

class Case extends React.Component {
  componentWillMount () {
    let component = this
    api.fetchCaseById(this.props.params.nodeID).then(function (json) {
      let caseData = json['_source']
      let htmlBody = ''
      console.log(json)

      if (caseData.ArticleHTML) {
        htmlBody = caseData.ArticleHTML
      }
      component.setState({caseData: caseData, htmlBody: htmlBody})
    })
  }

  getInnerHTML () {
    let input = ''
    if (this.state && this.state.htmlBody) {
      input = this.state.htmlBody
    }
    return {__html: input}
  }

  render () {
    let progressPercentage = 50
    if (this.state && this.state.caseData) {
      let caseObject = this.state.caseData
      return (
        <div>
          <FloatingActionButton styleName="editButton">
            <ContentPencil />
          </FloatingActionButton>
          <Map />
          <div styleName="main-contents">
            <div styleName="detailed-case-component">
              <div styleName="sidebar">
                <img src="/img/pp-map-01.png" styleName="case-map" alt="" />
                <p styleName="case-location">
                  Kadikoy, Turkey
                </p>
                <div styleName="progress-bar">
                  <div styleName="progress-fill" style={{ width: progressPercentage + '%' }}></div>
                </div>
                <p styleName="progress-complete">
                  {progressPercentage}% complete
                </p>
                <p styleName="sub-heading">
                  Keywords
                </p>
                <p styleName="sub-sub-heading">
                  Tags:
                </p>
                <div styleName="tags">
                  {caseObject.IssueAreasUsrDetail.split(',').map(function (tag, i) {
                    return (<a key={i} href="#">{tag.trim()}</a>)
                  })}
                </div>
                <p styleName="sub-sub-heading">
                  Specific Topic(s):
                </p>
                <div styleName="tags">
                {caseObject.PPMethods.split(',').map(function (tag, i) {
                  return (<a key={i} href="#">{tag.trim()}</a>)
                })}
                </div>
                <p styleName="sub-heading">
                  Related Content
                </p>
                <div styleName="related-content">
                  <a href="#">Cases</a>
                  <a href="#">Methods</a>
                  <a href="#">Surveys</a>
                  <a href="#">Datasets</a>
                </div>
              </div>
              <div styleName="main-area">
                <div styleName="case-box">
                  <div styleName="category">
                    Case
                  </div>
                  <p styleName="case-title">
                    {caseObject.CaseID}
                  </p>
                  <div styleName="case-images">
                    {[0, 1, 2].map(function (obj, i) { /* XXX */
                      return (
                        <div styleName="thumbnail" key={i}
                          style={{ backgroundImage: 'url(/img/placeholder/400_' + getRandomInt(0, 30) + '.jpeg)' }} />
                      )
                    })}
                  </div>
                  <div styleName="authorship-details">
                    <p styleName="author-line">
                      First submitted by&nbsp;
                      <a href="#">
                        {caseObject.FirstSubmit}
                      </a>
                    </p>
                    <p styleName="date-line">
                      {daysOfWeek[(new Date(caseObject.DateOfSubm)).getDay()]},&nbsp;
                      {(new Date(caseObject.DateOfSubm)).toISOString().slice(0, 10).replace(/-/g, '/')}
                    </p>
                    <p styleName="author-line">
                      Most recent changes by&nbsp;
                      <a href="#">
                        {caseObject.MostRecentEdit}
                      </a>
                    </p>
                    <p styleName="date-line">
                      {daysOfWeek[(new Date(caseObject.LastUpdatedDate)).getDay()]},&nbsp;
                      {(new Date(caseObject.DateOfSubm)).toISOString().slice(0, 10).replace(/-/g, '/')}
                    </p>
                  </div>
                  <div styleName="case-html" dangerouslySetInnerHTML={{__html: caseObject.ArticleHTML}} />
                </div>
                <div styleName="case-tools">
                  <div styleName="top-icons">
                    <a href="#"><img src="/img/pp-case-icon-bookmark.png" alt="" /></a>
                    <a href="#"><img src="/img/pp-case-icon-settings.png" alt="" /></a>
                    <a href="#"><img src="/img/pp-case-icon-fb.png" alt="" /></a>
                    <a href="#"><img src="/img/pp-case-icon-tw.png" alt="" /></a>
                    <a href="#"><img src="/img/pp-case-icon-share.png" alt="" /></a>
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

export default CSSModules(Case, styles)
