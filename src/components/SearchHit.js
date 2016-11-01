import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import './SearchHit.css'
import {injectIntl, intlShape} from 'react-intl'
import moment from 'moment'
import backgroundImage from '../img/pp-thumbnail-1.jpg'

function capitalize(str)
{
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
}

class SearchHit extends React.Component {

  getInnerHTML () {
    return {__html: this.props.record._source.body_en}
  }

  render () {
    let result = this.props.record._source
    const awsUrl = 'http://assets.participedia.xyz.s3.amazonaws.com/'
    if (result.lead_image) {
      var comma = result.lead_image.search(",");
      // var awsUrl = 'http://assets.participedia.xyz.s3.amazonaws.com/'
      var pic = awsUrl + encodeURIComponent(result.lead_image.slice(9, comma-1));
    }
    if (result.other_images) {
      var bracket = result.other_images.search("]");
      var otherImg = awsUrl + encodeURIComponent(result.other_images.slice(2, bracket-1));
    }
    var locale = this.props.intl.locale
    var id = result.id
    var type = result.type_
    let title, link
    title = capitalize(type) + ': ' + result.title_en
    link = `/${locale}/${type}/${id}`
    let firstSubmit = moment(result.post_date).format('dddd, MMMM Do YYYY')
    if (!title) {
      console.log('missing title: ', result)
    }
    let thumbnailStyle = {backgroundImageSrc: backgroundImage}
    let dateString = new moment(result.updated_date).fromNow()
    let blob = (
      <div className={ this.props.selectedViewType == 'grid' ? 'result-grid' : 'result-list'} >
        { this.props.selectedViewType == 'grid' ?
        <div className='result'>
          <Link to={link} className='result-title'>
            { (pic && pic.length > awsUrl.length) ?
              <div className='case-images'>
                <img src={pic} />
              </div>
              :
              (otherImg && otherImg.length > awsUrl.length) ?
                <div className='case-images'>
                  <img src={otherImg} />
                </div>
               :
                <div className='thumbnail'
                  style={thumbnailStyle}>
                </div>  
            }
            <div className='result-title-text'>{title}</div>
          </Link>
          <p className='result-author'>
            {firstSubmit}
          </p>
          <p className='result-date'>
            {dateString}
          </p>
        </div>
        :
        <div className="list-item">
          <div className="pic">
          { (pic && pic.length > awsUrl.length) ?
            <div className='case-images'>
              <img src={pic} />
            </div>
            :
            (otherImg && otherImg.length > awsUrl.length) ?
              <div className='case-images'>
                <img src={otherImg} />
              </div>
             :
              <div className='thumbnail'
                style={thumbnailStyle}>
              </div>  
          }
          </div>
          <div className="desc">
            <div className='result-title-text'>{title}</div>
            <p className='result-author'>
              {firstSubmit}
            </p>
            <p className='result-date'>
              {dateString}
            </p>
          </div>
        </div>
        }
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
