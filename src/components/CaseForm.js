import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const muiTheme = getMuiTheme();

import styles from './CaseForm.css'
import CSSModules from 'react-css-modules'

class CaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {snacking: false, snackMessage: 'a'};
    this.handleSnackClose = this.handleSnackClose.bind(this);
    this.makeFormBit = this.makeFormBit.bind(this);
  }

  makeFormBit = ({heading, key, choices, showIf}) => {
    if (showIf !== undefined && !showIf(this.state)) {
      return (<div></div>);
    }
    let style = {marginBottom: 16};
    let bits = [];
    choices.forEach(function(choice) {
      let [label, value] = choice;
      console.log('VALUE', value, 'LABEL', label);
      bits.push((<RadioButton
            styleName="choice"
            key={value}
            value={value}
            label={label}
          />
        )
      );
    });
    let blob =
      <div key={key}>
        <h4 style={style}>{heading}</h4>
        <RadioButtonGroup styleName="choicelist" name={key}
          onChange={event => this.setState({ [key]: event.target.value })}
        >
          {bits}
        </RadioButtonGroup>
      </div>;
    console.log(blob);
    return blob;
  }


  handleSnackClose = () => {
    this.setState({
      snacking: false,
      snackMessage: 'nothing'
    });
  };
  onSubmit = (v) => {
    console.log(v);
    this.setState({snacking: true, snackMessage:JSON.stringify(v)});
  }
  render() {
    let style = {marginBottom: 16};
    const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
    var parts = [];
    let prefix = (
        <TextField {...firstName}
         key='firstname'
          hintText='First Name'
        />);
    parts.push(prefix);
    let bit = this.makeFormBit({heading:'Was this process a referendum (or plebiscite)',
    key:'DirectDemocracy', choices:[['Yes', 'yes'], ['No', 'no']]});
    console.log(bit)
    parts.push(bit);
    console.log(parts);
    parts.push(this.makeFormBit({
      showIf: (state) => (state.DirectDemocracy == 'no'),
      heading:'Which of the following best describes the type of interaction between participants in this process:',
      key:'InteractionMethod',
      choices:[
        ['Face-to-face discussion', 'facetoface'],
        ['Online discussion', 'online'],
        ['Both face-to-face and online discussion', 'both'],
        ['This process did NOT involve discussion among participants (for instance, it was an artistic or creative process, or involved individualized action, such as signing a petition)', 'neither']
      ]})
     );
     parts.push(this.makeFormBit({heading:'Which of the following best describes the purpose of the process:', key:'DecisionMaking', choices:[
       ['The purpose was to talk about issues but not necessarily solve them or reach a decision.', 'talk'],
       ['The purpose was to make a decision (for instance, to make policy decisions or recommendations).', 'decide']
      ]
    }));

   parts.push(this.makeFormBit({
     heading:'Please indicate which of the following best describes the relationship between participants in the process, and decision-makers (such as governments, or other powerful actors):',
      key:'DecisionMaking_DecisionRole',
      choices:[
       ['The participants acted as decision-makers, and made binding decisions for the larger public. In other words, the decisions made in this process directly translated into law.', '1'],
       ['The participants worked with decision-makers (for instance, government officials) to make decisions or provide social services, such as through participatory budgeting, local partnership boards, or community policing.', '2'],
       ['The participants did not work directly with decision-makers. But they came up with recommendations for consultative purposes. For example, recommendations for the general public to think about, or vote on, recommendations for a government agency, or for a non-governmental organization.', '3'],
       ['The participants did NOT make policy decisions or recommendations.', '4']
   ]}));
   let is123 = (thing) => {
     (thing === '1' || thing === '2' || thing === '3')
   }
  //  parts.push(this.makeFormBit({heading:'', key='', choices=[],
  //       showIf = state => is123(state.DecisionMaking_DecisionRole)));
   //
    parts.push(this.makeFormBit({
        heading:'Please indicate which method best describes how participants reached decisions among themselves, in this process:',
        key:'DecisionMaking_DecisionMethod',
        choices:[
          ['Voting', 'voting'],
          ['Consensus', 'consensus'],
          ['Other', 'other'],
          ['Multiple', 'multiple']
        ]}));

    let middle = (
      <div key='middle'>
        <label>Last Name</label>
        <input type='text' placeholder='Last Name' {...lastName}/>
      </div>
    );
    let submitStyle = {
      margin: '1em',
      textAlign: 'right',
    }
    let suffix =  (
      <div key='suffix'>
        <RaisedButton style={submitStyle} type='submit' onSubmit={this.onSubmit}>Submit</RaisedButton>
      </div>);

    parts.push(suffix);
    let paperStyle = {
      marginLeft: '3em',
      marginRight: '3em',
      marginTop: '2em',
      marginBottom: '2em',
    }

    let formStyle = {
      padding: '3em',
    }

    let blob = (
    <MuiThemeProvider muiTheme={muiTheme}>
    <Paper style={paperStyle}>
      <form styleName="addCaseForm" style={formStyle} onSubmit={handleSubmit}>
        {parts}
      </form>
      </Paper>
    </MuiThemeProvider>
    );
    return blob;
  }
}

export default CSSModules(CaseForm, styles)
