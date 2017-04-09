import React from "react";
import { Case } from "../src/containers/Case";
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
  process.env.REACT_APP_ASSETS_URL + "Italy.svg",
  JSON.stringify({ data: caseData })
);

function setup() {
  const props = {
    intl: intlProps,
    params: { nodeID: 123 }
  };

  const enzymeWrapper = mountWithIntl(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Case {...props} />
    </MuiThemeProvider>
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
// expect(enzymeWrapper.find("h2.case-title").text()).toBe(
//   "Agenda 21 Locale (Province of Forli-Cesena, Italy)"
// );
