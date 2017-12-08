import React from 'react';
import { makeLocalizedChoices } from "./choices";
import api from "../utils/api";
import { Paper, RaisedButton, SelectField, MenuItem } from "material-ui/";
import sanitizeHTML from 'sanitize-html';
import clipboard from 'clipboard-polyfill';

export default class HumanCitation extends React.Component {

  constructor(props) {
    super(props);
    this.fetchCitation = this.fetchCitation.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);

    this.state = {
      citationSelected: false,
      citation: this.props.intl.formatMessage({ id: "citation_text_placeholder" }),
      menu: null,
      copySuccess: ''
    };
  }

  fetchCitation(event, index, value) {
    var self = this;
    api.fetchCitation(this.props.thing.type, this.props.thing.id, value)
      .then(response => response.text())
      .then(function(data) {
        var cleaned = sanitizeHTML(data, {allowedTags: ['b','i','em','strong']});
        self.setState({citationSelected: true, citation: cleaned, menu: value});
      }).catch(function(error) {
        console.log('Citation request failed', error)
      })
  }

  copyToClipboard(e) {
    var dt = new clipboard.DT();
    var plain = sanitizeHTML(this.state.citation, {allowedTags: []});
    dt.setData("text/plain", plain);
    dt.setData("text/html", this.state.citation);
    clipboard.write(dt);
  }

  render() {
    let { intl } = this.props;
    let choices = makeLocalizedChoices(intl, "citation_human", false);
    return (
      <div>
        <SelectField
          value={this.state.menu}
          autoWidth={true}
          floatingLabelText={intl.formatMessage({ id: "select_citation_format" })}
          onChange={this.fetchCitation} >
          {choices.map(x => <MenuItem key={x.value} value={x.value} primaryText={x.text} />)}
        </SelectField>
        <Paper
          zDepth={1}
          ref={(ref) => {this.citationDisplay = ref}}
          style={{padding: '5px', margin: '5px 0px'}}
          dangerouslySetInnerHTML={{ __html: this.state.citation }}
        />
        <RaisedButton
          onClick={this.copyToClipboard}
          className="customButton"
          disabled={!this.state.citationSelected}
          label={intl.formatMessage({ id: "copy_to_clipboard" })}
        />
      </div>
    )
  }
}
