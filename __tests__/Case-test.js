import React from 'react';
import {shallow} from 'enzyme';
import {Case} from '../src/containers/Case/Case';
import { mountWithIntl, shallowWithIntl } from '../src/helpers/intl-enzyme-test-helper.js';
import caseData from './case_data.json';
import intlProps from '../src/helpers/intl-props-test-helper.js';

function setup() {
  const props = {
    intl: intlProps,
    params: {nodeID: 12}
  }

  const enzymeWrapper = shallowWithIntl(<Case {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

describe('containers', () => {
  describe('Case', () => {
    it('should render proper data for case', () => {

      const { enzymeWrapper } = setup()
      enzymeWrapper.setState({data: caseData})
      expect(enzymeWrapper.find('.sub-heading').length).toBe(2);
      expect(enzymeWrapper.find('h2.case-title').text()).not.toBe("");

    })

  })
})
