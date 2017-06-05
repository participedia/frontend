import React from "react";
import { Field } from "simple-react-form";
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
      fieldName="related_cases"
      type={renderChip}
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
  componentWillReceiveProps(nextProps) {
    this.setState({ chips: nextProps.value });
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
    this.props.onChange(chips);
  }

  handleRequestDelete(deletedChip) {
    let chips = this.state.chips.filter(c => c !== deletedChip);
    this.setState({
      chips: chips
    });
    this.thing[this.property] = chips;
    this.props.onChange(chips);
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
        value={this.props.value.map(x => x.title)}
        onRequestAdd={handleRequestAdd}
        onChange={handleChange}
        onRequestDelete={handleRequestDelete}
        dataSource={this.props.dataSource}
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

export class SimpleRelated extends React.Component {
  // like related but for things that don't have dataSource
  constructor(props) {
    super(props);
    this.thing = props.thing;
    this.property = props.property;
    this.state = {
      chips: props.value
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ chips: nextProps.value });
  }
  handleChange(value) {
    this.props.thing[this.property] = value;
  }

  handleRequestAdd(chip) {
    let chips = [...this.state.chips, chip];
    this.setState({
      chips: chips
    });
    this.props.thing[this.property] = chips;
    this.props.onChange(chips);
  }

  handleRequestDelete(deletedChip) {
    let chips = this.state.chips.filter(c => c !== deletedChip);
    this.setState({
      chips: chips
    });
    this.props.thing[this.property] = chips;
    this.props.onChange(chips);
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
        value={this.props.value}
        onRequestAdd={handleRequestAdd}
        onChange={handleChange}
        onRequestDelete={handleRequestDelete}
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
        value={this.props.value || []}
        dataSource={this.props.dataSource}
        intl={this.props.passProps.intl}
        thing={this.props.passProps.thing}
        onChange={event => {
          this.props.onChange(event);
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
        value={this.props.value || []}
        dataSource={this.props.dataSource}
        dataSourceConfig={this.props.dataSourceConfig}
        intl={this.props.passProps.intl}
        thing={this.props.passProps.thing}
        onChange={event => {
          this.props.onChange(event);
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
        value={this.props.value || []}
        dataSource={this.props.passProps.dataSource}
        dataSourceConfig={this.props.passProps.dataSourceConfig}
        intl={this.props.passProps.intl}
        thing={this.props.passProps.thing}
        onChange={event => {
          this.props.onChange(event);
        }}
      />
    );
  }
}

export class Tags extends React.Component {
  render() {
    return (
      <SimpleRelated
        property="tags"
        value={this.props.value || []}
        intl={this.props.passProps.intl}
        thing={this.props.passProps.thing}
        onChange={event => {
          try {
            this.props.onChange(event);
          } catch (e) {
            console.error(e);
          }
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
