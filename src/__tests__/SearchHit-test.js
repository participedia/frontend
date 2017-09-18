import React from "react";
import { MemoryRouter } from "react-router";
import { SearchHit } from "../components/SearchHit/SearchHit";
import resultData from "./result_data.json";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});
import { IntlProvider } from "react-intl";
import { getBestMatchingMessages } from "../utils/l10n";
let locale = "en-US";
let messages = getBestMatchingMessages(locale);
import { mount } from "enzyme";

const intlProvider = new IntlProvider({ locale: locale }, {});
const { intl } = intlProvider.getChildContext();

jest.mock("material-ui/IconButton");

function setup(nprops) {
  const props = {
    intl: intl,
    selectedViewType:
      nprops && nprops.selectedViewType ? nprops.selectedViewType : "grid",
    record: resultData
  };

  const enzymeWrapper = mount(
    <IntlProvider locale={locale} messages={messages}>
      <MuiThemeProvider theme={muiTheme}>
        <MemoryRouter>
          <SearchHit {...props} />
        </MemoryRouter>
      </MuiThemeProvider>
    </IntlProvider>
  );
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
      const { enzymeWrapper } = setup({ selectedViewType: "list" });
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
