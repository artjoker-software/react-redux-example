import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Footer } from '../../components';
import * as style from '../../components/Footer/Footer.scss';
import * as translationEN from '../../translations/en.json';

const translation = translationEN.static.footer;

const isKeyInTranlationFile = key => key in translation;

const mountFooter = mount(<Footer translate={(node, key) => key} />);

describe('Footer', () => {
  it('should render footer component', () => {
    expect(mountFooter).to.have.length(1);
  });

  it('should contain SocialBlock if it rendered', () => {
    expect(mountFooter.setProps({ displaySocial: true }).find('#SocialBlock')).to.have.length(1);
  });

  it('should not contain SocialBlock if it not rendered', () => {
    expect(mountFooter.setProps({ displaySocial: false }).find('#SocialBlock')).to.have.length(0);
  });

  it('should contain 4 navItems', () => {
    expect(mountFooter.find(`ul .${style.nav}`).children()).to.have.length(4);
  });

  it('navItems should have links', () => {
    const wrapper = mountFooter.find(`ul .${style.nav}`).children();

    wrapper.forEach(
      (node) => {
        expect(node.props('to').to).to.be.a('string');
      }
    );
  });

  it('translation file should contain keys which we render', () => {
    const wrapper = mountFooter.find(`ul .${style.nav}`).children();

    wrapper.forEach(
      (node) => {
        console.log(node.text());
        console.log(isKeyInTranlationFile(node.text()));
        expect(isKeyInTranlationFile(node.text())).to.equal(true);
      }
    );
  });
});
