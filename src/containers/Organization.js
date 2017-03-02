import React from 'react'
import './Case/Case.css'
import {injectIntl, intlShape} from 'react-intl'
import api from '../utils/api'
import moment from 'moment'
import { Container, Col } from 'reactstrap'
import CountryMap from '../components/CountryMap'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentPencil from 'material-ui/svg-icons/image/edit'
import caseIconBookmark from '../img/pp-case-icon-bookmark.png'
import caseIconSettings from '../img/pp-case-icon-settings.png'
import caseIconFB from '../img/pp-case-icon-fb.png'
import caseIconTW from '../img/pp-case-icon-tw.png'
import caseIconShare from '../img/pp-case-icon-share.png'


export class Organization extends React.Component {
  componentWillMount () {
    let component = this
    api.fetchOrgById(this.props.params.nodeID).then(function (data) {
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
    if (this.state && this.state.data) {
      let organizationObject = this.state.data
      let tags, communication_modes = ''
      if (organizationObject.specific_topics) {
        tags = organizationObject.specific_topics.split(',').map(function (tag, i) {
          return (<a key={i} href='#'>{tag.trim()}</a>)
        })
      }
      if (organizationObject.communication_mode) {
        communication_modes = organizationObject.communication_mode.split(',').map(function (tag, i) {
          return (<a key={i} href='#'>{tag.trim()}</a>)
        })
      }
      let post_date = moment(organizationObject.post_date).format('LL')
      let updated_date = moment(organizationObject.updated_date).format('LL')
      let locale = this.props.intl.locale
      let author = organizationObject.authors[0]
      let first_author = (author && author.name) || 'unknown'
      let first_author_url = author ? '/' + locale + '/users/' + author.id : ''
      let last_author = organizationObject.authors.slice(-1)[0]
      let last_author_name = last_author.name
      let last_author_url = '/' + locale + '/users/' + last_author.id
      let awsUrl = process.env.REACT_APP_ASSETS_URL
      if (organizationObject.lead_image) {
        var comma = organizationObject.lead_image.search(',')
        var pic = awsUrl + encodeURIComponent(organizationObject.lead_image.url)
      }
      if (organizationObject.other_images.length) {
        var otherImg = awsUrl + encodeURIComponent(organizationObject.other_images[0].url)
      }

      return (
        <div>
          <div className='main-contents'>
            <Container className='detailed-case-component' fluid={true}>
              <Col md='3' className='sidepanel hidden-sm-down'>
                { organizationObject.location.country ?
                  <CountryMap city={organizationObject.location.city} countrycode={organizationObject.location.country} />
                  :
                  undefined
                }
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
              </Col>
              <Col md='8' xs='12' className='main-area'>
                <div className='case-box'>
                  <h2 className='category'>
                    Organization
                  </h2>
                  <h2 className='case-title'>
                    {organizationObject.title}
                  </h2>
                  { (pic && pic.length > awsUrl.length) ?
                    <div className='case-images'>
                      <img role='presentation' src={pic} />
                    </div>
                    :
                    (otherImg && otherImg.length > awsUrl.length) ?
                      <div className='case-images'>
                        <img role='presentation' src={otherImg} />
                      </div>
                    :
                    undefined
                  }
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
                      <a href='{last_author_url}'>
                        {last_author_name}
                      </a>
                    </p>
                    <p className='date-line'>
                    {updated_date}
                    </p>
                  </div>
                  <div className='case-html' dangerouslySetInnerHTML={{__html: organizationObject.body_en}} />
                </div>
              </Col>
              <Col md='1' className='case-tools hidden-sm-down'>
                <div className='top-icons'>
                  <a href='#'><img src={caseIconBookmark} alt='' /></a>
                  <a href='#'><img src={caseIconSettings} alt='' /></a>
                  <a href='#'><img src={caseIconFB} alt='' /></a>
                  <a href='#'><img src={caseIconTW} alt='' /></a>
                  <a href='#'><img src={caseIconShare} alt='' /></a>
                </div>
              </Col>
            </Container>
            <FloatingActionButton className='editButton'>
              <ContentPencil />
            </FloatingActionButton>
          </div>
        </div>)
    } else {
      return (<div></div>)
    }
  }
}

Organization.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Organization)
