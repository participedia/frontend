import React from 'react'
import './SearchHitCategory.css'
import {injectIntl, intlShape} from 'react-intl'

class SearchHitCategory extends React.Component {
  render () {
    if (this.props.results.length) {
      return (
        <div className='result-category'>
          <div className='category-title'>
            {this.props.title}
          </div>
          <div className='row results'>
            {this.props.results}
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

SearchHitCategory.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(SearchHitCategory)
