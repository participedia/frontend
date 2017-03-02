import React from 'react' // eslint-disable-line no-unused-vars 
import { Container, Row, Col } from 'reactstrap'
import AccordionTab from './components/AccordionTab/AccordionTab'
import './About.css'
import {injectIntl} from 'react-intl'

class About extends React.Component {

  render () {
    return (
      <Container fluid={false} className='about'>
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <h1>{this.props.intl.formatMessage({id: 'welcome_participedia'})}</h1>
            <h2>{this.props.intl.formatMessage({id: 'about_intro'})}</h2>
            <div className="accordion">
              <AccordionTab title={this.props.intl.formatMessage({id: 'explore'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'explore_intro'})}</p>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'create'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'create_intro'})}</p>
                </div>
              </AccordionTab>
            </div>
            <h2>{this.props.intl.formatMessage({id: 'community'})}</h2>
            <div className="text">{this.props.intl.formatMessage({id: 'community_intro'})}</div>
            <div className="accordion">
              <AccordionTab title={this.props.intl.formatMessage({id: 'staff'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'staff_intro'})}
                    <a className="people" href="#">{this.props.intl.formatMessage({id: 'pat_scully'})}</a>
                    <a className="people" href="#">{this.props.intl.formatMessage({id: 'jesi_carson'})}</a>
                  </p>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'partners'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'partners_intro'})}</p>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'committees'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'committees_intro'})}</p>
                  <div className="sub-accordion">
                    <AccordionTab title={this.props.intl.formatMessage({id: 'executive_committee'})}>
                      <div className="sub-content">
                        <p className="name">{this.props.intl.formatMessage({id: 'marco_adria'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'marco_adria_dept'})}</p>
                        <p className="name">{this.props.intl.formatMessage({id: 'amber_frid'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'amber_frid_dept'})}</p>
                        <p className="name">{this.props.intl.formatMessage({id: 'archon_fung'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'archon_fung_dept'})}</p>
                        <p className="name">{this.props.intl.formatMessage({id: 'patrick_scully'})}</p>
                        <p className="department"></p>
                        <p className="name">{this.props.intl.formatMessage({id: 'graham_smith'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'graham_smith_dept'})}</p>
                        <p className="name">{this.props.intl.formatMessage({id: 'bettina_von'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'bettina_von_dept'})}</p>
                        <p className="name">{this.props.intl.formatMessage({id: 'mark_warren'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'mark_warren_dept'})}</p>
                      </div>
                    </AccordionTab>
                    <AccordionTab title={this.props.intl.formatMessage({id: 'dt_committee'})}>
                      <div className="sub-content">
                        <p className="name">{this.props.intl.formatMessage({id: 'marco_adria'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'marco_adria_dept'})}</p>
                        <p className="name">{this.props.intl.formatMessage({id: 'amber_frid'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'amber_frid_dept'})}</p>
                      </div>
                    </AccordionTab>
                    <AccordionTab title={this.props.intl.formatMessage({id: 'communications_knowledge_committee'})}>
                      <div className="sub-content">
                        <p className="name">{this.props.intl.formatMessage({id: 'marco_adria'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'marco_adria_dept'})}</p>
                        <p className="name">{this.props.intl.formatMessage({id: 'amber_frid'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'amber_frid_dept'})}</p>
                      </div>
                    </AccordionTab>
                    <AccordionTab title={this.props.intl.formatMessage({id: 'teaching_training_committee'})}>
                      <div className="sub-content">
                        <p className="name">{this.props.intl.formatMessage({id: 'marco_adria'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'marco_adria_dept'})}</p>
                        <p className="name">{this.props.intl.formatMessage({id: 'amber_frid'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'amber_frid_dept'})}</p>
                      </div>
                    </AccordionTab>
                    <AccordionTab title={this.props.intl.formatMessage({id: 'research_design_committee'})}>
                      <div className="sub-content">
                        <p className="name">{this.props.intl.formatMessage({id: 'marco_adria'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'marco_adria_dept'})}</p>
                        <p className="name">{this.props.intl.formatMessage({id: 'amber_frid'})}</p>
                        <p className="department">{this.props.intl.formatMessage({id: 'amber_frid_dept'})}</p>
                      </div>
                    </AccordionTab>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'funders'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'funders_intro'})}</p>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'members'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'members_intro'})}</p>
                </div>
              </AccordionTab>
            </div>
            <h2>{this.props.intl.formatMessage({id: 'content'})}</h2>
            <div className="text">{this.props.intl.formatMessage({id: 'content_intro'})}</div>
            <div className="accordion">
              <AccordionTab title={this.props.intl.formatMessage({id: 'cases'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'cases_content'})}</p>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'methods'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'methods_content'})}</p>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'organizations'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'organizations_content'})}</p>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'surveys'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'surveys_content'})}</p>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'datasets'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'datasets_content'})}.</p>
                </div>
              </AccordionTab>
              <AccordionTab title={this.props.intl.formatMessage({id: 'teaching_resources'})}>
                <div className="content">
                  <p className="text">{this.props.intl.formatMessage({id: 'teaching_resources_content'})}</p>
                </div>
              </AccordionTab>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default injectIntl(About)
