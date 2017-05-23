import React from "react";
import { MemoryRouter } from "react-router";
import { SearchHit } from "../components/SearchHit/SearchHit";
import { shallowWithIntl } from "../helpers/intl-enzyme-test-helper.js";
import resultData from "./result_data.json";
import intlProps from "../helpers/intl-props-test-helper.js";

function setup() {
  const props = {
    intl: intlProps,
    selectedViewType: "grid",
    record: resultData
  };

  const enzymeWrapper = shallowWithIntl(<SearchHit {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("SearchHit", () => {
    it("should show grid when selectedViewType is grid", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find(".grid-item").length).toBe(1);
    });

    it("should show list when selectedViewType is list", () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.setProps({ selectedViewType: "list" });
      expect(enzymeWrapper.find(".list-item").length).toBe(1);
    });

    it("should show grid when changing back to grid mode", () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.setProps({ selectedViewType: "list" });
      enzymeWrapper.setProps({ selectedViewType: "grid" });
      expect(enzymeWrapper.find(".grid-item").length).toBe(1);
      expect(enzymeWrapper.find(".list-item").length).toBe(0);
    });
  });
});
