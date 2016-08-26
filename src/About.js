import React from 'react'
import AccordionTab from './components/AccordionTab'
import SubAccordionTab from './components/SubAccordionTab'
import styles from './About.sass'
import CSSModules from 'react-css-modules'

class About extends React.Component {

  render () {
    return (
      <div styleName="about">
        <h1>Welcome to Participedia</h1>
        <h2>Anyone can join the Participedia community and help crowdsource, catalogue and compare participatory political processes around the world.</h2>
        <div styleName="accordion">
          <AccordionTab title="Explore">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Create">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
        </div>
        <h2>Community</h2>
        <div styleName="text">Participedia is a research partnership representing institutions and organizations around the world. The team produced Participedia.net as a tool to connect their research and bolster it with publicly crowdsourced knowledge about democratic innovations. All members of the Participedia community are integral to this process. <br /><br />The initial vision for Participedia was developed by Archon Fung (Kennedy School of Government, Harvard University) and Mark E. Warren (Department of Political Science, University of British Columbia), and is guided by a set of standing committees.</div>
        <div styleName="accordion">
          <AccordionTab title="Staff">
            <div styleName="content">
              <p styleName="text">Participedia employs a core staff to maintain day to day operations, support the community and ensure project goals are being met.<a href="#">Pat Scully, Managing Director</a><a href="#">Jesi Carson, Design &amp; Communities Coordinator</a></p>
            </div>
          </AccordionTab>
          <AccordionTab title="Partners">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Committees">
            <div styleName="content">
              <p styleName="text">Committees are comprised of project co-investigators and collaborators, each with one nominated chairperson who sits on the executive committee.</p>
              <div styleName="sub-accordion">
                <SubAccordionTab title="Executive Committee">
                  <div styleName="sub-content">
                    <p styleName="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p styleName="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p styleName="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p styleName="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                    <p styleName="name">Archon Fung, Co-Founder</p>
                    <p styleName="department">Ash Center for Democratic Governance and Innovation<br />Harvard University</p>
                    <p styleName="name">Patrick L. Scully (member ex officio), Managing Director</p>
                    <p styleName="department"></p>
                    <p styleName="name">Graham Smith, Chair, Research Design Committee</p>
                    <p styleName="department">Centre for the Study of Democracy<br />University of Westminster</p>
                    <p styleName="name">Bettina Von Lieres, Chair, Teaching, Training and Mentoring Committee</p>
                    <p styleName="department">Centre for Critical Development Studies<br />University of Toronto-Scarborough</p>
                    <p styleName="name">Mark E. Warren, Project Director and Co-Founder</p>
                    <p styleName="department">Department of Political Science / Centre for the Study of Democratic Institutions<br />University of British Columbia</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Design & Technology Committee">
                  <div styleName="sub-content">
                    <p styleName="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p styleName="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p styleName="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p styleName="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Communications & Knowledge Mobilization Committee">
                  <div styleName="sub-content">
                    <p styleName="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p styleName="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p styleName="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p styleName="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Teaching Training & Mentoring Committee">
                  <div styleName="sub-content">
                    <p styleName="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p styleName="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p styleName="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p styleName="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Research Design Committee">
                  <div styleName="sub-content">
                    <p styleName="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p styleName="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p styleName="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p styleName="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                  </div>
                </SubAccordionTab>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab title="Funders">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Members">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
        </div>
        <h2>Content</h2>
        <div styleName="text">Participedia’s searchable database of democratic innovations is made up of three distinct content types including Cases, Methods and Organizations. Bolstering this knowledge base are added resources, including surveys, teaching tools and external data sets. </div>
        <div styleName="accordion">
          <AccordionTab title="Cases">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Methods">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Organizations">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Surveys">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Datasets">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Teaching Resources">
            <div styleName="content">
              <p styleName="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
        </div>
      </div>
    )
  }
}

export default CSSModules(About, styles)