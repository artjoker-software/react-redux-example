import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { UserAuthenticationForm } from '../../../components/UserAuthentication/UserAuthenticationForm/UserAuthenticationForm';
import { userAuthenticationTabs } from '../../../constants';
import { Checkbox } from 'react-bootstrap';

const mockTranslate = str => str;

describe('UserAuthenticationForm', () => {
  it('should render correctly with signIn tab', () => {
    const wrapper = mount(<UserAuthenticationForm translate={mockTranslate} typeTab={userAuthenticationTabs.SIGN_IN} />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find(Checkbox)).to.have.length(0);
    wrapper.unmount();
  });

  it('should render correctly newAccount tab', () => {
    const wrapper = mount(<UserAuthenticationForm
      translate={mockTranslate}
      typeTab={userAuthenticationTabs.NEW_ACCOUNT}
    />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find(Checkbox)).to.have.length(1);
    wrapper.unmount();
  });
});
