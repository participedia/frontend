import React from "react";
import { Method } from "../src/containers/Method";
import { shallowWithIntl } from "../src/helpers/intl-enzyme-test-helper.js";
import methodData from "./method_data.json";
import intlProps from "../src/helpers/intl-props-test-helper.js";
import afterPromises from "../src/helpers/afterPromises";

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

  const enzymeWrapper = shallowWithIntl(<Method {...props} />);
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
        expect(enzymeWrapper.find(".sub-heading").length).toBe(2);
        expect(enzymeWrapper.find("h2.case-title").text()).not.toBe("");
      });
    });
  });
});
