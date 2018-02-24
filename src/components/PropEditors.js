import React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
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
import { arrayMove } from "react-sortable-hoc";
import SortableList from "./SortableList";
import InfoBox from "./InfoBox";

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
    console.error("exception in nickify, before = ", before);
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
      choices: this.makeChoices(props.passProps.choices, props.value)
    });
  }

  makeChoices(choices, value) {
    let keys;
    try {
      keys = value.map(v => v.value);
    } catch (e) {
      console.warn("Error in ChoiceEditor mapping keys for value %o", value);
      keys = [];
    }
    return choices.map(function(v) {
      return (
        <MenuItem
          value={v.value}
          key={v.value}
          primaryText={v.text}
          selected={keys.includes(v.value)}
        />
      );
    });
  }

  onChange(event, index, value) {
    this.setState({ value: value });
    this.props.onChange(value);
  }

  render() {
    let onChange = this.onChange.bind(this);
    let { fieldName: property } = this.props;
    console.log("rendering ChoiceEditor for %s", property);
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

export class SearchChoiceEditor extends React.Component {
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
    this.props.onChange(this.props.property, value);
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

export class MultiChoiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.selectionRenderer = this.selectionRenderer.bind(this);
    console.log("MultiChoiceEditor constructor value: %o", props.value);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
  }

  handleChange(event, index, value) {
    let b;
    if (value.length > this.props.limit) {
      b = value.slice(1, this.props.limit + 1);
      this.setState({ value: b });
      this.props.onChange(this.props.property, b);
    } else if (value.length > this.props.limit) {
      b = value.slice(1, this.props.limit + 1);
      this.setState({ value: b });
      this.props.onChange(this.props.property, b);
    } else {
      this.setState({ value });
      this.props.onChange(this.props.property, value);
    }
  }

  makeChoices(choices, value) {
    let keys;
    try {
      keys = value ? value.map(v => v.value) : [];
      console.log("MultiChoiceEditor keys: %o", keys);
    } catch (e) {
      console.warn("Error in makeChoices");
      keys = [];
    }
    return choices.map(function(v) {
      return (
        <MenuItem
          key={v.value}
          insetChildren={true}
          checked={value && keys.includes(v.value)}
          value={v}
          primaryText={v.text}
        />
      );
    });
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      value: arrayMove(this.state.value, oldIndex, newIndex)
    });
  }

  selectionRenderer(value, menuItem) {
    return this.props.placeholder;
  }

  render() {
    if (this.props.property) {
      console.log(
        "MultiChoiceEditor rendering (rankable: %s) %s: %o",
        this.props.rankable,
        this.props.property,
        this.state.value
      );
    } else {
      console.log("MultiChoiceEditor render(): no property for %o", this.props);
    }
    return (
      <div>
        <SelectField
          name={this.props.property}
          fullWidth
          className="custom-select"
          multiple={true}
          value={this.state.value}
          onChange={this.handleChange}
          selectionRenderer={this.selectionRenderer}
        >
          {this.makeChoices(this.props.choices, this.state.value)}
        </SelectField>
        <div>
          {this.state.value && this.state.value.length ? (
            this.props.rankable ? (
              <SortableList
                items={this.state.value}
                onSortEnd={this.onSortEnd}
              />
            ) : (
              <List items={this.state.value} />
            )
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }
}

export function makeLocalizedSearchChoiceField(
  intl,
  property,
  tag_for_choices,
  heading,
  alphabetical
) {
  if (typeof tag_for_choices === "undefined") {
    tag_for_choices = property;
  }
  if (typeof heading === "undefined") {
    heading = tag_for_choices;
  }
  let label = intl.formatMessage({ id: heading });
  let choices = makeLocalizedChoices(intl, tag_for_choices, alphabetical);
  return (
    <div className="field-case select">
      <h3 className="sub-heading">{label}</h3>
      <p className="explanatory-text">
        <FormattedHTMLMessage id={property + "_instructional"} />
      </p>
      <Field
        fieldName={property}
        label={label}
        type={SearchChoiceEditor}
        choices={choices}
        dataSource={choices}
        dataSourceConfig={{ text: "text", value: "value" }}
      />
    </div>
  );
}

export function makeLocalizedChoiceField(
  intl,
  property,
  alphabetical,
  type,
  info
) {
  let label = intl.formatMessage({ id: property });
  let choices = makeLocalizedChoices(intl, property, alphabetical);
  let placeholder;
  if (type) {
    placeholder = intl.formatMessage({
      id: property + "_" + type + "_placeholder"
    });
  } else {
    placeholder = intl.formatMessage({ id: property + "_placeholder" });
  }
  return (
    <div className="field-case select">
      <h3 className="sub-heading">{label}</h3>
      <p className="explanatory-text">
        {type ? (
          <FormattedHTMLMessage id={property + "_" + type + "_instructional"} />
        ) : (
          <FormattedHTMLMessage id={property + "_instructional"} />
        )}
        {info ? <InfoBox info={property} /> : undefined}
      </p>
      <Field
        fieldName={property}
        label={label}
        type={ChoiceEditor}
        placeholder={placeholder}
        choices={choices}
        dataSource={choices}
        dataSourceConfig={{ text: "text", value: "value" }}
      />
    </div>
  );
}

export function makeLocalizedMultiChoiceField(props) {
  console.log("makeLocalizedMutltiChoiceField should not be getting called");
  return <div />;
}

export class LocalizedMultiChoiceField extends React.Component {
  // Expected props:
  // intl,
  // property,
  // value,
  // rankable,
  // limit,
  // info

  constructor(props) {
    super(props);
    console.log(
      "LocalizedMultiChoiceField constructor %s: %o",
      props.property,
      props.value
    );
    this.state = {
      label: props.intl.formatMessage({ id: props.property }),
      placeholder: props.intl.formatMessage({
        id: props.property + "_placeholder"
      }),
      choices: makeLocalizedChoices(props.intl, props.property)
    };
  }

  componentWillReceiveProps(props) {
    console.log(
      "LocalizedMultiChoiceField componentWillReceiveProps %s: %o",
      props.property,
      props.value
    );
    this.setState({
      label: props.intl.formatMessage({ id: props.property }),
      placeholder: props.intl.formatMessage({
        id: props.property + "_placeholder"
      }),
      choices: makeLocalizedChoices(props.intl, props.property)
    });
  }

  render() {
    console.log(
      "rendering LocalizedMultichoiceField for %s: %o",
      this.state.property,
      this.state.value
    );
    // let choices = this.makeChoices(this.state.choices, this.state.value);
    return (
      <div className="field-case select">
        <h3 className="sub-heading">{this.state.label}</h3>
        <p className="explanatory-text">
          {this.props.intl.formatMessage({
            id: this.props.property + "_instructional"
          })}
          {this.props.info ? <InfoBox info={this.props.property} /> : undefined}
        </p>
        <MultiChoiceEditor
          property={this.props.property}
          label={this.state.label}
          choices={this.state.choices}
          rankable={this.props.rankable}
          placeholder={this.state.placeholder}
          limit={this.props.limit}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
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
    this.setState({ value: value > 0 ? value : null });
    // this.props.onChange(Number(value));
  }

  // XXX add validation to ensure only numbers are input

  render() {
    let onChange = this.onChange.bind(this);
    let name = this.props.passProps.name;
    let placeholder = this.props.label;
    return (
      <TextField
        onChange={onChange}
        className="custom-number-field"
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
        hintText={placeholder}
        underlineShow={false}
      />
    );
  }
}

export function makeLocalizedNumberField(intl, property) {
  let label = intl.formatMessage({ id: property });
  let placeholder = intl.formatMessage({ id: property + "_placeholder" });
  return (
    <div className="field-case">
      <h3 className="sub-heading">{label}</h3>
      <p className="explanatory-text">
        {intl.formatMessage({ id: property + "_instructional" })}
      </p>
      <div className={property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          type={NumberEditor}
          label={placeholder}
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
      <p className="explanatory-text">
        {intl.formatMessage({ id: property + "_placeholder" })}
      </p>
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
          onClick={() => {
            this.clearDate();
          }}
          value={this.state.value}
          placeholder={this.props.label}
          name={property}
        />
        {this.state.value ? (
          <div
            className="dismiss"
            onTouchTap={() => {
              this.clearDate();
            }}
          >
            <Clear />
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export function makeLocalizedDateField(intl, property) {
  return (
    <div>
      <h3 className="sub-heading">{intl.formatMessage({ id: property })}</h3>
      <p className="explanatory-text">
        {intl.formatMessage({ id: property + "_instructional" })}
      </p>
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
        placeholder={this.props.label}
        initialValue={this.state.value}
        onSuggestSelect={onChange}
      />
    );
  }
}

export function makeLocalizedLocationField(intl, property) {
  let label = intl.formatMessage({ id: property });
  let placeholder = intl.formatMessage({ id: property + "_placeholder" });
  return (
    <div>
      <h3 className="sub-heading">{label}</h3>
      <p className="explanatory-text">
        {intl.formatMessage({
          id: property + "_instructional"
        })}
      </p>
      <div className={property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          label={placeholder}
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

export function makeLocalizedListField(intl, property, type) {
  let label = intl.formatMessage({ id: property });
  let instructional = intl.formatMessage({
    id: property + "_instructional_" + type
  });
  let placeholder = intl.formatMessage({
    id: property + "_placeholder_" + type
  });
  return (
    <div>
      <h3 className="sub-heading">{label}</h3>
      <p className="explanatory-text">
        <FormattedMessage id={instructional} />
      </p>
      <div className={"list " + property}>
        <Field
          fieldName={property}
          id={property}
          name={property}
          placeholder={placeholder}
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
