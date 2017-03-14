import React from "react";
import { Case } from "../src/containers/Case/Case";
import { shallowWithIntl } from "../src/helpers/intl-enzyme-test-helper.js";
import caseData from "./case_data.json";
import intlProps from "../src/helpers/intl-props-test-helper.js";
import afterPromises from "../src/helpers/afterPromises";

let fetchMock = require("fetch-mock");

fetchMock.get(
  process.env.REACT_APP_API_URL + "/case/123",
  JSON.stringify({ data: caseData })
);

function setup() {
  const props = {
    intl: intlProps,
    params: { nodeID: 123 }
  };

  const enzymeWrapper = shallowWithIntl(<Case {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("containers", () => {
  describe("Case", () => {
    it("should render proper data for case", function(done) {
      const { enzymeWrapper } = setup();
      afterPromises(done, () => {
        expect(enzymeWrapper.find(".sub-heading").length).toBe(2);
        expect(enzymeWrapper.find("h2.case-title").text()).toBe(
          "Agenda 21 Locale (Province of Forli-Cesena, Italy)"
        );
      });
    });
  });
});
