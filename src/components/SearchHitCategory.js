import React from 'react'

class SearchHitCategory extends React.Component {
  render () {
    if (this.props.results.length) {
      return (
        <div className="result-category">
          <div className="category-title">
            {this.props.title}
          </div>
          <div className="results">
            {this.props.results}
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

export default SearchHitCategory
