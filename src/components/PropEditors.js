import React, { PropTypes } from "react";
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
function DatePropEditor({ label, property, thing, intl }) {
  return (
    <div>
      <p className="sub-sub-heading">
        {intl.formatMessage({ id: label ? label : "not_specified" })}
      </p>
      <DatePicker
        value={thing[property] ? thing[property] : null}
        name={property}
      />
    </div>
  );
}
// <DatePicker name={property} hintText="Portrait Dialog" />

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
    let choices = getChoices(property).map(v => (
      <MenuItem value={v} key={v} primaryText={intl.formatMessage({ id: v })} />
    ));
    return (
      <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: label ? label : "not_specified" })}
        </p>
        <SelectField
          name={property}
          onChange={onChange}
          value={this.state.value}
        >
          {choices}
        </SelectField>
      </div>
    );
  }
}

// function ChoicePropEditor({ label, property, thing, intl, thingType }) {
//   // let handleChange = (event, index, value) => this.setState({ value });

//   return (
//     <div>
//       <p className="sub-sub-heading">
//         {intl.formatMessage({ id: label ? label : "not_specified" })}
//       </p>
//     </div>
//   );
// }
// <SelectField value={thing[property]} onChange={handleChange}>
//   {choices}
// </SelectField>

ChoicePropEditor.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};
module.exports = {
  BooleanPropEditor,
  DatePropEditor,
  NumberPropEditor,
  TextPropEditor,
  ChoicePropEditor
};
