import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './SearchHit.css'
import CSSModules from 'react-css-modules'
import {injectIntl, intlShape} from 'react-intl'

class SearchHit extends React.Component {

  getInnerHTML () {
    return {__html: this.props.case._source.ArticleHTML}
  }
  render () {
    try {
      let result = this.props.case._source
      var locale = this.props.intl.locale
      // console.log(result)
      let title, link
      if (result.CaseID) {
        title = 'Case: ' + result.CaseID
        link = '/' + locale + '/case/' + result.NodeId
      } else {
        title = 'Method: ' + result.Title
        link = '/' + locale + '/method/' + result.methodID
      }
      let firstSubmit = result.FirstSubmit
      if (!title) {
        console.log('missing title: ', result)
      }
      let dateString = new Date(result.LastUpdatedDate).toDateString()
      let blob = (
        <div styleName='result'>
          <Link to={link} styleName='result-title'>
            <div styleName='thumbnail'
              style={{backgroundImage: 'url(/img/pp-thumbnail-1.jpg)'}} />
            {title}
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
    } catch (e) {
      console.trace(e)
    }
  }
}

SearchHit.propTypes = {
  case: PropTypes.object.isRequired,
  intl: intlShape.isRequired
}

export default injectIntl(CSSModules(SearchHit, styles))
