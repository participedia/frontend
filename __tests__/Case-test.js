import React from "react";
import renderer from "react-test-renderer";

import { Case } from "../src/containers/Case";
import CaseDetails from "../src/components/CaseDetails";
import ItemDetails from "../src/components/ItemDetails/ItemDetails";
import { IntlProvider } from "react-intl";
import { getBestMatchingMessages } from "../src/utils/l10n";

import { MemoryRouter } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import { mountWithIntl } from "../src/helpers/intl-enzyme-test-helper.js";
import caseData from "./case_data.json";
import intlProps from "../src/helpers/intl-props-test-helper.js";
import afterPromises from "../src/helpers/afterPromises";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let fetchMock = require("fetch-mock");

fetchMock.get(
  process.env.REACT_APP_API_URL + "/case/123",
  JSON.stringify({ data: caseData })
);
fetchMock.get(
  process.env.REACT_APP_ASSETS_URL + "countries/fullname/Italy.svg",
  JSON.stringify({ data: caseData })
);

jest.mock("../src/components/Gallery");
jest.mock("material-ui/FloatingActionButton");

function setup() {
  const props = {
    intl: intlProps,
    location: { pathname: "/method/123" },
    match: { params: { nodeID: 123 } },
    toggleFeatured: function() {},
    data: caseData
  };

  const enzymeWrapper = mountWithIntl(
    <MemoryRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Case {...props} />
      </MuiThemeProvider>
    </MemoryRouter>
  );
  return {
    props,
    enzymeWrapper
  };
}

describe("containers", () => {
  describe("Case", () => {
    it("should render proper data for case", done => {
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
props["details"] = CaseDetails;
let messages = getBestMatchingMessages(locale);

test("ItemDetails for Case renders correctly", () => {
  const tree = renderer
    .create(
      <IntlProvider locale={locale} messages={messages}>
        <MemoryRouter><ItemDetails {...props} /></MemoryRouter>
      </IntlProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
