import React, { PropTypes } from 'react'
import styles from './SearchQueryField.sass'
import CSSModules from 'react-css-modules'

class SearchQueryField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {query: this.props.query} // is there another way?
    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    if (this.props.query === '') {
      this.props.onPerformQuery('', this.props.selectedCategory, this.props.sortingMethod)
    }
  }

  onChange (event) {
    console.log(event, this)
    this.setState({query: event.target.value})
  }

  onKeyUp (val) {
    if (val.keyCode === 13) {
      this.props.onPerformQuery(this.state.query, this.props.selectedCategory, this.props.sortingMethod)
    }
  }

  render () {
    let onChange = this.onChange
    return (
      <input styleName='search-bar' type='text' placeholder='Search' value={this.state.query}
        onChange={onChange} onKeyUp={(val) => this.onKeyUp(val)}></input>
    )
  }
}

SearchQueryField.propTypes = {
  onPerformQuery: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}

export default CSSModules(SearchQueryField, styles)
// export default SearchQueryField
