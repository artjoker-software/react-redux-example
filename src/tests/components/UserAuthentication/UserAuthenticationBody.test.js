import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { UserAuthenticationBody } from '../../../components/UserAuthentication/UserAuthenticationBody/UserAuthenticationBody';
import { UserAuthenticationForm } from '../../../components/UserAuthentication/UserAuthenticationForm/UserAuthenticationForm';
import { userAuthenticationTabs } from '../../../constants';

const mockTranslate = str => () => str;

describe('UserAuthenticationBody', () => {
  it('should render correctly', () => {
    const wrapper = mount(<UserAuthenticationBody translate={mockTranslate} selectedTab={userAuthenticationTabs.SIGN_IN} />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find(UserAuthenticationForm)).to.have.length(2);
  });
});
