import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './SearchHit.sass'
import CSSModules from 'react-css-modules'
import {injectIntl, intlShape} from 'react-intl'
import moment from 'moment'
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
    console.log("result", result);
    var locale = this.props.intl.locale
    var id = result.id
    var type = result.type_
    console.log(`type: ${type}`)
    // console.log(result)
    let title, link
    title = capitalize(type) + ': ' + result.title_en
    link = `/${locale}/${type}/${id}`
    let firstSubmit = moment(result.post_date).format("dddd, MMMM Do YYYY")
    if (!title) {
      console.log('missing title: ', result)
    }
    let dateString = new moment(result.lastmodified).fromNow()
    let blob = (
      <div styleName='result'>
        <Link to={link} styleName='result-title'>
          <div styleName='thumbnail'
            style={{backgroundImage: 'url(/img/pp-thumbnail-1.jpg)'}} />
          <div styleName='result-title-text'>{title}</div>
        </Link>
        <p styleName='result-author'>
          {firstSubmit}
        </p>
        <p styleName='result-date'>
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

export default injectIntl(CSSModules(SearchHit, styles))
