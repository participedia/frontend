import React from "react";
import PropTypes from "prop-types";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import { Field } from "simple-react-form";
import { makeLocalizedChoices } from "./choices";
import Geosuggest from "react-geosuggest";

class BooleanPropEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.thing[props.property] || 0 };
  }
  render() {
    let { label, property, thing, intl } = this.props;
    return (
      <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: label ? label : "not_specified" })}
        </p>
        <div className={property}>
          <RadioButtonGroup name={property} defaultSelected={thing[property]}>
            <RadioButton
              value={true}
              label={intl.formatMessage({ id: "yes" })}
            />
            <RadioButton
              value={false}
              label={intl.formatMessage({ id: "no" })}
            />
          </RadioButtonGroup>
        </div>
      </div>
    );
  }
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
  componentWillReceiveProps(props) {
    let value = props.thing[props.property] || 0;
    this.setState({ value });
  }
  onChange(event, index, value) {
    this.setState({ value: value });
    this.props.thing[this.props.property] = value;
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
  componentWillReceiveProps(props) {
    let value = nickify(props.thing[props.property] || "");
    this.setState({ value });
  }
  onChange(event, value) {
    this.setState({ value: value });
    this.props.thing[this.props.property] = value;
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

// XXX check this one by hand.
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
  if (!before) return "";
  try {
    return before
      .replace("&amp", "")
      .replace("#039;", "")
      .replace(/[.,\-()&$£;~]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();
  } catch (e) {
    console.log("exception in nickify, before = ", before);
  }
}

class ChoicePropEditor extends React.Component {
  constructor(props) {
    super(props);
    // let value = nickify(props.thing[props.property] || "");
    this.state = {
      value: props.value
    };
    // if (this.props.passProps.choices) {
    //   this.setChoices();
    // }
  }

  setChoices() {
    this.choices = this.props.passProps.choices.map(v => (
      <MenuItem
        value={v}
        key={v}
        primaryText={this.props.passProps.intl.formatMessage({ id: v })}
      />
    ));
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
    if (props.passProps.choices) {
      this.setChoices();
    }
  }

  onChange(event, index, value) {
    this.setState({ value: value });
    this.props.thing[this.props.property] = value;
  }

  render() {
    let onChange = this.onChange.bind(this);
    let { label, property, intl } = this.props;
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
          {this.choices}
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

export class ChoiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: nickify(props.value)
    };
    if (this.props.passProps.choices) {
      this.setChoices();
    }
  }

  setChoices() {
    this.choices = this.props.passProps.choices.map(function(v) {
      return <MenuItem value={v.value} key={v.value} primaryText={v.text} />;
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ value: nickify(props.value) });
    if (props.passProps.choices) {
      this.setChoices();
    }
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
        fullWidth={true}
        onChange={onChange}
        value={this.state.value}
      >
        {this.choices}
      </SelectField>
    );
  }
}

export function makeLocalizedChoiceField(intl, property) {
  let choices = makeLocalizedChoices(intl, property);
  let label = intl.formatMessage({ id: property });
  return (
    <div>
      <p className="sub-sub-heading">
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

  onChange(event, index, value) {
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
        <RadioButton value={true} label={this.props.passProps.yesLabel} />
        <RadioButton value={false} label={this.props.passProps.noLabel} />
      </RadioButtonGroup>
    );
  }
}

export function makeLocalizedBooleanField(intl, property) {
  let label = intl.formatMessage({ id: property });
  console.log("getting label ", label, " for property", property);
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
    this.setState({ value: String(props.value) });
  }

  onChange(event, value) {
    this.setState({ value: value });
    this.props.onChange(Number(value));
  }

  // XXX add validation to ensure only numbers are input

  render() {
    let onChange = this.onChange.bind(this);
    let property = this.props.passProps.property;
    return (
      <TextField
        onChange={onChange}
        value={this.state.value}
        fullWidth={true}
        name={property}
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
          property={property}
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
    let property = this.props.passProps.property;
    return (
      <TextField
        onChange={onChange}
        value={this.state.value}
        fullWidth={true}
        name={property}
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
          nane={property}
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
    console.log("chanigng the date", value);
    this.props.onChange(value);
  }

  render() {
    let onChange = this.onChange.bind(this);
    let property = this.props.passProps.property;
    return (
      <DatePicker
        onChange={onChange}
        value={this.state.value}
        name={property}
      />
    );
  }
}

export function makeLocalizedDateField(intl, property) {
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
      value: props.value
    };
    if (props.value) {
      this.setLocationString(props.value);
    }
  }

  componentWillReceiveProps(props) {
    this.setLocationString(props.value);
  }

  setLocationString(value) {
    if (value) {
      if (value.label) {
        value = value.label;
      } else if (value.city) {
        if (value.country) {
          value = value.city + ", " + value.country;
        } else {
          value = value.city;
        }
      } else if (value.country) {
        value = value.country;
      }
    } else {
      value = "";
    }

    this.setState({ value: value });
  }

  onChange(value) {
    console.log("onChange", value);
    this.setState({ value: value });
    console.log("chanigng the location", value);
    this.props.onChange(value);
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
      <p className="sub-sub-heading">
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
