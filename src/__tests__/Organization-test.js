import React from "react";
import renderer from "react-test-renderer";

import OrganizationDetails from "../components/OrganizationDetails";
import OrganizationEditor from "../components/OrganizationEditor";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import { IntlProvider } from "react-intl";
import { getBestMatchingMessages } from "../utils/l10n";
let locale = "en-US";
let messages = getBestMatchingMessages(locale);

import { MemoryRouter } from "react-router";
import { Organization } from "../containers/Organization";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import { mountWithIntl } from "../helpers/intl-enzyme-test-helper.js";
import data from "./org_data.json";
import intlProps from "../helpers/intl-props-test-helper.js";
import afterPromises from "../helpers/afterPromises";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let fetchMock = require("fetch-mock");
jest.mock("material-ui/FloatingActionButton");
jest.mock("../components/BookmarkToggle");
jest.mock("react-timeago", () => {
  const React = require("react");
  const TimeAgo = props => React.createElement("TimeAgo");
  return TimeAgo;
}); // so we don't break tests as time goes by
jest.mock("material-ui/TextField", () => "Textfield");
jest.mock("material-ui/RaisedButton");
jest.mock("material-ui/RadioButton");
jest.mock("material-ui/DatePicker");
jest.mock("material-ui/SelectField");
jest.mock("material-ui/SvgIcon");
jest.mock("react-geosuggest");
jest.mock("material-ui-chip-input");
jest.mock("../vendor/react-items-list");
jest.mock("../components/LazyBodyEditor");

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
    auth: { getProfile: cb => cb({}), isAuthenticated: () => false },
    location: { pathname: "/organization/4219" },
    match: { params: { nodeID: 4219 } },
    toggleFeatured: function() {},
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

let props = setup().props;
props["details"] = OrganizationDetails;

describe("containers", () => {
  describe("Organization", () => {
    it("should render proper data for org", done => {
      const { enzymeWrapper } = setup();
      afterPromises(done, () => {
        expect(enzymeWrapper.find(".sub-heading").length).toBe(2);
        expect(enzymeWrapper.find("h2.case-title").text()).not.toBe("");
      });
    });
  });
});

test("ItemDetails for Organization renders correctly", () => {
  const tree = renderer
    .create(
      <IntlProvider locale={locale} messages={messages}>
        <MemoryRouter>
          <ItemDetails {...props} toggleHidden={function() {}} />
        </MemoryRouter>
      </IntlProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test("Organization editor renders correctly", () => {
  const tree = renderer
    .create(
      <IntlProvider locale={locale} messages={messages}>
        <MemoryRouter>
          <MuiThemeProvider muiTheme={muiTheme}>
            <OrganizationEditor {...props} type="organization" thing={data} />
          </MuiThemeProvider>
        </MemoryRouter>
      </IntlProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
