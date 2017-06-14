import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormattedDate } from "react-intl";

function BooleanProp({ label, property, thing, intl }) {
  let truth = thing[property];
  let truthString = String(truth);
  if (truth === null || truth === undefined) return <div />;
  return (
    <div>
      <p className="sub-sub-heading">
        {intl.formatMessage({ id: label ? label : "not_specified" })}
      </p>
      <div className={property}>
        {intl.formatMessage({ id: truthString })}
      </div>
    </div>
  );
}
BooleanProp.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

const NumberProp = ({ label, property, thing, intl }) =>
  thing[property] !== undefined && thing[property] !== null
    ? <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: label ? label : "not_specified" })}
        </p>
        <div className={property}>
          {String(thing[property])}
        </div>
      </div>
    : <div />;
NumberProp.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

const TextProp = ({ label, property, thing, intl }) =>
  thing[property]
    ? <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: label ? label : "not_specified" })}
        </p>
        <div className={property}>
          {thing[property]}
        </div>
      </div>
    : <div />;
TextProp.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

function DateProp({ label, property, thing, intl }) {
  return thing[property]
    ? <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: label ? label : "not_specified" })}
        </p>
        <div className={property}>
          <FormattedDate value={thing[property]} />
        </div>
      </div>
    : <div />;
}
DateProp.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

function ItemProp({ label, property, thing, intl, thingType }) {
  if (!(property in thing)) return <div />;

  let url = `/${thingType}/${thing[property]}`;
  return thing[property]
    ? <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: label ? label : "not_specified" })}
        </p>
        <div className={property}>
          <Link to={url}>
            {thingType}: {thing[property]}
          </Link>
        </div>
      </div>
    : <div />;
}

ItemProp.propTypes = {
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  thing: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

export { BooleanProp, DateProp, ItemProp, NumberProp, TextProp };
