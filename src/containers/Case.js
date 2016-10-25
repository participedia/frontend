import React from 'react'
import './Case.css'
import {injectIntl, intlShape} from 'react-intl'
import {Link} from 'react-router'
import api from '../utils/api'
import moment from 'moment'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentPencil from 'material-ui/svg-icons/image/edit'
import caseIconBookmark from '../img/pp-case-icon-bookmark.png'
import caseIconSettings from '../img/pp-case-icon-settings.png'
import caseIconFB from '../img/pp-case-icon-fb.png'
import caseIconTW from '../img/pp-case-icon-tw.png'
import caseIconShare from '../img/pp-case-icon-share.png'

import { getRandomInt } from '../util'

class CountryMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {'SVG': ''}
  }
  componentWillMount () {
    let component = this
    fetch('https://s3.amazonaws.com/assets.participedia.xyz/' + this.props.countrycode + '.svg').then(function (response) {
      return response.text()
    }).then(function (SVGtext) {
      let svg = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><style type="text/css"><![CDATA[path {stroke: none;fill: #ff6f00;}]]></style></defs>' + SVGtext + '</svg>'
      component.setState({SVG: svg})
    })
  }

  render () {
    return ( 
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.SVG}} />
        <p>{this.props.countrycode}</p>
      </div>
    )
  }
}

class Case extends React.Component {
  componentWillMount () {
    let component = this
    api.fetchCaseById(this.props.params.nodeID).then(function (json) {
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
      let last_author = 'XXX' // TODO
      let id = this.props.params.nodeID
      let editLink = (<Link to={`/${locale}/case/${id}/edit`} />)

      return (
        <div>
          <div className="edit-button-container">
            <div className="edit-button-inner">
              <div className="editButton">
                <FloatingActionButton
                  containerElement={editLink}
                  >
                  <ContentPencil />
                </FloatingActionButton>
              </div>
            </div>
          </div>
          <div className='main-contents'>
            <div className='detailed-case-component'>
              <div className='sidebar'>
                <CountryMap countrycode={caseObject.geo_country} />
                <p className='case-location'>
                  Kadikoy, Turkey
                </p>
                <div className='progress-bar'>
                  <div className='progress-fill' style={{ width: progressPercentage + '%' }}></div>
                </div>
                <p className='progress-complete'>
                  {progressPercentage}% complete
                </p>
                <p className='sub-heading'>
                  Keywords
                </p>
                <p className='sub-sub-heading'>
                  Tags:
                </p>
                <div className='tags'>
                {tags}
                </div>
                <p className='sub-sub-heading'>
                  Specific Topic(s):
                </p>
                <div className='tags'>
                {communication_modes}
                </div>
                <p className='sub-heading'>
                  Related Content
                </p>
                <div className='related-content'>
                  <a href='#'>Cases</a>
                  <a href='#'>Methods</a>
                  <a href='#'>Surveys</a>
                  <a href='#'>Datasets</a>
                </div>
              </div>
              <div className='main-area'>
                <div className='case-box'>
                  <div className='category'>
                    Case
                  </div>
                  <p className='case-title'>
                    {caseObject.title_en}
                  </p>
                  <div className='case-images'>
                    {[0, 1, 2].map(function (obj, i) { /* XXX */
                      return (
                        <div className='thumbnail' key={i}
                          style={{ backgroundImage: 'url(/img/placeholder/400_' + getRandomInt(0, 30) + '.jpeg)' }} />
                      )
                    })}
                  </div>
                  <div className='authorship-details'>
                    <p className='author-line'>
                      First submitted by&nbsp;
                      <a href={first_author_url}>
                        {first_author}
                      </a>
                    </p>
                    <p className='date-line'>
                    {post_date} 
                    </p>
                    <p className='author-line'>
                      Most recent changes by&nbsp;
                      <a href='#'>
                        {last_author}
                      </a>
                    </p>
                    <p className='date-line'>
                    {updated_date}
                    </p>
                  </div>
                  <div className='case-html' dangerouslySetInnerHTML={{__html: caseObject.body_en}} />
                </div>
                <div className='case-tools'>
                  <div className='top-icons'>
                    <a href='#'><img src={caseIconBookmark} alt='' /></a>
                    <a href='#'><img src={caseIconSettings} alt='' /></a>
                    <a href='#'><img src={caseIconFB} alt='' /></a>
                    <a href='#'><img src={caseIconTW} alt='' /></a>
                    <a href='#'><img src={caseIconShare} alt='' /></a>
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

export default injectIntl(Case)
