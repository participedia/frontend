import React from 'react'
import AccordionTab from './components/AccordionTab'
import SubAccordionTab from './components/SubAccordionTab'
import styles from './About.sass'
import CSSModules from 'react-css-modules'

class Teaching extends React.Component {

  render () {
    return (
      <div styleName="about">
        <h1>Teaching</h1>
        <h2>Writing or editing articles for Participedia can be a great assignment for courses that deal with political participation, democratic innovation, or deliberation.</h2>
        <h2>Teaching Resources</h2>
        <div styleName="text">We’ve collected a variety of teaching resources from the Participedia network and extended academic community. Feel free to adjust the material to suit your class’s needs.</div>
        <div styleName="accordion">
          <AccordionTab title="Assignments & Grading Rubrics">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Sylibi">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
              <div styleName="sub-accordion">
                <SubAccordionTab title="Sylibi Category 1">
                  <div styleName="sub-content">
                    <p styleName="name">Name of downloadable content</p>
                    <p styleName="department">Description / authorship of document</p>
                    <p styleName="name">Name of downloadable content</p>
                    <p styleName="department">Description / authorship of document</p>
                    <p styleName="name">Name of downloadable content</p>
                    <p styleName="department">Description / authorship of document</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Sylibi Category 1">
                  <div styleName="sub-content">
                    <p styleName="name">Name of downloadable content</p>
                    <p styleName="department">Description / authorship of document</p>
                    <p styleName="name">Name of downloadable content</p>
                    <p styleName="department">Description / authorship of document</p>
                    <p styleName="name">Name of downloadable content</p>
                    <p styleName="department">Description / authorship of document</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Sylibi Category 1">
                  <div styleName="sub-content">
                    <p styleName="name">Name of downloadable content</p>
                    <p styleName="department">Description / authorship of document</p>
                    <p styleName="name">Name of downloadable content</p>
                    <p styleName="department">Description / authorship of document</p>
                    <p styleName="name">Name of downloadable content</p>
                    <p styleName="department">Description / authorship of document</p>
                  </div>
                </SubAccordionTab>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab title="Class Slides">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Simulations & Exercises">
            <div styleName="content">
              <p styleName="text">Description of simulations &amp; exercises.</p>
                <div styleName="sub-content">
                  <p styleName="name">Name of downloadable content</p>
                  <p styleName="department">Description / authorship of document</p>
                  <p styleName="name">Name of downloadable content</p>
                  <p styleName="department">Description / authorship of document</p>
                </div>
            </div>
          </AccordionTab>
          <AccordionTab title="Lesson Plans">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
        </div>
      </div>
    )
  }
}

export default CSSModules(Teaching, styles)