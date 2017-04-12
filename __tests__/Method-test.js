import React from "react";
import { Method } from "../src/containers/Method";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import { mountWithIntl } from "../src/helpers/intl-enzyme-test-helper.js";
import methodData from "./method_data.json";
import intlProps from "../src/helpers/intl-props-test-helper.js";
import afterPromises from "../src/helpers/afterPromises";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let fetchMock = require("fetch-mock");

fetchMock.get(
  process.env.REACT_APP_API_URL + "/method/145",
  JSON.stringify({ data: methodData })
);

function setup() {
  const props = {
    intl: intlProps,
    params: { nodeID: 145 }
  };

  const enzymeWrapper = mountWithIntl(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Method {...props} />
    </MuiThemeProvider>
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
