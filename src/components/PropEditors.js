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

const NumberPropEditor = ({ label, property, thing, intl }) => (
  <div>
    <p className="sub-sub-heading">
      {intl.formatMessage({ id: label ? label : "not_specified" })}
    </p>
    <TextField value={thing[property] ? thing[property] : ""} name={property} />
  </div>
);

// <TextField defaultValue={thing[property]} id={property} />

NumberPropEditor.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

const TextPropEditor = ({ label, property, thing, intl }) => (
  <div>
    <p className="sub-sub-heading">
      {intl.formatMessage({ id: label ? label : "not_specified" })}
    </p>
    <TextField value={thing[property] ? thing[property] : ""} name={property} />
  </div>
);
TextPropEditor.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

// XXX do L10N work, see http://www.material-ui.com/#/components/date-picker
function DatePropEditor({ label, property, thing, intl }) {
  console.log("DATE:", thing[property], typeof thing[property]);
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

function ChoicePropEditor({ label, property, thing, intl, thingType }) {
  if (!(property in thing)) return <div />;

  let choices = getChoices(property).map(v => (
    <MenuItem value={v} key={v} primaryText={intl.formatMessage({ id: v })} />
  ));
  // let handleChange = (event, index, value) => this.setState({ value });

  return (
    <div>
      <p className="sub-sub-heading">
        {intl.formatMessage({ id: label ? label : "not_specified" })}
      </p>
      <SelectField
        name={property}
        value={thing[property] ? thing[property] : ""}
      >
        {choices}
      </SelectField>
    </div>
  );
}
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
