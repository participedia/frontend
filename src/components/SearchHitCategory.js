import React from 'react'
import styles from './SearchHitCategory.css'
import CSSModules from 'react-css-modules'
import {injectIntl, intlShape} from 'react-intl'

class SearchHitCategory extends React.Component {
  render () {
    if (this.props.results.length) {
      return (
        <div styleName='result-category'>
          <div styleName='category-title'>
            {this.props.title}
          </div>
          <div styleName='results'>
            {this.props.results}
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    };
  }
}

SearchHitCategory.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(CSSModules(SearchHitCategory, styles))
