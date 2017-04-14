import React from "react";
import { Organization } from "../src/containers/Organization";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import { mountWithIntl } from "../src/helpers/intl-enzyme-test-helper.js";
import orgData from "./org_data.json";
import intlProps from "../src/helpers/intl-props-test-helper.js";
import afterPromises from "../src/helpers/afterPromises";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let fetchMock = require("fetch-mock");

fetchMock.get(
  process.env.REACT_APP_API_URL + "/organization/4219",
  JSON.stringify({ data: orgData })
);
fetchMock.get(
  process.env.REACT_APP_ASSETS_URL + "countries/fullname/Italy.svg",
  JSON.stringify({ data: orgData })
);

function setup() {
  const props = {
    intl: intlProps,
    location: {pathname: "/en-US/organization/4219"},
    params: { nodeID: 4219 }
  };

  const enzymeWrapper = mountWithIntl(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Organization {...props} />
    </MuiThemeProvider>
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
