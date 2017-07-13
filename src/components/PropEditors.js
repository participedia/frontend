import React from "react";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import { Field } from "simple-react-form";
import { makeLocalizedChoices } from "./choices";
import Geosuggest from "react-geosuggest";
import List from "../vendor/react-items-list";
import Avatar from "material-ui/Avatar";
import Upload from "../Upload";
import "./PropEditors.css";
import { makePPLocation, stringifyLocation } from "./geoutils";

function nickify(before) {
  if (!before) return "";
  try {
    return before
      .trim()
      .replace("&amp", "")
      .replace("#039;", "")
      .replace(/[.,\-()&$£;~]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();
  } catch (e) {
    console.log("exception in nickify, before = ", before);
  }
}

export class ChoiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: nickify(props.value),
      choices: this.makeChoices(props.passProps.choices)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: nickify(props.value),
      choices: this.makeChoices(props.passProps.choices)
    });
  }
  makeChoices(choices) {
    return choices.map(function(v) {
      return <MenuItem value={v.value} key={v.value} primaryText={v.text} />;
    });
  }

  onChange(event, index, value) {
    this.setState({ value: value });
    this.props.onChange(value);
  }

  render() {
    let onChange = this.onChange.bind(this);
    let { property } = this.props;
    return (
      <SelectField
        name={property}
        fullWidth
        onChange={onChange}
        value={this.state.value}
      >
        {this.state.choices}
      </SelectField>
    );
  }
}

export function makeLocalizedChoiceField(
  intl,
  property,
  tag_for_choices,
  heading
) {
  if (typeof tag_for_choices === "undefined") {
    tag_for_choices = property;
  }
  let label;
  if (heading === undefined) {
    label = intl.formatMessage({ id: tag_for_choices });
  } else {
    label = intl.formatMessage({ id: heading });
  }
  let choices = makeLocalizedChoices(intl, tag_for_choices);
  return (
    <div>
      <p className="sub-heading">
        {label}
      </p>

      <Field
        fieldName={property}
        label={label}
        type={ChoiceEditor}
        choices={choices}
        dataSource={choices}
        dataSourceConfig={{ text: "text", value: "value" }}
      />
    </div>
  );
}

export class BooleanEditor extends React.Component {
  constructor(props) {
    super(props);
    let value = props.value;
    if (value === "Yes") {
      value = true;
    }
    this.state = {
      value: value
    };
  }

  componentWillReceiveProps(props) {
    let value = props.value;
    if (value === "Yes") {
      value = true;
    }
    this.setState({ value: value });
  }

  onChange(event, value) {
    this.setState({ value: value });
    this.props.onChange(value);
  }

  render() {
    let onChange = this.onChange.bind(this);
    let { label } = this.props;
    return (
      <RadioButtonGroup
        onChange={onChange}
        name={label}
        valueSelected={this.state.value}
      >
        <RadioButton value label={this.props.passProps.yesLabel} />
        <RadioButton value={false} label={this.props.passProps.noLabel} />
      </RadioButtonGroup>
    );
  }
}

export function makeLocalizedBooleanField(intl, property) {
  let label = intl.formatMessage({ id: property });
  return (
    <div>
      <p className="sub-sub-heading">
        {label}
      </p>
      <div className={property}>

        <Field
          fieldName={property}
          label={intl.formatMessage({ id: property })}
          type={BooleanEditor}
          yesLabel={intl.formatMessage({ id: "yes" })}
          noLabel={intl.formatMessage({ id: "no" })}
        />
      </div>
    </div>
  );
}

class NumberEditor extends React.Component {
  constructor(props) {
    super(props);
    let value;
    if (typeof props.value === typeof undefined) {
      value = "";
    } else {
      value = String(props.value);
    }
    this.state = {
      value
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: this.state.value !== "" ? String(props.value) : props.value
    });
  }

  onChange(event, value) {
    this.setState({ value: value });
    this.props.onChange(Number(value));
  }

  // XXX add validation to ensure only numbers are input

  render() {
    let onChange = this.onChange.bind(this);
    let name = this.props.passProps.name;
    return (
      <TextField
        onChange={onChange}
        value={
          typeof this.state.value !== "undefined" && this.state.value !== null
            ? this.state.value
            : ""
        }
        fullWidth
        name={name}
      />
    );
  }
}

export function makeLocalizedNumberField(intl, property) {
  let label = intl.formatMessage({ id: property });
  return (
    <div>
      <p className="sub-sub-heading">
        {label}
      </p>
      <div className={property}>

        <Field
          fieldName={property}
          id={property}
          name={property}
          label={intl.formatMessage({ id: property })}
          type={NumberEditor}
        />
      </div>
    </div>
  );
}

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  onChange(event, value) {
    this.setState({ value: value });
    this.props.onChange(value);
  }

  render() {
    let onChange = this.onChange.bind(this);
    let name = this.props.passProps.name;
    return (
      <TextField
        onChange={onChange}
        value={
          typeof this.state.value !== "undefined" && this.state.value !== null
            ? this.state.value
            : ""
        }
        fullWidth
        name={name}
      />
    );
  }
}

export function makeLocalizedTextField(intl, property) {
  let label = intl.formatMessage({ id: property });
  return (
    <div>
      <p className="sub-sub-heading">
        {label}
      </p>
      <div className={property}>

        <Field
          fieldName={property}
          name={property}
          id={property}
          label={intl.formatMessage({ id: property })}
          type={TextEditor}
        />
      </div>
    </div>
  );
}

class DateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  onChange(event, value) {
    this.setState({ value: value });
    this.props.onChange(value);
  }

  render() {
    let onChange = this.onChange.bind(this);
    let property = this.props.passProps.name;
    return (
      <DatePicker
        onChange={onChange}
        value={this.state.value}
        placeholder={this.props.label}
        name={property}
      />
    );
  }
}

export function makeLocalizedDateField(intl, property) {
  let label = intl.formatMessage({ id: property });
  return (
    <div>
      <div className={"date-field " + property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          label={intl.formatMessage({ id: property + "_placeholder" })}
          type={DateEditor}
        />
      </div>
    </div>
  );
}

class LocationEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: stringifyLocation(props.value)
    };
    // if (props.value) {
    //   this.setLocationString(props.value);
    // }
  }

  componentWillReceiveProps(props) {
    this.setState({ value: stringifyLocation(props.value) });
    // console.log("setting value", stringifyLocation(props.value));
    // this.setLocationString(props.value);
  }

  // setLocationString(value) {
  //   let real_value = value;
  //   if (value) {
  //     if (value.label) {
  //       value = value.label;
  //     } else if (value.city) {
  //       if (value.country) {
  //         value = value.city + ", " + value.country;
  //       } else {
  //         value = value.city;
  //       }
  //     } else if (value.country) {
  //       value = value.country;
  //     }
  //   } else {
  //     value = "";
  //   }

  //   this.setState({ value, real_value });
  // }

  onChange(value) {
    this.setState({ value: stringifyLocation(value) });
    let pplocation = makePPLocation(value);
    this.props.onChange(pplocation);
  }

  render() {
    let onChange = this.onChange.bind(this);
    return (
      <Geosuggest
        placeholder={this.props.passProps.placeholder}
        initialValue={this.state.value}
        onSuggestSelect={onChange}
      />
    );
  }
}

export function makeLocalizedLocationField(intl, property) {
  let label = intl.formatMessage({ id: property });
  return (
    <div>
      <p className="sub-heading">
        {label}
      </p>
      <div className={property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          label={intl.formatMessage({ id: property })}
          placeholder={intl.formatMessage({
            id: "location_placeholder"
          })}
          type={LocationEditor}
        />
      </div>
    </div>
  );
}

export class ListEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || []
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value || []
    });
  }

  update(value) {
    this.setState({ value });
    this.props.onChange(value);
  }
  onAdd(text) {
    let value = this.state.value;
    value.push(text);
    this.update(value);
  }
  onRemove(index) {
    let value = this.state.value;
    value.splice(index, 1);
    this.update(value);
  }
  onUpdate(index, newtext) {
    let value = this.state.value;
    value[index] = newtext;
    this.update(value);
  }

  render() {
    let onAdd = this.onAdd.bind(this);
    let onRemove = this.onRemove.bind(this);
    let onUpdate = this.onUpdate.bind(this);
    return (
      <List
        className={this.props.passProps.name + "_list"}
        items={this.state.value}
        onAdd={onAdd}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    );
  }
}

export function makeLocalizedListField(intl, property) {
  let label = intl.formatMessage({ id: property });
  return (
    <div>
      <p className="sub-heading">
        {label}
      </p>
      <div className={property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          label={intl.formatMessage({ id: property })}
          type={ListEditor}
        />
      </div>
    </div>
  );
}

const customStyle = {
  borderRadius: 5,
  position: "absolute",
  cursor: "pointer",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  bottom: "28px",
  left: 0,
  width: "100%",
  textAlign: "center",
  color: "#fff",
  padding: "7px 0",
  boxSizing: "border-box"
};

export class AvatarEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
  }

  onUpdate(index, newtext) {
    let value = this.state.value;
    value[index] = newtext;
    this.update(value);
  }

  render() {
    return (
      <div className="user-avatar">
        <Avatar size={200} src={this.state.value} />

        <Upload
          customStyle={customStyle}
          className="change-avatar-button"
          auth={this.props.passProps.auth}
          profile={this.props.passProps.profile}
          updatePicture
        />
      </div>
    );
  }
}

export function makeLocalizedAvatarEditor(intl, property, profile, auth) {
  return (
    <Field
      fieldName={property}
      id={property}
      name={property}
      profile={profile}
      auth={auth}
      type={AvatarEditor}
    />
  );
}

// export class OrganizationPicker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: props.value
//     };
//   }

//   componentWillReceiveProps(props) {
//     this.setState({
//       value: props.value
//     });
//   }

//   onUpdate(index, newtext) {
//     let value = this.state.value;
//     value[index] = newtext;
//     this.update(value);
//   }

//   render() {
//     return (

//     );
// }

// export function OrganizationPicker(intl, property) {
//   return (
//     <Field
//       fieldName={property}
//       id={property}
//       name={property}
//       profile={profile}
//       auth={auth}
//       type={AvatarEditor}
//     />
//   );

// }
