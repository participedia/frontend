import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import { FormattedMessage } from "react-intl";
import InfoBox from "./InfoBox";

export default class SearchableRelatedEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: props.value
        ? { label: props.value.title, value: props.value.id }
        : null,
      options: this.props.passProps.dataSource.map(item => ({
        label: item.text,
        value: item.value
      }))
    };
    this.updateValue = this.updateValue.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      selectValue: props.value
        ? {
            label: props.value.title || props.value.label,
            value: props.value.id || props.value.value
          }
        : null
    });
  }

  updateValue(selectedOption) {
    let value = null;
    if (selectedOption) {
      for (let i = 0; i < this.state.options.length; i++) {
        if (this.state.options[i].value === selectedOption) {
          value = this.state.options[i];
          break;
        }
      }
    }
    this.props.onChange(value);
  }

  render() {
    return (
      <div>
        <h3 className="sub-heading">
          <FormattedMessage id={this.props.fieldName} />
        </h3>
        <p className="explanatory-text">
          <FormattedMessage id={this.props.fieldName + "_instructional"} />
          {this.props.passProps.info ? (
            <InfoBox info={this.props.passProps.info} />
          ) : (
            undefined
          )}
        </p>
        <Select
          id="state-select"
          ref="stateSelect"
          className="custom-select"
          options={this.state.options}
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
}
