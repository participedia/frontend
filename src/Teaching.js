import React from 'react'
import AccordionTab from './components/AccordionTab'
import SubAccordionTab from './components/SubAccordionTab'
// import './Teaching.css'

class Teaching extends React.Component {

  render () {
    return (
      <div className="about">
        <h1>Teaching</h1>
        <h2>Writing or editing articles for Participedia can be a great assignment for courses that deal with political participation, democratic innovation, or deliberation.</h2>
        <h2>Teaching Resources</h2>
        <div className="text">We’ve collected a variety of teaching resources from the Participedia network and extended academic community. Feel free to adjust the material to suit your class’s needs.</div>
        <div className="accordion">
          <AccordionTab title="Assignments & Grading Rubrics">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Syllabi">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
              <div className="sub-accordion">
                <SubAccordionTab title="Syllabi Category 1">
                  <div className="sub-content">
                    <p className="name">Name of downloadable content</p>
                    <p className="department">Description / authorship of document</p>
                    <p className="name">Name of downloadable content</p>
                    <p className="department">Description / authorship of document</p>
                    <p className="name">Name of downloadable content</p>
                    <p className="department">Description / authorship of document</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Syllabi Category 1">
                  <div className="sub-content">
                    <p className="name">Name of downloadable content</p>
                    <p className="department">Description / authorship of document</p>
                    <p className="name">Name of downloadable content</p>
                    <p className="department">Description / authorship of document</p>
                    <p className="name">Name of downloadable content</p>
                    <p className="department">Description / authorship of document</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Syllabi Category 1">
                  <div className="sub-content">
                    <p className="name">Name of downloadable content</p>
                    <p className="department">Description / authorship of document</p>
                    <p className="name">Name of downloadable content</p>
                    <p className="department">Description / authorship of document</p>
                    <p className="name">Name of downloadable content</p>
                    <p className="department">Description / authorship of document</p>
                  </div>
                </SubAccordionTab>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab title="Class Slides">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Simulations & Exercises">
            <div className="content">
              <p className="text">Description of simulations &amp; exercises.</p>
                <div className="sub-content">
                  <p className="name">Name of downloadable content</p>
                  <p className="department">Description / authorship of document</p>
                  <p className="name">Name of downloadable content</p>
                  <p className="department">Description / authorship of document</p>
                </div>
            </div>
          </AccordionTab>
          <AccordionTab title="Lesson Plans">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
        </div>
      </div>
    )
  }
}

export default Teaching
