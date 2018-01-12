import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FormattedMessage } from "react-intl";
import InfoBox from "./InfoBox";

export default class SearchableRelatedEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: null,
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue (newValue) {
    this.setState({
      selectValue: newValue,
    });
    this.props.onChange(newValue);
  }

  render () {
    var myOptions = this.props.passProps.dataSource

    for (let item of myOptions) {
      item['label'] = item['text']
    }

    return (
      <div>
        <h3 className="sub-heading"><FormattedMessage id={this.props.fieldName} /></h3>
        <p className="explanatory-text"><FormattedMessage id={this.props.fieldName + "_instructional"} />{this.props.passProps.info ? <InfoBox info={this.props.passProps.info} /> : undefined}</p>
        <Select
          id="state-select"
          ref="stateSelect"
          className="custom-select"
          autoFocus
          options={myOptions}
          placeholder={this.props.passProps.placeholder}
          simpleValue
          clearable={true}
          name="selected-state"
          disabled={false}
          value={this.state.selectValue}
          onChange={this.updateValue}
          rtl={false}
          openOnClick={false}
          searchable={true}
        />
      </div>
    );
  }
};
