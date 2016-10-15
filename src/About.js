import React from 'react' // eslint-disable-line no-unused-vars 
import AccordionTab from './components/AccordionTab'
import SubAccordionTab from './components/SubAccordionTab'
import './About.css'

class About extends React.Component {

  render () {
    return (
      <div className="about">
        <h1>Welcome to Participedia</h1>
        <h2>Anyone can join the Participedia community and help crowdsource, catalogue and compare participatory political processes around the world.</h2>
        <div className="accordion">
          <AccordionTab title="Explore">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Create">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
        </div>
        <h2>Community</h2>
        <div className="text">Participedia is a research partnership representing institutions and organizations around the world. The team produced Participedia.net as a tool to connect their research and bolster it with publicly crowdsourced knowledge about democratic innovations. All members of the Participedia community are integral to this process. <br /><br />The initial vision for Participedia was developed by Archon Fung (Kennedy School of Government, Harvard University) and Mark E. Warren (Department of Political Science, University of British Columbia), and is guided by a set of standing committees.</div>
        <div className="accordion">
          <AccordionTab title="Staff">
            <div className="content">
              <p className="text">Participedia employs a core staff to maintain day to day operations, support the community and ensure project goals are being met.<a href="#">Pat Scully, Managing Director</a><a href="#">Jesi Carson, Design &amp; Communities Coordinator</a></p>
            </div>
          </AccordionTab>
          <AccordionTab title="Partners">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Committees">
            <div className="content">
              <p className="text">Committees are comprised of project co-investigators and collaborators, each with one nominated chairperson who sits on the executive committee.</p>
              <div className="sub-accordion">
                <SubAccordionTab title="Executive Committee">
                  <div className="sub-content">
                    <p className="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p className="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p className="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p className="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                    <p className="name">Archon Fung, Co-Founder</p>
                    <p className="department">Ash Center for Democratic Governance and Innovation<br />Harvard University</p>
                    <p className="name">Patrick L. Scully (member ex officio), Managing Director</p>
                    <p className="department"></p>
                    <p className="name">Graham Smith, Chair, Research Design Committee</p>
                    <p className="department">Centre for the Study of Democracy<br />University of Westminster</p>
                    <p className="name">Bettina Von Lieres, Chair, Teaching, Training and Mentoring Committee</p>
                    <p className="department">Centre for Critical Development Studies<br />University of Toronto-Scarborough</p>
                    <p className="name">Mark E. Warren, Project Director and Co-Founder</p>
                    <p className="department">Department of Political Science / Centre for the Study of Democratic Institutions<br />University of British Columbia</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Design & Technology Committee">
                  <div className="sub-content">
                    <p className="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p className="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p className="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p className="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Communications & Knowledge Mobilization Committee">
                  <div className="sub-content">
                    <p className="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p className="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p className="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p className="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Teaching Training & Mentoring Committee">
                  <div className="sub-content">
                    <p className="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p className="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p className="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p className="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                  </div>
                </SubAccordionTab>
                <SubAccordionTab title="Research Design Committee">
                  <div className="sub-content">
                    <p className="name">Marco Adria, Chair, Communication and Knowledge Mobilization Committee</p>
                    <p className="department">Centre for Public Involvement<br />University of Alberta</p>
                    <p className="name">Amber Frid-Jimenez, Chair, Design &amp; Technology Committee</p>
                    <p className="department">Faculty of Design + Dynamic Media<br />Emily Carr University of Art + Design</p>
                  </div>
                </SubAccordionTab>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab title="Funders">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Members">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
        </div>
        <h2>Content</h2>
        <div className="text">Participedia’s searchable database of democratic innovations is made up of three distinct content types including Cases, Methods and Organizations. Bolstering this knowledge base are added resources, including surveys, teaching tools and external data sets. </div>
        <div className="accordion">
          <AccordionTab title="Cases">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Methods">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Organizations">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Surveys">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Datasets">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Teaching Resources">
            <div className="content">
              <p className="text">Search, read, download and gain insight from our database of cases, methods, organizations, surveys, teaching resources and data sets. Try using Participedia in the classroom as a tool to engage students and showcase their research.</p>
            </div>
          </AccordionTab>
        </div>
      </div>
    )
  }
}

export default About
