import React from 'react'
import AccordionTeaching from './components/AccordionTeaching'
// import './Teaching.css'
import researchResourcesData from './research-resources';


class Resources extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      researchResources: researchResourcesData
    }
  }

  render () {
    return (
      <div className="about">
        <h1>Research</h1>
        <h2>Participedia is guided by the research question: What kinds of participatory processes work best, for what purposes, and under what conditions?</h2>
        <div className="accordion">
          { 
            Object
            .keys(this.state.researchResources)
            .map(key => <AccordionTeaching key={key} details={this.state.researchResources[key]} />)
          }
        </div>
      </div>
    )
  }
}

export default Resources
