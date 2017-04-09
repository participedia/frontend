import React, { Component } from "react";
import { Field } from "redux-form";
import { Label } from "reactstrap";
import { injectIntl } from "react-intl";
import ChipInput from "material-ui-chip-input";

const renderChip = (
  {
    input,
    hintText,
    dataSource,
    dataSourceConfig,
    possibles,
    floatingLabelText
  }
) => (
  <ChipInput
    {...input}
    value={input.value || []}
    fullWidth={true}
    menuStyle={{ width: 400 }}
    listStyle={{ width: 400 }}
    onRequestAdd={addedChip => {
      let values = input.value || [];
      values = values.slice();
      values.push(addedChip);
      input.onChange(values);
    }}
    onRequestDelete={deletedChip => {
      let values = input.value || [];
      values = values.filter(v => v.value !== deletedChip);
      input.onChange(values);
    }}
    onBlur={() => input.onBlur()}
    dataSource={dataSource}
    dataSourceConfig={dataSourceConfig}
    hintText={hintText}
    floatingLabelText={floatingLabelText}
  />
);

export function RelatedCases({ intl, cases }) {
  return (
    <Field
      name="related_cases"
      component={renderChip}
      hintText={intl.formatMessage({
        id: "search_related_cases"
      })}
      dataSource={cases}
      dataSourceConfig={{ text: "text", value: "value" }}
    />
  );
}

export function RelatedMethods({ intl, methods }) {
  return (
    <Field
      name="related_methods"
      component={renderChip}
      hintText={intl.formatMessage({
        id: "search_related_methods"
      })}
      dataSource={methods}
      dataSourceConfig={{ text: "text", value: "value" }}
    />
  );
}

export function RelatedOrganizations({ intl, organizations }) {
  return (
    <Field
      name="related_organizations"
      component={renderChip}
      hintText={intl.formatMessage({
        id: "search_related_organizations"
      })}
      dataSource={organizations}
      dataSourceConfig={{ text: "text", value: "value" }}
    />
  );
}
