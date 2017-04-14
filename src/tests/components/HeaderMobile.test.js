import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import HeaderMobile from '../../components/Header/HeaderMobile';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { i18n } from 'redux-pagan';

const initialState = {};

const store = createStore(combineReducers({
  lang: i18n
}), initialState);

const headerMobile = mount(
  <Provider store={store}>
    <HeaderMobile isShown="true" />
  </Provider>
);

describe('HeaderMobile', () => {
  it('should render correctly', () => {
    expect(headerMobile).to.have.length(1);
  });

  it('should have valid href links', () => {
    headerMobile.find('a').forEach((item) => {
      expect(item.node).to.have.property('href');
    });
  });

  it('it should show up menu', () => {
    expect(headerMobile.find('div > div').node.className).to.not.contain('open-menu');
    headerMobile.find('.icon-bar').simulate('click');
    expect(headerMobile.find('div > div').node.className).to.contain('open-menu');
  });

  it('it should close menu', () => {
    headerMobile.find('.icon-bar').simulate('click');
    expect(headerMobile.find('div > div').node.className).to.contain('open-menu');
    headerMobile.find('.icon-close').simulate('click');
    expect(headerMobile.find('div > div').node.className).to.not.contain('open-menu');
  });
});
