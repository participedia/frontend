import React from "react";
import renderer from "react-test-renderer";

import MethodDetails from "../src/components/MethodDetails";
import ItemDetails from "../src/components/ItemDetails/ItemDetails";
import { IntlProvider } from "react-intl";
import { getBestMatchingMessages } from "../src/utils/l10n";

import { MemoryRouter } from "react-router";
import { Method } from "../src/containers/Method";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import { mountWithIntl } from "../src/helpers/intl-enzyme-test-helper.js";
import data from "./method_data.json";
import intlProps from "../src/helpers/intl-props-test-helper.js";
import afterPromises from "../src/helpers/afterPromises";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let fetchMock = require("fetch-mock");

fetchMock.get(
  process.env.REACT_APP_API_URL + "/method/145",
  JSON.stringify({ data: data })
);

jest.mock("material-ui/FloatingActionButton");

function setup() {
  const props = {
    intl: intlProps,
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
