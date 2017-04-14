// Styles
import * as styles from './UserAuthentication.scss';
// Modules
import React, { Component, PropTypes } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import { browserHistory } from 'react-router';
// Components
import { Modal } from '../../components';
import { UserAuthenticationBody } from '../../components/UserAuthentication/UserAuthenticationBody/UserAuthenticationBody';
// Helpers
import { authenticationModalType, storage, enterKey, userAuthenticationTabs } from '../../constants';
import { emailRegexValidation, passwordValidation } from '../../utils/validate';
import { setData} from '../../utils/analytics/analyticsManager';
import appendLocale from '../../helpers/appendLocale';

export default class UserAuthentication extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    selectedTab: PropTypes.number,
    authenticateUser: PropTypes.func,
    translate: PropTypes.func,
    userAuthentication: PropTypes.object,
    token: PropTypes.string,
    verifyToken: PropTypes.func,
    updatePassword: PropTypes.func,
    changePassword: PropTypes.func,
    sendEmail: PropTypes.func,
    socialNetworkAuthentication: PropTypes.func,
    changeTab: PropTypes.func,
    switchAuthModalType: PropTypes.func,
    openMessageModal: PropTypes.func,
    hideMessageModal: PropTypes.func,
    isMessageModalOpen: PropTypes.bool
  };

  state = {
    showPreloader: false,
    emailSent: this.props.userAuthentication.emailSent,
    userEmail: '',
    emailIsValid: false,
    passwordIsValid: false
  };

  componentWillMount = () => {
    if (this.props.token) {
      this.props.verifyToken(this.props.token);
    }
  };

  componentWillReceiveProps = ({ userAuthentication, isOpen }) => {
    const { loading, emailSent, userIsAuthorized, authenticationModalType: authModalType } = this.props.userAuthentication;

    const stateModifier = {};

    if (userAuthentication && userAuthentication.loading !== loading) {
      stateModifier.showPreloader = userAuthentication.loading;
    }

    if (userAuthentication && userAuthentication.emailSent !== emailSent) {
      stateModifier.emailSent = userAuthentication.emailSent;
    }

    if (userAuthentication && userAuthentication.userIsAuthorized && userAuthentication.userIsAuthorized !== userIsAuthorized) {
      if (userAuthentication.data) {
        storage.value.setItem('userData', JSON.stringify(userAuthentication.data));
        setData({ userId: userAuthentication.data.id });
      }

      if (userAuthentication && userAuthentication.authenticationModalType === authenticationModalType.DEFAULT) {
        this.props.onRequestClose();
      }
    }

    if (this.props.isMobile && userAuthentication.authenticationModalType !== authModalType) {
      this.openMessage(userAuthentication.authenticationModalType);
    }

    if (isOpen === false && isOpen !== this.props.isOpen) {
      // Redirect
      if (this.props.token) {
        browserHistory.push(appendLocale(this.props.locale, '/'));
      }
    }

    if (Object.keys(stateModifier).length) {
      this.setState(stateModifier);
    }
  };

  hideModal = () => {
    this.props.onRequestClose();
  };

  hideMessageModal = () => {
    this.props.hideMessageModal();
  };

  forgotPassword = () => {
    this.props.switchAuthModalType({bodyType: authenticationModalType.FORGOT_PASSWORD});
  };

  knowPassword = () => {
    this.props.switchAuthModalType({
      bodyType: authenticationModalType.DEFAULT,
      selectedTab: userAuthenticationTabs.SIGN_IN
    });
  };

  sendEmail = (email) => {
    this.setState({
      userEmail: email
    });
    this.props.sendEmail({ email, locale: this.props.locale });
  };

  updatePassword = (password) => {
    this.props.updatePassword({ password: password, token: this.props.token});
  };

  changePassword = (value) => {
    this.props.changePassword(value);
  };

  validateEmail = (email) => {
    const result = emailRegexValidation(email);
    this.setState({
      emailIsValid: result
    });

    return result;
  };

  validatePassword = (password) => {
    const result = passwordValidation(password);
    this.setState({ passwordIsValid: result });

    return result;
  };

  triggerPressEnter = (keyCode, target) => {
    if (keyCode === enterKey) {
      target.click();
    }
  };

  openMessage = (type) => {
    const tryAgainButton = this.submitButton(this.props.translate('userAuthentication', 'tryAgain'), this.hideMessageModal);

    switch (type) {
      case authenticationModalType.TOKEN_INVALID: {
        this.forgotPassword();
        this.props.openMessageModal(
          <div className="contentMessage">
            <div className={styles.centered}>{this.props.translate('userAuthentication', 'invalidTokenMessage', 'part1')}</div>
            <div className={styles.centered}>{this.props.translate('userAuthentication', 'invalidTokenMessage', 'part2')}</div>
            {tryAgainButton}
          </div>
        );
        break;
      }
      default: break;
    }
  };

  submitButton = (translation, action) => (<FormGroup className={styles.buttonLine}>
    <Button
      bsStyle="primary"
      type="submit"
      bsSize="large"
      onClick={action}
    >
      {translation}
    </Button>
  </FormGroup>);

  render() {
    const tryAgainButton = this.submitButton(this.props.translate('userAuthentication', 'tryAgain'), this.forgotPassword);

    const modalBody = (type) => {
      switch (type) {
        case authenticationModalType.TOKEN_INVALID: {
          if (this.props.isMobile) {
            break;
          } else {
            return (
              <div className={styles.invalidModal}>
                <div className={styles.noTitleContent}>
                  <div
                    className={styles.centered}>{this.props.translate('userAuthentication', 'invalidTokenMessage', 'part1')}</div>
                  <div
                    className={styles.centered}>{this.props.translate('userAuthentication', 'invalidTokenMessage', 'part2')}</div>
                </div>
                <div className={styles.centered}>{tryAgainButton}</div>
              </div>
            );
          }
        }
        default: {
          return (
            <div>
              <div><span className={styles.title}>{`${this.props.translate('userAuthentication', 'title')}`}</span></div>
              <UserAuthenticationBody
                locale={this.props.locale}
                forgotPassword={this.forgotPassword}
                translate={this.props.translate('userAuthentication')}
                selectedTab={this.props.selectedTab}
                authenticateUser={this.props.authenticateUser}
                userAuthentication={this.props.userAuthentication}
                validateEmail={this.validateEmail}
                validatePassword={this.validatePassword}
                emailIsValid={this.state.emailIsValid}
                passwordIsValid={this.state.passwordIsValid}
                changeTab={this.props.changeTab}
                triggerPressEnter={this.triggerPressEnter}
                isMobile={this.props.isMobile}
              />
            </div>
          );
        }
      }
    };

    const isCloseButtonInvisible = (this.props.userAuthentication.authenticationModalType === authenticationModalType.SEND_EMAIL_SUCCESS) ||
      (this.props.userAuthentication.authenticationModalType === authenticationModalType.PASSWORD_UPDATED);

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.hideModal}
        className="userAuthenticationModal"
        isCloseButtonInvisible={isCloseButtonInvisible}
        isMobile={this.props.isMobile}
        translate={this.props.translate}
      >
        <div>
          {modalBody(this.props.userAuthentication.authenticationModalType)}
        </div>
      </Modal>
    );
  }
}
