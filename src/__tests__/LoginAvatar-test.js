import React from "react";
import { shallow } from "enzyme";
import { LoginAvatar } from "../LoginAvatar";
import {
  mountWithIntl,
  shallowWithIntl
} from "../helpers/intl-enzyme-test-helper.js";
import intlProps from "../helpers/intl-props-test-helper.js";

function setup(isAuthed) {
  const props = {
    auth: {
      getProfile: cb => cb(null, { user_metadata: "foo" }),
      isAuthenticated: () => isAuthed
    },
    intl: intlProps
  };

  const enzymeWrapper = shallowWithIntl(<LoginAvatar {...props} />);

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
