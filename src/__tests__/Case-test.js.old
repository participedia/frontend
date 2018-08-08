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
jest.mock("../components/BodyEditor");
jest.mock("../utils/s3upload");
jest.mock("material-ui/FloatingActionButton");
jest.mock("../components/BookmarkToggle");
jest.mock("material-ui/TextField", () => "Textfield");
jest.mock("material-ui/RaisedButton");
jest.mock("material-ui/RadioButton");
jest.mock("material-ui/DatePicker");
jest.mock("material-ui/SelectField");
jest.mock("material-ui/SvgIcon");
jest.mock("react-geosuggest");
jest.mock("material-ui-chip-input");
jest.mock("../vendor/react-items-list");
let locale = "en-US";
let messages = getBestMatchingMessages(locale);

function setup() {
  const props = {
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

let props = setup().props;
props["details"] = CaseDetails;

describe("containers", () => {
  describe("Case", () => {
    it("should render proper data for case", done => {
      const { enzymeWrapper } = setup();
      afterPromises(done, () => {
        expect(enzymeWrapper.find("p.author-line").length).toBe(2);
        expect(enzymeWrapper.find("h1.case-title").text()).not.toBe("");
      });
    });
  });
});

test("ItemDetails for Case renders correctly", () => {
  const tree = renderer
    .create(
      <IntlProvider locale={locale} messages={messages}>
        <MemoryRouter>
          <ItemDetails toggleHidden={function() {}} {...props} />
        </MemoryRouter>
      </IntlProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip("Case editor renders correctly", () => {
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
