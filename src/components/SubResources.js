import React from 'react'
import './SubAccordionTab.css'

class SubResources extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="sub-content"> 
        <p className="name">{this.props.info.name}</p>
        <p className="department">{this.props.info.department}</p>
      </div>
    )
  }
}

export default SubResources