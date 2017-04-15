import React from "react";
import renderer from "react-test-renderer";

import OrganizationDetails from "../src/components/OrganizationDetails";
import ItemDetails from "../src/components/ItemDetails/ItemDetails";
import { IntlProvider } from "react-intl";
import { getBestMatchingMessages } from "../src/utils/l10n";

import { MemoryRouter } from "react-router";
import { Organization } from "../src/containers/Organization";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import { mountWithIntl } from "../src/helpers/intl-enzyme-test-helper.js";
import data from "./org_data.json";
import intlProps from "../src/helpers/intl-props-test-helper.js";
import afterPromises from "../src/helpers/afterPromises";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let fetchMock = require("fetch-mock");
jest.mock("material-ui/FloatingActionButton");

fetchMock.get(
  process.env.REACT_APP_API_URL + "/organization/4219",
  JSON.stringify({ data: data })
);
fetchMock.get(
  process.env.REACT_APP_ASSETS_URL + "countries/fullname/Italy.svg",
  JSON.stringify({ data: data })
);

function setup() {
  const props = {
    intl: intlProps,
    location: { pathname: "/organization/4219" },
    match: { params: { nodeID: 4219 } },
    data: data
  };

  const enzymeWrapper = mountWithIntl(
    <MemoryRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Organization {...props} />
      </MuiThemeProvider>
    </MemoryRouter>
  );
  return {
    props,
    enzymeWrapper
  };
}

describe("containers", () => {
  describe("Organization", () => {
    it("should render proper data for org", done => {
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
props["details"] = OrganizationDetails;
let messages = getBestMatchingMessages(locale);

test("ItemDetails for Organization renders correctly", () => {
  const tree = renderer
    .create(
      <IntlProvider locale={locale} messages={messages}>
        <MemoryRouter><ItemDetails {...props} /></MemoryRouter>
      </IntlProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
