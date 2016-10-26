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
        <h2>Writing or editing articles for Participedia can be a great assignment for courses that deal with political participation, democratic innovation, or deliberation.</h2>
        <h2>Research Resources</h2>
        <div className="text">We’ve collected a variety of teaching resources from the Participedia network and extended academic community. Feel free to adjust the material to suit your class’s needs.</div>
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
