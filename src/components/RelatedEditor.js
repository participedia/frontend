import React from "react";
import ChipInput from "material-ui-chip-input";
import omit from "object-omit";
import { FormattedMessage } from "react-intl";
import InfoBox from "./InfoBox";

export default class Related extends React.Component {
  constructor(props) {
    super(props);
    console.log("RelatedEditor constructor %s: %o", props.fieldName, props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.handleRequestAdd = this.handleRequestAdd.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.state = {
      value: props.value
    };
  }

  onUpdateInput(searchText, dataSource, params) {
    console.log(
      "%s onUpdateInput(%s, %o, %o)",
      this.props.fieldName,
      searchText,
      dataSource,
      params
    );
  }

  componentWillReceiveProps(props) {
    console.log(
      "RelatedEditor willReceiveProps %s: %o, %o",
      props.fieldName,
      props.value,
      props
    );
    this.setState({ value: props.value });
  }

  handleChange(value) {
    console.log(
      "RelatedEditor handleChange %s: %o",
      this.props.fieldName,
      value
    );
    this.props.onChange(this.props.fieldName, value);
  }

  handleRequestAdd(chip) {
    // require that the chip be one of the autocompleted ones
    let isValid = false;
    let choices = this.props.passProps.dataSource;
    let config = this.props.passProps.dataSourceConfig;
    if (config) {
      isValid = choices.filter(c => c[config.value] === chip[config.value]);
    } else {
      isValid = this.props.passProps.dataSource.filter(c => c === chip);
    }

    if (isValid.length === 0) {
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
    return (
      <div>
        <h3 className="sub-heading">
          <FormattedMessage id={this.props.fieldName} />
        </h3>
        <p className="explanatory-text">
          <FormattedMessage
            id={
              this.props.fieldName +
              "_instructional_" +
              this.props.passProps.item_type
            }
          />
          {this.props.passProps.info ? (
            <InfoBox info={this.props.passProps.info} />
          ) : (
            undefined
          )}
        </p>
        <ChipInput
          {...rest}
          className="related-fields clearfix"
          value={this.state.value}
          onRequestAdd={this.handleRequestAdd}
          maxSearchResults={this.props.passProps.maxSearchResults}
          filter={this.props.passProps.filter}
          onRequestDelete={this.handleRequestDelete}
          placeholder={this.props.passProps.placeholder}
          onUpdateInput={this.onUpdateInput}
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
      </div>
    );
  }
}
