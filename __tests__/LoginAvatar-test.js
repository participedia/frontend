import React from 'react';
import {shallow} from 'enzyme';
import {LoginAvatar} from '../src/LoginAvatar';
import { mountWithIntl, shallowWithIntl } from '../src/helpers/intl-enzyme-test-helper.js';
import intlProps from '../src/helpers/intl-props-test-helper.js';

function setup() {
  const props = {
    isAuthenticated: true,
    dispatch: jest.fn(),
    intl: intlProps,
    profile: {}
  }

  const enzymeWrapper = shallowWithIntl(<LoginAvatar {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('LoginAvatar', () => {
    it('should render user menu if logged in', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('div').hasClass('avatar')).toBe(true)

    })

    it('should show login button if logged out', () => {
      const { enzymeWrapper } = setup()
      enzymeWrapper.setProps({ isAuthenticated: false });
      expect(enzymeWrapper.find('div').hasClass('loginButton')).toBe(true)

    })

  })
})
