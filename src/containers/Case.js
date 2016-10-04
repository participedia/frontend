import React from 'react'
import styles from './Case.sass'
import CSSModules from 'react-css-modules'
import {injectIntl, intlShape} from 'react-intl'
import {Link} from 'react-router'
import api from '../utils/api'
import moment from 'moment'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentPencil from 'material-ui/svg-icons/image/edit'

import { getRandomInt } from '../util'

class Case extends React.Component {
  componentWillMount () {
    let component = this
    api.fetchCaseById(this.props.params.nodeID).then(function (json) {
      console.log('in Case.js componentWillMount, json = ', json)
      let data = json[0]
      component.setState({data: data, htmlBody: data.body})
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
    let progressPercentage = 50 // TODO
    if (this.state && this.state.data) {
      let caseObject = this.state.data
      let tags, communication_modes = ''
      if (caseObject.specific_topics) {
        tags = caseObject.specific_topics.split(',').map(function (tag, i) {
          return (<a key={i} href='#'>{tag.trim()}</a>)
        })
      }
      if (caseObject.communication_mode) {
        communication_modes = caseObject.communication_mode.split(',').map(function (tag, i) {
          return (<a key={i} href='#'>{tag.trim()}</a>)
        })
      }
      let post_date = moment(caseObject.post_date).format('LL')
      let updated_date = moment(caseObject.updated_date).format('LL')
      let first_author = caseObject.author.name
      let locale = this.props.intl.locale
      let first_author_url = '/' + locale + '/users/' + caseObject.author.id
      let last_author = "XXX" // TODO
      let id = this.props.params.nodeID
      let editLink = (<Link to={`/${locale}/case/${id}/edit`} />)

      return (
        <div>
          <div styleName="edit-button-container">
            <div styleName="edit-button-inner">
              <div styleName="editButton">
                <FloatingActionButton linkButton
                  containerElement={editLink}
                  >
                  <ContentPencil />
                </FloatingActionButton>
              </div>
            </div>
          </div>
          <div styleName='main-contents'>
            <div styleName='detailed-case-component'>
              <div styleName='sidebar'>
                <img src='/img/pp-map-01.png' styleName='case-map' alt='' />
                <p styleName='case-location'>
                  Kadikoy, Turkey
                </p>
                <div styleName='progress-bar'>
                  <div styleName='progress-fill' style={{ width: progressPercentage + '%' }}></div>
                </div>
                <p styleName='progress-complete'>
                  {progressPercentage}% complete
                </p>
                <p styleName='sub-heading'>
                  Keywords
                </p>
                <p styleName='sub-sub-heading'>
                  Tags:
                </p>
                <div styleName='tags'>
                {tags}
                </div>
                <p styleName='sub-sub-heading'>
                  Specific Topic(s):
                </p>
                <div styleName='tags'>
                {communication_modes}
                </div>
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
                  <div styleName='case-images'>
                    {[0, 1, 2].map(function (obj, i) { /* XXX */
                      return (
                        <div styleName='thumbnail' key={i}
                          style={{ backgroundImage: 'url(/img/placeholder/400_' + getRandomInt(0, 30) + '.jpeg)' }} />
                      )
                    })}
                  </div>
                  <div styleName='authorship-details'>
                    <p styleName='author-line'>
                      First submitted by&nbsp;
                      <a href={first_author_url}>
                        {first_author}
                      </a>
                    </p>
                    <p styleName='date-line'>
                    {post_date} 
                    </p>
                    <p styleName='author-line'>
                      Most recent changes by&nbsp;
                      <a href='#'>
                        {last_author}
                      </a>
                    </p>
                    <p styleName='date-line'>
                    {updated_date}
                    </p>
                  </div>
                  <div styleName='case-html' dangerouslySetInnerHTML={{__html: caseObject.body_en}} />
                </div>
                <div styleName='case-tools'>
                  <div styleName='top-icons'>
                    <a href='#'><img src='/img/pp-case-icon-bookmark.png' alt='' /></a>
                    <a href='#'><img src='/img/pp-case-icon-settings.png' alt='' /></a>
                    <a href='#'><img src='/img/pp-case-icon-fb.png' alt='' /></a>
                    <a href='#'><img src='/img/pp-case-icon-tw.png' alt='' /></a>
                    <a href='#'><img src='/img/pp-case-icon-share.png' alt='' /></a>
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

Case.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(CSSModules(Case, styles))
