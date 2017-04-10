import React from "react";
import { Field } from "redux-form";
import ChipInput from "material-ui-chip-input";
import omit from "object-omit";

function renderChip(
  {
    input,
    hintText,
    dataSource,
    dataSourceConfig,
    possibles,
    floatingLabelText
  }
) {
  console.log("input", input);
  return (
    <ChipInput
      {...input}
      value={input.value || []}
      fullWidth={true}
      menuStyle={{ width: 400 }}
      listStyle={{ width: 400 }}
      onRequestAdd={addedChip => {
        console.log("in onRequestAdd", addedChip);
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

export function RelatedCasesRaw({ intl, cases, input }) {
  delete input.thing;
  return (
    <ChipInput
      {...input}
      value={input.value || []}
      fullWidth={true}
      menuStyle={{ width: 400 }}
      listStyle={{ width: 400 }}
      onChange={v => input.onChange(v)}
      dataSource={cases}
      dataSourceConfig={{ text: "text", value: "value" }}
    />
  );
}

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
    console.log("in handleChange", this.thing, this.property, value);
    try {
      this.thing[this.property] = value;
    } catch (e) {
      console.error(e);
    }
  }

  handleRequestAdd(chip) {
    console.log("in handleRequestAdd", chip);
    let chips = [...this.state.chips, chip];
    this.setState({
      chips: chips
    });
    this.thing[this.property] = chips;
    console.log(this.thing);
  }

  handleRequestDelete(deletedChip) {
    let chips = this.state.chips.filter(c => c !== deletedChip);
    this.setState({
      chips: chips
    });
    this.thing[this.property] = chips;
  }

  render() {
    // console.log(
    //   "Setting ",
    //   this.property,
    //   "on",
    //   this.thing,
    //   "with",
    //   this.state.chips
    // );

    let rest = omit(this.props, ["intl", "thing", "property", "dataSource"]);
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

// return renderChip({
//   input: input,
//   name: "related_cases",
//   hintText: intl.formatMessage({
//     id: "search_related_cases"
//   }),
//   dataSource: cases,
//   dataSourceConfig: { text: "text", value: "value" }
// });

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
