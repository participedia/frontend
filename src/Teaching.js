import React from 'react'
import AccordionTeaching from './components/AccordionTeaching'
// import './Teaching.css'
import teachingResourcesData from './teaching-resources';


class Teaching extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      teachingResources: teachingResourcesData
    }
  }

  render () {
    return (
      <div className="about">
        <h1>Teaching</h1>
        <h2>Writing or editing articles for Participedia can be a great assignment for courses that deal with political participation, democratic innovation, or deliberation.</h2>
        <h2>Teaching Resources</h2>
        <div className="text">We’ve collected a variety of teaching resources from the Participedia network and extended academic community. Feel free to adjust the material to suit your class’s needs.</div>
        <div className="accordion">
          { 
            Object
            .keys(this.state.teachingResources)
            .map(key => <AccordionTeaching key={key} details={this.state.teachingResources[key]} />)
          }
        </div>
      </div>
    )
  }
}

export default Teaching
