import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { userAuthenticationTabs } from '../../../constants';
import { UserAuthenticationForm } from '../UserAuthenticationForm/UserAuthenticationForm';

export class UserAuthenticationBody extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
    selectedTab: PropTypes.number.isRequired,
    translate: PropTypes.func,
    forgotPassword: PropTypes.func,
    authenticateUser: PropTypes.func,
    userAuthentication: PropTypes.object,
    validateEmail: PropTypes.func,
    validatePassword: PropTypes.func,
    emailIsValid: PropTypes.bool,
    passwordIsValid: PropTypes.bool,
    changeTab: PropTypes.func,
    triggerPressEnter: PropTypes.func
  };

  handleSelect = (key) => {
    this.props.changeTab({ selectedTab: key });
  };

  render() {
    return (
      <Tabs defaultActiveKey={this.props.selectedTab} onSelect={this.handleSelect} id="user_authentication">
        <Tab eventKey={userAuthenticationTabs.SIGN_IN} title={`${this.props.translate('signInTab', 'tabTitle')}`}>
          <UserAuthenticationForm
            locale={this.props.locale}
            forgotPassword={this.props.forgotPassword}
            translate={this.props.translate('signInTab')}
            typeTab={userAuthenticationTabs.SIGN_IN}
            authenticateUser={this.props.authenticateUser}
            userAuthentication={this.props.userAuthentication}
            validateEmail={this.props.validateEmail}
            validatePassword={this.props.validatePassword}
            emailIsValid={this.props.emailIsValid}
            passwordIsValid={this.props.passwordIsValid}
            formIsActive={this.props.selectedTab === userAuthenticationTabs.SIGN_IN}
            triggerPressEnter={this.props.triggerPressEnter}
            isMobile={this.props.isMobile}
          />
        </Tab>
        <Tab eventKey={userAuthenticationTabs.NEW_ACCOUNT}
             title={`${this.props.translate('newAccountTab', 'tabTitle')}`}>
          <UserAuthenticationForm
            locale={this.props.locale}
            translate={this.props.translate('newAccountTab')}
            typeTab={userAuthenticationTabs.NEW_ACCOUNT}
            authenticateUser={this.props.authenticateUser}
            userAuthentication={this.props.userAuthentication}
            validateEmail={this.props.validateEmail}
            validatePassword={this.props.validatePassword}
            emailIsValid={this.props.emailIsValid}
            passwordIsValid={this.props.passwordIsValid}
            formIsActive={this.props.selectedTab === userAuthenticationTabs.NEW_ACCOUNT}
            triggerPressEnter={this.props.triggerPressEnter}
            isMobile={this.props.isMobile}
          />
        </Tab>
      </Tabs>
    );
  }
}

