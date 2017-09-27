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

import authService from "../utils/AuthService";
authService.isAuthenticated = jest.fn();

function setup(isAuthed) {
  const props = {
    intl: intl
  };

  const enzymeWrapper = mountWithIntl(<LoginAvatar {...props} />);

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
      expect(enzymeWrapper.find("div").hasClass("avatar")).toBe(true);
    });

    it("should show login button if logged out", () => {
      authService.isAuthenticated.mockImplementation(() => false);
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find("div").hasClass("loginButton")).toBe(true);
    });
  });
});
