import React from "react";
import renderer from "react-test-renderer";

import { Case } from "../containers/Case";
import CaseDetails from "../components/CaseDetails";
import CaseEditor from "../components/CaseEditor";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import { IntlProvider } from "react-intl";
import { getBestMatchingMessages } from "../utils/l10n";

import { MemoryRouter } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import { mountWithIntl } from "../helpers/intl-enzyme-test-helper.js";
import caseData from "./case_data.json";
import intlProps from "../helpers/intl-props-test-helper.js";
import afterPromises from "../helpers/afterPromises";
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

jest.mock("../components/Gallery");
jest.mock("../components/LazyBodyEditor");
jest.mock("../utils/s3upload");
jest.mock("material-ui/FloatingActionButton");
jest.mock("../components/BookmarkToggle");
// jest.mock("material-ui/TextField");
jest.mock("material-ui/RaisedButton");
jest.mock("material-ui/RadioButton");
jest.mock("material-ui/DatePicker");
jest.mock("material-ui/SelectField");
jest.mock("material-ui/SvgIcon");
jest.mock("react-geosuggest");
jest.mock("material-ui-chip-input");

function setup() {
  const props = {
    intl: intlProps,
    auth: {
      getProfile: cb => cb({}),
      getToken: () => "foo",
      isAuthenticated: () => true
    },
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

test("Case editor renders correctly", () => {
  const tree = renderer
    .create(
      <IntlProvider locale={locale} messages={messages}>
        <MemoryRouter>
          <MuiThemeProvider muiTheme={muiTheme}>
            <CaseEditor {...props} type="case" thing={caseData} />
          </MuiThemeProvider>
        </MemoryRouter>
      </IntlProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
