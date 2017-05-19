import React from "react";
import { Field } from "redux-form";
import ChipInput from "material-ui-chip-input";
import omit from "object-omit";

function renderChip({
  input,
  hintText,
  dataSource,
  dataSourceConfig,
  possibles,
  floatingLabelText
}) {
  return (
    <ChipInput
      {...input}
      value={input.value || []}
      fullWidth={true}
      menuStyle={{ width: 400 }}
      listStyle={{ width: 400 }}
      onRequestAdd={addedChip => {
        let values = input.value || [];
        values = values.slice();
        values.push(addedChip);
        input.onChange(values);
      }}
      onRequestDelete={deletedChip => {
        let values = input.value || [];
        values = values.filter(v => v.value !== deletedChip);
        input.onChange(values);
      }}
      onBlur={() => input.onBlur()}
      dataSource={dataSource}
      dataSourceConfig={dataSourceConfig}
      hintText={hintText}
      floatingLabelText={floatingLabelText}
    />
  );
}

export function RelatedCases({ intl, cases }) {
  return (
    <Field
      name="related_cases"
      component={renderChip}
      hintText={intl.formatMessage({
        id: "search_related_cases"
      })}
      dataSource={cases}
      dataSourceConfig={{ text: "text", value: "value" }}
    />
  );
}

// This is a very similar class, but not in a redux context -- it expects to live in a simple-react-form Form
// TBD: this all needs cleaning up, it feels baroque.

export class Related extends React.Component {
  constructor(props) {
    super(props);
    this.thing = props.thing;
    this.property = props.property;
    this.state = {
      chips: props.value
    };
  }

  handleChange(value) {
    this.thing[this.property] = value;
  }

  handleRequestAdd(chip) {
    let chips = [...this.state.chips, chip];
    this.setState({
      chips: chips
    });
    this.thing[this.property] = chips;
  }

  handleRequestDelete(deletedChip) {
    let chips = this.state.chips.filter(c => c !== deletedChip);
    this.setState({
      chips: chips
    });
    this.thing[this.property] = chips;
  }

  render() {
    let rest = omit(this.props, [
      "intl",
      "thing",
      "property",
      "dataSource",
      "useHint",
      "errorMessage",
      "fieldSchema",
      "fieldName",
      "schema",
      "passProps"
    ]);
    let handleRequestAdd = this.handleRequestAdd.bind(this);
    let handleRequestDelete = this.handleRequestDelete.bind(this);
    let handleChange = this.handleChange.bind(this);
    return (
      <ChipInput
        {...rest}
        value={this.state.chips}
        onRequestAdd={handleRequestAdd}
        onChange={handleChange}
        onRequestDelete={handleRequestDelete}
        dataSource={this.props.dataSource}
        dataSourceConfig={{ text: "text", value: "value" }}
        onBlur={event => {
          if (this.props.addOnBlur && event.target.value) {
            this.handleRequestAdd(event.target.value);
          }
        }}
        fullWidth
      />
    );
  }
}

export class SimpleRelatedCases extends React.Component {
  render() {
    return (
      <Related
        property="related_cases"
        value={this.props.passProps.related_cases || []}
        dataSource={this.props.passProps.dataSource}
        intl={this.props.passProps.intl}
        thing={this.props.passProps.thing}
        onChange={event => {
          this.props.onChange(event.target.value);
        }}
      />
    );
  }
}

export class SimpleRelatedMethods extends React.Component {
  render() {
    return (
      <Related
        property="related_methods"
        value={this.props.passProps.related_methods || []}
        dataSource={this.props.passProps.dataSource}
        intl={this.props.passProps.intl}
        thing={this.props.passProps.thing}
        onChange={event => {
          this.props.onChange(event.target.value);
        }}
      />
    );
  }
}

export class SimpleRelatedOrganizations extends React.Component {
  render() {
    return (
      <Related
        property="related_organizations"
        value={this.props.passProps.related_organizations || []}
        dataSource={this.props.passProps.dataSource}
        intl={this.props.passProps.intl}
        thing={this.props.passProps.thing}
        onChange={event => {
          this.props.onChange(event.target.value);
        }}
      />
    );
  }
}

export function RelatedMethods({ intl, methods }) {
  return (
    <Field
      name="related_methods"
      component={renderChip}
      hintText={intl.formatMessage({
        id: "search_related_methods"
      })}
      dataSource={methods}
      dataSourceConfig={{ text: "text", value: "value" }}
    />
  );
}

export function RelatedOrganizations({ intl, organizations }) {
  return (
    <Field
      name="related_organizations"
      component={renderChip}
      hintText={intl.formatMessage({
        id: "search_related_organizations"
      })}
      dataSource={organizations}
      dataSourceConfig={{ text: "text", value: "value" }}
    />
  );
}
