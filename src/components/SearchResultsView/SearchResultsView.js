import React, { PropTypes } from 'react'
import SearchHit from '../../components/SearchHit/SearchHit'
import SearchHitCategory from '../../components/SearchHitCategory/SearchHitCategory'
import { Container, Row, Col } from 'reactstrap';
import './SearchResultsView.css'
import {injectIntl, intlShape} from 'react-intl'
import preventDefault from 'react-prevent-default'
import searchGridIcon from '../../img/pp-search-grid-icon.png'
import searchGridIconActive from '../../img/pp-search-grid-icon-active.png'
import searchListIcon from '../../img/pp-search-list-icon.png'
import searchListIconActive from '../../img/pp-search-list-icon-active.png'

class SearchResultsView extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    let data = this.props.data
    let categories = {'case': [], 'organization': [], 'method': [], 'news': []}
    let selectedViewType = this.props.selectedViewType

    data.forEach(function (batch) {
      let category = categories[batch.type]
      batch.hits.forEach(function (hit, index) {
        category.push(<SearchHit selectedViewType={selectedViewType} key={index} record={hit} />)
      })
    })

    let includeCases = this.props.selectedCategory === 'All' || this.props.selectedCategory === 'Cases'
    let includeMethods = this.props.selectedCategory === 'All' || this.props.selectedCategory === 'Methods'
    let includeNews = this.props.selectedCategory === 'All' || this.props.selectedCategory === 'News'
    let includeOrgs = this.props.selectedCategory === 'All' || this.props.selectedCategory === 'Organizations'

    let cases = includeCases ? categories['case'] : []
    let methods = includeMethods ? categories['method'] : []
    let orgs = includeOrgs ? categories['organization'] : []
    let news = includeNews ? categories['news'] : []

    let resultsCount = cases.length + methods.length + orgs.length + news.length
    let query = this.props.query
    let results = ''
    if (this.props.searching) {
      results = (        
        <div>
          <h3>Searching for {query}</h3>
        </div>
        )
    } else {
      results = (
        <div className='result-count'>
          <p>
            {resultsCount} Result
            {(resultsCount === 1) ? '' : 's'}
          </p>
          <div className='results-box'>
            <SearchHitCategory title='News' results={news} />
            <SearchHitCategory title='Cases' results={cases} />
            <SearchHitCategory title='Methods' results={methods} />
            <SearchHitCategory title='Organizations' results={orgs} />
          </div>
        </div>
      )
    }
    return (
      <div className='main-contents'>
        <Container className='search-results-component' fluid='true'>
          <Col md='3' className='sidepanel hidden-sm-down'>
            <div className={'sorting-options' + ((this.state.sortingSelectionOpen) ? ' open-mobile-menu' : '')}>
              <p className='current-sorting-selection' onClick={() => { this.setState({sortingSelectionOpen: !this.state.sortingSelectionOpen}) }}>{this.props.intl.formatMessage({id: this.props.sortingMethod})}</p>
              <a href='#' onClick={this.props.onSortingChange.bind(this,
                  this.props.query, this.props.selectedCategory, 'featured')}
                className={(this.props.sortingMethod === 'featured') ? 'selected' : 'unselected'}>{this.props.intl.formatMessage({id: 'featured'})}</a>
              <a href='#' onClick={this.props.onSortingChange.bind(this,
                  this.props.query, this.props.selectedCategory, 'chronological')}
                className={(this.props.sortingMethod === 'chronological') ? 'selected' : 'unselected'}>
                  {this.props.intl.formatMessage({id: 'chronological'})}
              </a>
              <a href='#' onClick={this.props.onSortingChange.bind(this,
                  this.props.query, this.props.selectedCategory, 'alphabetical')}
                className={(this.props.sortingMethod === 'alphabetical') ? 'selected' : 'unselected'}>{this.props.intl.formatMessage({id: 'alphabetical'})}</a>
            </div>
          </Col>
          <Col md='9'>
            <div className='clearfix search-actions-area'>
              <div className='filters'>
                <a href='#' onClick={preventDefault(this.props.onCategoryChange.bind(this, 'All'))}
                  className={(this.props.selectedCategory === 'All') ? 'selected' : 'unselected'}>All</a>
                <a href='#' onClick={preventDefault(this.props.onCategoryChange.bind(this, 'News'))}
                  className={(this.props.selectedCategory === 'News') ? 'selected' : 'unselected'}>News</a>
                <a href='#' onClick={preventDefault(this.props.onCategoryChange.bind(this, 'Cases'))}
                  className={(this.props.selectedCategory === 'Cases') ? 'selected' : 'unselected'}>Cases</a>
                <a href='#' onClick={preventDefault(this.props.onCategoryChange.bind(this, 'Methods'))}
                  className={(this.props.selectedCategory === 'Methods') ? 'selected' : 'unselected'}>Methods</a>
                <a href='#' onClick={preventDefault(this.props.onCategoryChange.bind(this, 'Organizations'))}
                  className={(this.props.selectedCategory === 'Organizations') ? 'selected' : 'unselected'}>Organizations</a>
              </div>
              <div className='view-types'>
                <a href='#' onClick={preventDefault(this.props.onLayoutChange.bind(this, 'grid'))}
                  className={(this.props.selectedViewType === 'grid') ? 'selected' : 'unselected'}>
                  <img src={searchGridIcon} className='grid-icon' alt='' />
                  <img src={searchGridIconActive} className='grid-icon' alt='' />
                </a>
                <a href='#' onClick={preventDefault(this.props.onLayoutChange.bind(this, 'list'))}
                  className={(this.props.selectedViewType === 'list') ? 'selected' : 'unselected'}>
                  <img src={searchListIcon} className='list-icon' alt='' />
                  <img src={searchListIconActive} className='list-icon' alt='' />
                </a>
                <a href='#' onClick={this.props.startDownload.bind(this)}>
                  <img src='../img/pp-search-dl-icon.png' className='dl-icon' alt=''></img>
                </a>
              </div>
            </div>
            {results}
          </Col>
        </Container>
      </div>
    )
  }
}

SearchResultsView.propTypes = {
  data: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  startDownload: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

let config = {allowMultiple: true}

export default injectIntl(SearchResultsView, config)
