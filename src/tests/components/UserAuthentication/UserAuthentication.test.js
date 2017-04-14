import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { UserAuthentication } from '../../../components';
import { UserAuthenticationBody } from '../../../components/UserAuthentication/UserAuthenticationBody/UserAuthenticationBody';
import { OverlayWindow } from '../../../components';

const mockTranslate = str => () => str;

describe('UserAuthentication', () => {
  const wrapper = mount(<UserAuthentication translate={mockTranslate} showOverlay={true !== false} />);

  it('should render correctly', () => {
    expect(wrapper).to.have.length(1);
    expect(wrapper.find(OverlayWindow)).to.have.length(1);
    expect(wrapper.find(OverlayWindow).prop('overlayBody').type).to.be.equal(UserAuthenticationBody);
  });
});
