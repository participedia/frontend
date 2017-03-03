import React from 'react';
import {shallow} from 'enzyme';
import {Organization} from '../src/containers/Organization';
import { mountWithIntl, shallowWithIntl } from '../src/helpers/intl-enzyme-test-helper.js';
import orgData from './org_data.json';
import intlProps from '../src/helpers/intl-props-test-helper.js';

function setup() {
  const props = {
    intl: intlProps,
    params: {nodeID: 199}
  }

  const enzymeWrapper = shallowWithIntl(<Organization {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

describe('containers', () => {
  describe('Organization', () => {
    it('should render proper data for org', () => {

      const { enzymeWrapper } = setup()
      // enzymeWrapper.setState({data: orgData})
      expect(enzymeWrapper.find('.sub-heading').length).toBe(2);
      expect(enzymeWrapper.find('h2.case-title').text()).not.toBe("");

    })

  })
})
