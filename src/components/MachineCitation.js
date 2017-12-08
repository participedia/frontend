import React from 'react';
import { makeLocalizedChoices } from "./choices";
import api from "../utils/api";
import { Form } from "simple-react-form";
import { RaisedButton, SelectField, MenuItem } from "material-ui/";
import fileDownload from "js-file-download";

export default class MachineCitation extends React.Component {

  constructor(props) {
    super(props);
    this.exportCitation = this.exportCitation.bind(this);
    this.fetchCitation = this.fetchCitation.bind(this);

    this.state = {
      citationSelected: false,
      format: null,
      menu: null
    };
  }

  exportCitation() {
    api.fetchCitation(this.props.thing.type, this.props.thing.id, this.state.format)
      .then(function(response) {
        var filename = response.headers.get('content-disposition').match(/filename="(.+)"/)[1];
        response.text().then(function (text) {
          fileDownload(text, filename);
        });
      }).catch(function(error) {
        console.log('request failed', error)
      })
  }

  fetchCitation(event, index, value) {
    this.setState({citationSelected: true, format: value, menu: value});
  }

  render() {
    let { intl } = this.props;
    let choices = makeLocalizedChoices(intl, "citation_machine", false);
    return (
      <Form className="inline">
        <SelectField
          value={this.state.menu}
          autoWidth={true}
          floatingLabelText={intl.formatMessage({ id: "select_citation_export_format" })}
          style={{
            marginRight: '15px',
          }}
          onChange={this.fetchCitation} >
          {choices.map(x => <MenuItem key={x.value} value={x.value} primaryText={x.text} />)}

        </SelectField>
        <RaisedButton
          onClick={this.exportCitation}
          className="customButton"
          disabled={!this.state.citationSelected}
          label={intl.formatMessage({ id: "export_citation_file" })}
          style={{
            position: 'relative',
            top: '-20px',
          }}
        />
      </Form>
    )
  }
}
