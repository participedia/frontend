/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Tags } from "../components/RelatedEditors";
import { Form, Field } from "simple-react-form";
import "../components/CaseEditor.css";
import "./story.css";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import tags_json from "../autocomplete_data/tags.json";
const tags = tags_json["tags"];

let thing = {};
let intl = {};

const ThemeDecorator = storyFn =>
  <MuiThemeProvider muiTheme={muiTheme}>
    {storyFn()}
  </MuiThemeProvider>;
addDecorator(ThemeDecorator);

const FormDecorator = storyFn =>
  <Form
    className="story-form"
    onSubmit={() => console.log("submitting")}
    state={thing}
    onChange={changes =>
      function() {
        thing = changes;
      }}
  >
    {storyFn()}
  </Form>;

storiesOf("Tags", module).addDecorator(FormDecorator).add("no default", () =>
  <div>
    <div className="sub-heading">Tag picker</div>
    <Field
      fieldName="tags"
      name="tags"
      thing={thing}
      type={Tags}
      property="tags"
      value={thing.tags || []}
      dataSource={tags}
      intl={intl}
    />
  </div>
);

thing = { tags: ["a", "b"] };

storiesOf("Tags", module).addDecorator(FormDecorator).add("default tags", () =>
  <div>
    <div className="sub-heading">Tag picker</div>
    <Field
      fieldName="tags"
      name="tags"
      thing={thing}
      type={Tags}
      property="tags"
      value={thing.tags || []}
      dataSource={tags}
      intl={intl}
    />
  </div>
);
