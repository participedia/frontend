import React from "react";
import { LoginAvatar } from "../LoginAvatar";
import { mountWithIntl } from "../helpers/intl-enzyme-test-helper.js";
// import intlProps from "../helpers/intl-props-test-helper.js";
import { IntlProvider } from "react-intl";
const intlProvider = new IntlProvider({ locale: "en-US" }, {});
const { intl } = intlProvider.getChildContext();
import { getBestMatchingMessages } from "../utils/l10n";
let locale = "en-US";
let messages = getBestMatchingMessages(locale);
jest.mock("material-ui/FlatButton");
jest.mock("material-ui/IconMenu");
intl.messages = messages;
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});

import authService from "../utils/AuthService";
authService.isAuthenticated = jest.fn();

function setup(isAuthed) {
  const props = {
    intl: intl
  };

  const enzymeWrapper = mountWithIntl(<MuiThemeProvider muiTheme={muiTheme}><LoginAvatar {...props} /></MuiThemeProvider>);

  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("LoginAvatar", () => {
    it("should render user menu if logged in", () => {
      authService.isAuthenticated.mockImplementation(() => true);
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find("div.avatar").length).toBe(1);
    });

    it("should show login button if logged out", () => {
      authService.isAuthenticated.mockImplementation(() => false);
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find("div.loginButton").length).toBe(1);
    });
  });
});
