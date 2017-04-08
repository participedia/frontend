import React from "react";
import { Link } from "react-router";

const LinkToThing = ({ thing, intl }) =>
  thing && intl
    ? <Link
        to={{
          pathname: `/${intl.locale}/${thing.type}/${thing.id}`
        }}
      >
        {thing.title}
      </Link>
    : <div>{intl.formatMessage({ id: "not_specified" })}</div>;

const RelatedThings = ({ title, relateds, intl }) =>
  relateds
    ? <div>
        <div className="sub-sub-heading">
          {intl.formatMessage({ id: title })} :{" "}
        </div>
        {relateds.map(related => <LinkToThing thing={related} intl={intl} />)}
      </div>
    : <div />;

const RelatedCases = ({ thing, intl }) => (
  <RelatedThings
    title="related_cases"
    relateds={thing.related_cases}
    intl={intl}
  />
);

const RelatedMethods = ({ thing, intl }) => (
  <RelatedThings
    title="related_methods"
    relateds={thing.related_methods}
    intl={intl}
  />
);

const RelatedOrganizations = ({ thing, intl }) => (
  <RelatedThings
    title="related_organizations"
    relateds={thing.related_organizations}
    intl={intl}
  />
);

const RelatedContent = props =>
  props.thing.related_cases ||
    props.thing.related_methods ||
    props.thing.related_organizations
    ? <div className="related-content">
        <p className="sub-heading">
          Related Content
        </p>
        <RelatedCases {...props} />
        <RelatedMethods {...props} />
        <RelatedOrganizations {...props} />
      </div>
    : <div />;

export default RelatedContent;
