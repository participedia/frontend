import React from 'react';
import {shallow} from 'enzyme';
import {Method} from '../src/containers/Method';
import { mountWithIntl, shallowWithIntl } from '../src/helpers/intl-enzyme-test-helper.js';
import methodData from './method_data.json';
import intlProps from '../src/helpers/intl-props-test-helper.js';

function setup() {
  const props = {
    intl: intlProps,
    params: {nodeID: 145}
  }

  const enzymeWrapper = shallowWithIntl(<Method {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

describe('containers', () => {
  describe('Method', () => {
    it('should render proper data for method', () => {

      const { enzymeWrapper } = setup()
      // enzymeWrapper.setState({data: methodData})
      expect(enzymeWrapper.find('.sub-heading').length).toBe(2);
      expect(enzymeWrapper.find('h2.case-title').text()).not.toBe("");

    })

  })
})
