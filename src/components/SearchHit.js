import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import './SearchHit.css'
import {injectIntl, intlShape} from 'react-intl'
import moment from 'moment'
import backgroundImage from '../img/pp-thumbnail-1.jpg'

function capitalize(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

class SearchHit extends React.Component {

  getInnerHTML () {
    return {__html: this.props.record._source.body_en}
  }
  render () {
    let result = this.props.record._source
    var locale = this.props.intl.locale
    var id = result.id
    var type = result.type_
    let title, link
    title = capitalize(type) + ': ' + result.title_en
    link = `/${locale}/${type}/${id}`
    let firstSubmit = moment(result.post_date).format("dddd, MMMM Do YYYY")
    if (!title) {
      console.log('missing title: ', result)
    }
    let thumbnailStyle = {backgroundImageSrc: backgroundImage}
    let dateString = new moment(result.lastmodified).fromNow()
    let blob = (
      <div className='result'>
        <Link to={link} className='result-title'>
          <div className='thumbnail'
            style={thumbnailStyle} />
          <div className='result-title-text'>{title}</div>
        </Link>
        <p className='result-author'>
          {firstSubmit}
        </p>
        <p className='result-date'>
          {dateString}
        </p>
      </div>
    )
    return blob
  }
}

SearchHit.propTypes = {
  record: PropTypes.object.isRequired,
  intl: intlShape.isRequired
}

export default injectIntl(SearchHit)
