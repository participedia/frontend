import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const LinkToThing = ({ thing, intl }) =>
  thing && intl ? (
    <Link
      to={{
        pathname: `/${thing.type}/${thing.id}`
      }}
    >
      {thing.title}
    </Link>
  ) : (
    <div>
      <FormattedMessage id="not_specified" />
    </div>
  );

const RelatedThings = ({ title, relateds, intl }) =>
  relateds && relateds.length ? (
    <div>
      <div className="sub-sub-heading">
        <FormattedMessage id={title} /> :{" "}
      </div>
      {relateds.map(related => (
        <LinkToThing key={related.id} thing={related} intl={intl} />
      ))}
    </div>
  ) : (
    <div />
  );

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

const RelatedContent = props => {
  return (props.thing.related_cases && props.thing.related_cases.length) ||
  (props.thing.related_methods && props.thing.related_methods.length) ||
  (props.thing.related_organizations &&
    props.thing.related_organizations.length) ? (
    <div className="related-content">
      <p className="sub-heading">Related Content</p>
      <RelatedCases {...props} />
      <RelatedMethods {...props} />
      <RelatedOrganizations {...props} />
    </div>
  ) : (
    <div />
  );
};

export default RelatedContent;
