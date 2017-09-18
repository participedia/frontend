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

function setup(isAuthed) {
  const props = {
    auth: {
      getProfile: cb => cb(null, { user_metadata: "foo" }),
      isAuthenticated: () => isAuthed
    },
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
      const { enzymeWrapper } = setup(true);
      expect(enzymeWrapper.find("div").hasClass("avatar")).toBe(true);
    });

    it("should show login button if logged out", () => {
      const { enzymeWrapper } = setup(false);
      expect(enzymeWrapper.find("div").hasClass("loginButton")).toBe(true);
    });
  });
});
