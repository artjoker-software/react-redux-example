import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Header from '../../components/Header/Header';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { i18n } from 'redux-pagan';
import { UserAuthentication } from '../../components';
import { userAuthenticationTabs } from '../../constants';

const initialState = {};

const store = createStore(combineReducers({
  lang: i18n
}), initialState);

const header = mount(
  <Provider store={store}>
    <Header isShown="true" />
  </Provider>
);

describe('Header', () => {
  it('should render correctly', () => {
    expect(header).to.have.length(1);
  });

  it('link should have href', () => {
    header.find('a').forEach((item) => {
      expect(item.node).to.have.property('href');
    });
  });

  it('it should show up userAuthOverlay', () => {
    const mockEvent = {
      target: {
        tagName: 'SPAN',
        offsetParent: {
          name: 2
        }
      }
    };

    expect(header.find(UserAuthentication)).to.have.length(0);
    header.find(`a [name=${userAuthenticationTabs.NEW_ACCOUNT}]`).simulate('click');
    expect(header.find(UserAuthentication)).to.have.length(1);
    expect(header.find(UserAuthentication).prop('showOverlay')).to.equal(true);
    header.find(`a [name=${userAuthenticationTabs.NEW_ACCOUNT}]`).simulate('click', mockEvent);
    expect(header.find(UserAuthentication)).to.have.length(1);
  });

  it('it should close userAuthOverlay', () => {
    expect(header.find(UserAuthentication)).to.have.length(1);
    header.find(UserAuthentication).prop('hideOverlay')();
    expect(header.find(UserAuthentication)).to.have.length(0);
  });
});
