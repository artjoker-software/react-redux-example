import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Modal } from '../../components';

describe('Modal', () => {
  it('should render modal', () => {
    const props = { isOpen: true };
    const modal = mount(<Modal {...props} />);
    expect(modal).to.have.length(1);
  });

  it('shouldn\'t render modal', () => {
    const props = { isOpen: false };
    const modal = mount(<Modal {...props} />);
    expect(modal.find('div').text()).to.be.equal('');
  });
});
