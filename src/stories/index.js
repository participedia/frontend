/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import RelatedEditor from "../components/RelatedEditor";
import { ChoiceEditor } from "../components/PropEditors";
import getChoices from "../components/choices";
import { Form, Field } from "simple-react-form";
import "../components/CaseEditor.css";
import "./story.css";
import { getBestMatchingMessages } from "../utils/l10n";
import List from "react-items-list";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let locale = "en-US";
let messages = getBestMatchingMessages(locale);

const ThemeDecorator = storyFn =>
  <MuiThemeProvider muiTheme={muiTheme}>
    {storyFn()}
  </MuiThemeProvider>;
addDecorator(ThemeDecorator);

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }
  componentWillReceiveProps(props) {
    this.setState(props.state);
  }
  dumpState() {
    action("submitting")(this.state);
  }
  render() {
    let dumpState = this.dumpState.bind(this);
    let setState = this.setState.bind(this);
    return (
      <div>
        <Form
          className="story-form"
          onChange={function(value) {
            setState(value);
          }}
          state={this.state}
        >
          {this.props.children}
        </Form>
        <button onClick={dumpState}>submit</button>
      </div>
    );
  }
}

storiesOf("Tags", module).add("no default", () =>
  <MyForm state={{ tags: [] }}>
    <div className="sub-heading">Tag picker</div>
    <Field
      fieldName="tags"
      type={RelatedEditor}
      maxSearchResults={30}
      dataSource={["one", "two", "three"]}
    />
  </MyForm>
);

storiesOf("Tags", module).add("default tags", () =>
  <MyForm state={{ tags: ["a", "b"] }}>
    <div className="sub-heading">Tag picker</div>
    <Field
      fieldName="tags"
      type={RelatedEditor}
      dataSource={["one", "two", "three"]}
    />
  </MyForm>
);

storiesOf("RelatedEditors", module).add("no defaults", () =>
  <MyForm state={{ related_things: [] }}>
    <div className="sub-heading">Related things</div>
    <Field
      fieldName="related_things"
      type={RelatedEditor}
      dataSource={[
        { text: "one", value: 1 },
        { text: "two", value: 2 },
        { text: "three", value: 3 },
        { text: "four", value: 4 },
        { text: "five", value: 5 }
      ]}
      dataSourceConfig={{ text: "text", value: "value" }}
    />
  </MyForm>
);

storiesOf("RelatedEditors", module).add("some values", () =>
  <MyForm state={{ related_things: [{ text: "one", value: 1 }] }}>
    <div className="sub-heading">Related things</div>
    <Field
      fieldName="related_things"
      type={RelatedEditor}
      dataSource={[
        { text: "one", value: 1 },
        { text: "two", value: 2 },
        { text: "three", value: 3 },
        { text: "four", value: 4 },
        { text: "five", value: 5 }
      ]}
      dataSourceConfig={{ text: "text", value: "value" }}
    />
  </MyForm>
);

let choices = [
  {
    text: "Issue 1",
    value: "issue_1"
  },
  {
    text: "Issue 2",
    value: "issue_2"
  },
  {
    text: "Issue 3",
    value: "issue_3"
  }
];

storiesOf("ChoicePropEditor", module).add("no defaults", function() {
  return (
    <MyForm state={{ issue: {} }}>
      <div className="sub-heading">Choice</div>
      <Field
        fieldName="issue"
        label="issue"
        type={ChoiceEditor}
        choices={choices}
        dataSource={choices}
        dataSourceConfig={{ text: "text", value: "value" }}
      />
    </MyForm>
  );
});
storiesOf("ListEditor", module).add("no defaults", function() {
  return (
    <MyForm state={{ links: {} }}>
      <div className="sub-heading">List</div>
      <Field
        fieldName="links"
        label="links"
        type={List}
        items={["link 1", "link 2"]}
      />
    </MyForm>
  );
});
