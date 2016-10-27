import React from 'react'
import {Link} from 'react-router'
import './HelpBar.css'

const helpItems = [
  "What is a case?",
  "What is a method?",
  "What is an organization?",
  "How do I create a user account?",
  "How do I create content?",
  "What is Quick Submit?",
  "How do I save my draft entry?",
  "How do I edit content?",
  "Can I see who has edited my content?",
  "How do I create content in another language?",
  "Can I translate existing content into another language?",
  "How do I search for content?",
  "How do I download and interpret data from my search results?",
  "How do I access my bookmarked content?"
];

class HelpBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: '',
      helpItems: helpItems,
      filteredHelpItems: helpItems
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.setState({query: event.target.value}, () => this.filterHelp());
  }

  filterHelp () {
    let query = this.state.query;
    let allItems = this.state.helpItems;
    let filteredItems = [];
    for (var i = 0; i < allItems.length; i++) {
      let item = allItems[i];
      if (item.toLowerCase().indexOf(query.toLowerCase()) > -1)
        filteredItems.push(item);
    }
    this.setState({ filteredHelpItems: filteredItems });
  }

  render () {
    let onChange = this.onChange
    return (
      <div className="help-bar">
        <div className="top-area">
          <div className="top-area-inner">
            <div className="title-section">
              <h2 className="help-title">Participedia Help</h2>
              <Link to={this.props.currentPath} className="close-help"></Link>
            </div>
            <div className="search-box-section">
              <input className='search-input' value={this.state.query || ''} type='text' placeholder='Search Help' onChange={onChange}></input>
            </div>
          </div>
        </div>
        <div className="data-section">
          <h3 className="data-title">FAQ</h3>
          <ul className="data-list">
            {this.state.filteredHelpItems.map((item, i) => (
              <li key={i}><Link to={'/' + this.props.locale + '/help/1'}>{item}</Link></li>
            ))}
            {(this.state.filteredHelpItems.length === 0)?<li><a>No results found.</a></li>:null}
          </ul>
        </div>
      </div>
    )
  }
}

export default HelpBar
