import React from 'react'
import './Case.css'
import {injectIntl, intlShape} from 'react-intl'
import {Link} from 'react-router'
import api from '../../utils/api'
import moment from 'moment'
import { Container, Row, Col } from 'reactstrap'
import CountryMap from '../../components/CountryMap'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentPencil from 'material-ui/svg-icons/image/edit'
import caseIconBookmark from '../../img/pp-case-icon-bookmark.png'
import caseIconSettings from '../../img/pp-case-icon-settings.png'
import caseIconFB from '../../img/pp-case-icon-fb.png'
import caseIconTW from '../../img/pp-case-icon-tw.png'
import caseIconShare from '../../img/pp-case-icon-share.png'


export class Case extends React.Component {
  componentWillMount () {
    let component = this
    api.fetchCaseById(this.props.params.nodeID).then(function (the_case) {
      component.setState({data: the_case, htmlBody: the_case.body})
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
      let caseObject = this.state.data
      let tag, communication_mode = ''
      if (caseObject.specific_topic) {
        tag = <a href='#'>{caseObject.specific_topic}</a>
      }
      if (caseObject.communication_mode) {
        communication_mode = <a href='#'>{caseObject.communication_mode}</a>
      }
      let post_date = moment(caseObject.post_date).format('LL')
      let updated_date = moment(caseObject.updated_date).format('LL')
      let first_author = caseObject.authors[0]
      let locale = this.props.intl.locale
      let first_author_url = '/' + locale + '/users/' + first_author.id
      let first_author_name = first_author.name
      let last_author = caseObject.authors.slice(-1)[0]
      let last_author_name = last_author.name
      let last_author_url = '/' + locale + '/users/' + last_author.id
      let id = this.props.params.nodeID
      let editLink = `/${locale}/case/${id}/edit`
      // let editLink = (<Link to={`/${locale}/case/${id}/edit`} />)
      let awsUrl = process.env.REACT_APP_ASSETS_URL
      if (caseObject.lead_image) {
        var comma = caseObject.lead_image.search(',')
        var pic = awsUrl + encodeURIComponent(caseObject.lead_image.slice(9, comma-1))
      }
      if (caseObject.other_images) {
        var bracket = caseObject.other_images.search(']')
        var otherImg = awsUrl + encodeURIComponent(caseObject.other_images.slice(2, bracket-1))
      }

      return (
        <div>
          <div className='main-contents'>
            <Container className='detailed-case-component' fluid={true}>
              <Row>
                <Col md='3' className='hidden-sm-down sidepanel hidden-sm-down'>
                  <CountryMap city={caseObject.location.city} countrycode={caseObject.location.country} />
                  <p className='sub-heading'>
                    Keywords
                  </p>
                  <p className='sub-sub-heading'>
                    Tag:
                  </p>
                  <div className='tags'>
                  {tag}
                  </div>
                  <p className='sub-sub-heading'>
                    Specific Topic:
                  </p>
                  <div className='tags'>
                  {communication_mode}
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
                      Case
                    </h2>
                    <h2 className='case-title'>
                      {caseObject.title}
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
                          {first_author_name}
                        </a>
                      </p>
                      <p className='date-line'>
                      {post_date}
                      </p>
                      <p className='author-line'>
                        Most recent changes by&nbsp;
                        <a href={last_author_url}>
                          {last_author_name}
                        </a>
                      </p>
                      <p className='date-line'>
                      {updated_date}
                      </p>
                    </div>
                    <div className='case-html' dangerouslySetInnerHTML={{__html: caseObject.body}} />
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

Case.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Case)
