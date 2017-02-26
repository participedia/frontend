import React from 'react'
import './Case/Case.css'
import {injectIntl, intlShape} from 'react-intl'
import {Link} from 'react-router'
import { Container, Row, Col } from 'reactstrap'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import CountryMap from '../components/CountryMap'
import ContentPencil from 'material-ui/svg-icons/image/edit'
import api from '../utils/api'
import caseIconBookmark from '../img/pp-case-icon-bookmark.png'
import caseIconSettings from '../img/pp-case-icon-settings.png'
import caseIconFB from '../img/pp-case-icon-fb.png'
import caseIconTW from '../img/pp-case-icon-tw.png'
import caseIconShare from '../img/pp-case-icon-share.png'
import moment from 'moment'

export class Method extends React.Component {
  componentWillMount () {
    let component = this
    api.fetchMethodById(this.props.params.nodeID).then(function (json) {
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
    if (this.state && this.state.data) {
      let methodObject = this.state.data
      let tags, communication_modes = ''
      if (methodObject.specific_topics) {
        tags = methodObject.specific_topics.split(',').map(function (tag, i) {
          return (<a key={i} href='#'>{tag.trim()}</a>)
        })
      }
      if (methodObject.communication_mode) {
        communication_modes = methodObject.communication_mode.split(',').map(function (tag, i) {
          return (<a key={i} href='#'>{tag.trim()}</a>)
        })
      }
      let post_date = moment(methodObject.post_date).format('LL')
      let updated_date = moment(methodObject.updated_date).format('LL')
      let locale = this.props.intl.locale

      let author = methodObject.author
      let first_author = (author && author.name) || 'unknown'
      let first_author_url = author ? '/' + locale + '/users/' + methodObject.author.id : ''
      let last_author = '???' // TODO figure out how to extract last author information
      let id = this.props.params.nodeID
      let editLink = (<Link to={`/${locale}/case/${id}/edit`} />)
      let awsUrl = process.env.REACT_APP_ASSETS_URL
      if (methodObject.lead_image) {
        var comma = methodObject.lead_image.search(",");
        var pic = awsUrl + encodeURIComponent(methodObject.lead_image.slice(9, comma-1));
      }
      if (methodObject.other_images) {
        var bracket = methodObject.other_images.search("]");
        var otherImg = awsUrl + encodeURIComponent(methodObject.other_images.slice(2, bracket-1));
      }

      return (
        <div>
          <div className='main-contents'>
            <Container className='detailed-case-component' fluid={true}>
              <Row>
                <Col md='3' className='hidden-sm-down sidepanel hidden-sm-down'>
                  { methodObject.geo_country ?
                    <CountryMap city={methodObject.geo_city} countrycode={methodObject.geo_country} />
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
                    <div className='category'>
                      Method
                    </div>
                    <h2 className='case-title'>
                      {methodObject.title_en}
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
                        <a href='#'>
                          {last_author}
                        </a>
                      </p>
                      <p className='date-line'>
                      {updated_date}
                      </p>
                    </div>
                    <div className='case-html' dangerouslySetInnerHTML={{__html: methodObject.body_en}} />
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
              </Row>
            </Container>
            <Link to={editLink}>
              <FloatingActionButton className='editButton'>
                <ContentPencil />
              </FloatingActionButton>
            </Link>
          </div>
        </div>)
    } else {
      return (<div></div>)
    }
  }
}


Method.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Method)
