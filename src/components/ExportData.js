import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import RaisedButton from 'material-ui/RaisedButton';
import 'react-select/dist/react-select.css';
import api from "../utils/api";
import fileDownload from "js-file-download";

export default class ExportData extends React.Component {

  constructor(props) {
    super(props)

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.exportData = this.exportData.bind(this);

    this.state = {
      selections: [],
    };
  }

  propTypes: {
    thingtype: PropTypes.string,
  };

  handleSelectChange (selections) {
    this.setState({ selections });
    // Reposition the dialog - https://github.com/mui-org/material-ui/issues/5793
    window.dispatchEvent(new Event('resize'));
  }

  convertSelectionsToQueryFilter(selections) {
    // no filtering when nothing selected
    if(selections === undefined || selections === null || selections.length === 0) {
      return {};
    }
    let filter = {};
    for(let i = 0; i < selections.length; i++) {
      let pair = selections[i];
      filter[pair["value"]] = false;
    }
    return filter;
  }

  exportData (accept) {
    var filter = this.convertSelectionsToQueryFilter(this.state.selections);
    api.fetchAllThings(this.props.thingtype, accept, filter)
    .then(function(response) {
      var filename = response.headers.get('content-disposition').match(/filename="(.+)"/)[1];
      // Need to extract JSON data from the { OK: true, ... } structure
      if (response.headers.get('content-type') === "application/json") {
        response.json().then(function (json) {
          fileDownload(JSON.stringify(json.data), filename);
        });
      } else {
        response.text().then(function (text) {
          fileDownload(text, filename);
        });
      }
    });
  }

  render () {
    let { intl } = this.props;
    const buttonStyle = {
        margin: '12px',
      };
    return (
      <div>
        <div className="section">
          <h3 className="section-heading">{this.props.label}</h3>
          <div style={{position: "relative"}}>
            <Select
              closeOnSelect={false}
              multi
              onChange={this.handleSelectChange}
              options={this.props.options}
              placeholder={this.props.placeholder}
              removeSelected={true}
              value={this.state.selections}
              menuContainerStyle={{
                position: "fixed",
                zIndex: 500,
                top: "auto",
                width: "400px",
              }}
            />
          </div>
        </div>
        <RaisedButton
          label={intl.formatMessage({ id: "export_csv" })}
          style={buttonStyle}
          onClick={this.exportData.bind(this, "text/csv")}
        />
        <RaisedButton
          label={intl.formatMessage({ id: "export_xml" })}
          style={buttonStyle}
          onClick={this.exportData.bind(this, "application/xml")}
        />
        <RaisedButton
          label={intl.formatMessage({ id: "export_json" })}
          style={buttonStyle}
          onClick={this.exportData.bind(this, "application/json")}
        />
      </div>
    );
  }
}
