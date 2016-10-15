import React from 'react'
import './SubAccordionTab.css'

class SubAccordionTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className={(this.state.open?"tab-open":"tab")}>
        <p className="title" onClick={() => {this.setState({open: !this.state.open})}}>{this.props.title}</p>
        {this.props.children}
      </div>
    )
  }
}

export default SubAccordionTab