import React from "react";
import renderer from "react-test-renderer";

import MethodDetails from "../components/MethodDetails";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import { IntlProvider } from "react-intl";
import { getBestMatchingMessages } from "../utils/l10n";

import { MemoryRouter } from "react-router";
import { Method } from "../containers/Method";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import { mountWithIntl } from "../helpers/intl-enzyme-test-helper.js";
import data from "./method_data.json";
import intlProps from "../helpers/intl-props-test-helper.js";
import afterPromises from "../helpers/afterPromises";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let fetchMock = require("fetch-mock");

jest.mock("react-timeago", () => {
  const React = require("react");
  const TimeAgo = props => React.createElement("TimeAgo");
  return TimeAgo;
}); // so we don't break tests as time goes by

fetchMock.get(
  process.env.REACT_APP_API_URL + "/method/145",
  JSON.stringify({ data: data })
);

jest.mock("material-ui/FloatingActionButton");
jest.mock("../components/BookmarkToggle");

function setup() {
  const props = {
    intl: intlProps,
    auth: { getProfile: cb => cb({}), isAuthenticated: () => false },
    location: { pathname: "/method/145" },
    match: { params: { nodeID: 145 } },
    toggleFeatured: function() {},
    data: data
  };

  const enzymeWrapper = mountWithIntl(
    <MemoryRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Method {...props} />
      </MuiThemeProvider>
    </MemoryRouter>
  );
  return {
    props,
    enzymeWrapper
  };
}

describe("containers", () => {
  describe("Method", () => {
    it("should render proper data for method", done => {
      const { enzymeWrapper } = setup();
      afterPromises(done, () => {
        expect(enzymeWrapper.find(".sub-heading").length).toBe(1);
        expect(enzymeWrapper.find("h2.case-title").text()).not.toBe("");
      });
    });
  });
});

let props = setup().props;
let locale = "en-US";
props["details"] = MethodDetails;
let messages = getBestMatchingMessages(locale);

test("ItemDetails for Method renders correctly", () => {
  const tree = renderer
    .create(
      <IntlProvider locale={locale} messages={messages}>
        <MemoryRouter><ItemDetails {...props} /></MemoryRouter>
      </IntlProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
