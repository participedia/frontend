import React from "react";
import ChipInput from "material-ui-chip-input";
import omit from "object-omit";

export default class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  handleRequestAdd(chip) {
    // require that the chip be one of the autocompleted ones
    let isValid = false;
    if (this.props.passProps.dataSourceConfig) {
      isValid = this.props.passProps.dataSource.value.filter(
        c => c[this.props.passProps.dataSourceConfig.value] == chip
      );
    } else {
      isValid = this.props.passProps.dataSource.filter(c => c == chip);
    }

    if (isValid.length == 0) {
      return;
    }

    let value = [...this.state.value, chip];
    this.setState({
      value: value
    });
    this.handleChange(value);
  }

  handleRequestDelete(deletedChipValue) {
    let value;
    if (this.props.passProps.dataSourceConfig) {
      value = this.state.value.filter(
        c => c[this.props.passProps.dataSourceConfig.value] !== deletedChipValue
      );
    } else {
      value = this.state.value.filter(c => c !== deletedChipValue);
    }
    this.setState({
      value: value
    });
    this.handleChange(value);
  }

  render() {
    let rest = omit(this.props, [
      "intl",
      "thing",
      "property",
      "dataSource",
      "dataSourceConfig",
      "useHint",
      "errorMessage",
      "fieldSchema",
      "fieldName",
      "schema",
      "passProps"
    ]);
    let handleRequestAdd = this.handleRequestAdd.bind(this);
    let handleRequestDelete = this.handleRequestDelete.bind(this);
    let value = this.state.value; // if no dataSourceConfig, assume a list of strings
    return (
      <ChipInput
        {...rest}
        value={value}
        onRequestAdd={handleRequestAdd}
        maxSearchResults={this.props.passProps.maxSearchResults}
        filter={this.props.passProps.filter}
        onRequestDelete={handleRequestDelete}
        fullWidth
        fullWidthInput
        dataSource={this.props.passProps.dataSource}
        dataSourceConfig={this.props.passProps.dataSourceConfig}
        onBlur={event => {
          if (this.props.addOnBlur && event.target.value) {
            this.handleRequestAdd(event.target.value);
          }
        }}
      />
    );
  }
}
