import React from 'react' // eslint-disable-line no-unused-vars 
import AccordionTab from './components/AccordionTab/AccordionTab'
import './About.css'

class Research extends React.Component {

  render () {
    return (
      <div className="about more-orange">
        <h1>Research</h1>
        <h2>Participedia is guided by the research question: What kinds of participatory processes work best, for what purposes, and under what conditions?</h2>
        <div className="accordion">
          <AccordionTab title="Methodology">
            <div className="content">
              <p className="text">The strategy is simple: crowdsource data on democratic innovations from around the world and then aggregate this into a public database that continually updates with new contributions. All of Participedia’s content and data is open source.<br /><br />For an in-depth explanation of the history, aspirations, theory and analytical approach of Participedia, see ‘<a href="#">The Participedia Project: An Introduction</a>’, by the two founders of Participedia, Archon Fung and Mark E. Warren.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Data Repository">
            <div className="content">
              <p className="text">A great deal of research on democratic innovations is not publicly available. This includes large datasets, graduate and postgraduate dissertations, and practitioner evaluations and reports. We aim to find a home for such research in an accessible data repository.</p>
              <div className="sub-content">
                <p className="name">Dataset on Brazilian Participatory Budgeting: 1989 to 2012</p>
                <p className="department">Description / authorship of document</p>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab title="Surveys">
            <div className="content">
              <p className="text">Surveys are supplementary to Participedia’s current data and narrative descriptions and are intended to gain further insight on the outcomes and effects of cases.<br /><br />The <a href="#">Participant Survey</a> will capture the experience of participants directly involved in a participatory process. It could be delivered by organizers at the location of a particular process, or participants could be asked to complete the survey after the event.<br /><br />The <a href="#">Observer Survey</a> will capture views pertaining to the broader impact of a particular case. ‘Observers’ include practitioners, participants or researchers with particular knowledge of that case.</p>
            </div>
          </AccordionTab>
        </div>
      </div>
    )
  }
}

export default Research
