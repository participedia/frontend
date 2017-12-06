import React from "react";
import { FormattedMessage } from "react-intl";
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
import Clear from "material-ui/svg-icons/content/clear";

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
        className="custom-select"
        onChange={onChange}
        hintText={this.props.passProps.placeholder}
        value={this.state.value}
      >
        {this.state.choices}
      </SelectField>
    );
  }
}

const names = ['a','b','c','d'];
export class MultiChoiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // value: nickify(props.value),
      values:[],
      // choices: this.makeChoices(props.passProps.choices)
      // choices: this.props.passProps.choices
    };
  }


  handleChange(event, index, values) {
    this.setState({values});
  } 
  // componentWillReceiveProps(props) {
  //   this.setState({
  //     // value: nickify(props.value),
  //     value:[],
  //     choices: this.props.passProps.choices
  //     // choices: this.makeChoices(props.passProps.choices)
  //   });
  // }

  // makeChoices(choices) {
  //   return choices.map(function(v) {
  //     return <MenuItem value={v.value} key={v.value} primaryText={v.text} />;
  //   });
  // }

  // onChange(event, index, value) {
  //   this.setState({ value: value });
  //   this.props.onChange(value);
  // }

  menuItems(values) {
    return names.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }



  render() {
    // let handleChange = this.handleChange.bind(this);
    const {values} = this.state;
    let { property } = this.props;
    return (
      <div>
      <SelectField
        name={property}
        fullWidth
        multiple={true}
        hintText="Select a name"
        value={values}
        onChange={this.handleChange}
      >
        {this.menuItems(values)}
      </SelectField>
      <p> 
      {
        this.state.values
          
      }
      </p>
      </div>
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
    <div className="field-case select">
      <h2 className="sub-heading">{label}</h2>
      <p className="explanatory-text">{intl.formatMessage({
          id: property + "_placeholder"
        })}</p>
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

export function makeLocalizedMultiChoiceField(
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
  // let choices = makeLocalizedChoices(intl, tag_for_choices);
  let choices = ["a",'b',"c"];
  return (
    <div className="field-case select">
      <h2 className="sub-heading">{label}</h2>
      <p className="explanatory-text">{intl.formatMessage({
          id: property + "_placeholder"
        })}</p>
      <Field
        fieldName={property}
        label={label}
        type={MultiChoiceEditor}
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
  return (
    <div className="field-case">
      <h2 className="sub-heading boolean">
        <FormattedMessage id={property} />
      </h2>
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
    if (typeof props.value === typeof undefined || props.value === 0) {
      value = "";
    } else {
      value = String(props.value);
    }
    this.state = {
      value
    };
  }

  // componentWillReceiveProps(props) {
  //   this.setState({
  //     value: this.state.value !== "" ? String(props.value) : props.value
  //   });
  // }

  onChange(event, value) {
    console.log(value, "value");
    this.setState({ value: value > 0 ? value : null });
    // this.props.onChange(Number(value));
  }

  // XXX add validation to ensure only numbers are input

  render() {
    let onChange = this.onChange.bind(this);
    let name = this.props.passProps.name;
    return (
      <TextField
        onChange={onChange}
        className="custom-field"
        type="number"
        value={
          typeof this.state.value !== "undefined" &&
          this.state.value !== null &&
          this.state.value > 0
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
    <div className="field-case">
      <h2 className="sub-heading">{label}</h2>
      <p className="explanatory-text">{intl.formatMessage({ id: property + "_placeholder" })}</p>
      <div className={property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          type={NumberEditor}
          label={intl.formatMessage({ id: property })}
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
        className="custom-field"
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
    <div className="field-case">
      <h2 className="sub-heading">{label}</h2>
      <p className="explanatory-text">{intl.formatMessage({ id: property + "_placeholder" })}</p>
      <div className={property}>
        <Field
          fieldName={property}
          name={property}
          id={property}
          type={TextEditor}
          label={intl.formatMessage({ id: property })}
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
    this.clearDate = this.clearDate.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  clearDate() {
    this.setState({ value: null });
    this.props.onChange(null);
  }

  onChange(event, value) {
    this.setState({ value: value });
    this.props.onChange(value);
  }

  render() {
    let onChange = this.onChange.bind(this);
    let property = this.props.passProps.name;
    return (
      <div className="clearable-datepicker">
        <DatePicker
          onChange={onChange}
          onClick={() => {this.clearDate()}}
          value={this.state.value}
          placeholder={this.props.label}
          name={property}
        />
        {this.state.value ?
          <div className="dismiss" onTouchTap={() => {this.clearDate()}}>
            <Clear/>
          </div>
         : undefined 
        } 
      </div>
    );
  }
}

export function makeLocalizedDateField(intl, property) {
  return (
    <div>
      <p className="explanatory-text">{intl.formatMessage({ id: property + "_placeholder" })}</p>
      <div className={"date-field " + property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          label={intl.formatMessage({ id: property })}
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
        placeholder={this.props.label}
        initialValue={this.state.value}
        onSuggestSelect={onChange}
      />
    );
  }
}

export function makeLocalizedLocationField(intl, property) {
  let label = intl.formatMessage({ id: property });
  return (
    <div className="field-case location-field">
      <h2 className="sub-heading">{label}</h2>
      <p className="explanatory-text">{intl.formatMessage({
            id: "location_placeholder"
          })}</p>
      <div className={property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          label=""
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
        placeholder={this.props.passProps.placeholder}
        prompt={this.props.passProps.prompt}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    );
  }
}

export function makeLocalizedListField(intl, property) {
  return (
    <div>
      <p className="explanatory-text"><FormattedMessage id={intl.formatMessage({
            id: property + "_placeholder"
          })} /></p> 
      <div className={"list " + property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          placeholder={intl.formatMessage({
            id: property + "_placeholder"
          })}
          prompt={intl.formatMessage({
            id: property + "_prompt"
          })}
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
        <Avatar size={160} src={this.state.value} />
        <div>
          <Upload
            customStyle={customStyle}
            customClass="change-avatar-button"
            profile={this.props.passProps.profile}
            updatePicture
          />
        </div>
      </div>
    );
  }
}

export function makeLocalizedAvatarEditor(intl, property, profile) {
  return (
    <Field
      fieldName={property}
      id={property}
      name={property}
      profile={profile}
      type={AvatarEditor}
    />
  );
}
