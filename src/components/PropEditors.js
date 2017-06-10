import React from "react";
import PropTypes from "prop-types";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import getChoices from "./choices";

function BooleanPropEditor({ label, property, thing, intl }) {
  return (
    <div>
      <p className="sub-sub-heading">
        {intl.formatMessage({ id: label ? label : "not_specified" })}
      </p>
      <div className={property}>
        <RadioButtonGroup name={property} defaultSelected={thing[property]}>
          <RadioButton value={true} label={intl.formatMessage({ id: "yes" })} />
          <RadioButton value={false} label={intl.formatMessage({ id: "no" })} />
        </RadioButtonGroup>
      </div>
    </div>
  );
}

BooleanPropEditor.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

class NumberPropEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.thing[props.property] || 0 };
  }
  onChange(event, value) {
    this.setState({ value: value });
  }
  render() {
    let onChange = this.onChange.bind(this);
    let { label, property, intl } = this.props;
    return (
      <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: label ? label : "not_specified" })}
        </p>
        <TextField
          onChange={onChange}
          value={this.state.value}
          fullWidth={true}
          name={property}
        />
      </div>
    );
  }
}

// <TextField defaultValue={thing[property]} id={property} />

NumberPropEditor.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

class TextPropEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.thing[props.property] || "" };
  }
  onChange(event, value) {
    this.setState({ value: value });
  }
  render() {
    let onChange = this.onChange.bind(this);
    let { label, property, intl } = this.props;
    return (
      <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: label ? label : "not_specified" })}
        </p>
        <TextField
          onChange={onChange}
          value={this.state.value}
          fullWidth={true}
          name={property}
        />
      </div>
    );
  }
}

TextPropEditor.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

// XXX do L10N work, see http://www.material-ui.com/#/components/date-picker
function DatePropEditor({ label, property, thing, intl, onChange }) {
  return (
    <div>
      <p className="sub-sub-heading">
        {intl.formatMessage({ id: label ? label : "not_specified" })}
      </p>
      <DatePicker
        className="datepicker"
        value={thing[property] ? thing[property] : null}
        onChange={onChange}
        fullWidth={true}
        name={property}
      />
    </div>
  );
}

DatePropEditor.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

function nickify(before) {
  return before
    .replace("&amp", "")
    .replace("#039;", "")
    .replace(/[.,\-()&$£;~]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
}

class ChoicePropEditor extends React.Component {
  constructor(props) {
    super(props);
    let value = nickify(props.thing[props.property] || "");
    this.state = {
      value: value
    };
  }
  onChange(event, index, value) {
    this.setState({ value: value });
  }
  render() {
    let onChange = this.onChange.bind(this);
    let { label, property, intl } = this.props;
    let choices = getChoices(property).map(v =>
      <MenuItem value={v} key={v} primaryText={intl.formatMessage({ id: v })} />
    );
    return (
      <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: label ? label : "not_specified" })}
        </p>
        <SelectField
          name={property}
          fullWidth={true}
          onChange={onChange}
          value={this.state.value}
        >
          {choices}
        </SelectField>
      </div>
    );
  }
}

ChoicePropEditor.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};
export {
  BooleanPropEditor,
  DatePropEditor,
  NumberPropEditor,
  TextPropEditor,
  ChoicePropEditor
};
