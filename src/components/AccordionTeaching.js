import React from 'react'
import './AccordionTeaching.css'
import SubResources from './SubResources'

class AccordionTeaching extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className={(this.state.open ? 'tab-open' : 'tab')}>
        <p className="title" onClick={() => {this.setState({open: !this.state.open})}}>{this.props.details.title}</p>
        <div className="content">
          <div className="resource-desc" dangerouslySetInnerHTML={ {__html: this.props.details.desc} } />
            {
              this.props.details.categories ?
                Object
                .keys(this.props.details.categories)  
                .map(key => 
                  <div key={key} className="subtab">  
                    <p className="title">{key}</p>
                    {
                      Object
                      .keys(this.props.details.categories[key])
                      .map(resource => <SubResources key={resource} info={this.props.details.categories[key][resource]} />)
                    }
                  </div>  
                )
              :
              undefined  
            }
        </div>
      </div>
    )
  }
}

export default AccordionTeaching
