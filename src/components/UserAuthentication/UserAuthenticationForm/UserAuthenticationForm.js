// Styles
import * as styles from './UserAuthenticationForm.scss';
import cx from 'classnames';
// Modules
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Button, FormGroup, Checkbox, Popover, Overlay } from 'react-bootstrap';
import { Link } from 'react-router';
// Components
import { InputField } from '../../../components';
// Helpers
import { userAuthenticationTabs } from '../../../constants';
import appendLocale from '../../../helpers/appendLocale';

export class UserAuthenticationForm extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
    typeTab: PropTypes.number.isRequired,
    translate: PropTypes.func,
    forgotPassword: PropTypes.func,
    authenticateUser: PropTypes.func,
    userAuthentication: PropTypes.object,
    validateEmail: PropTypes.func,
    validatePassword: PropTypes.func,
    triggerPressEnter: PropTypes.func,
    emailIsValid: PropTypes.bool,
    passwordIsValid: PropTypes.bool,
    formIsActive: PropTypes.bool
  };

  state = {
    showError: false,
    emailIsValid: false,
    passwordIsValid: false,
    passwordFieldIsDirty: false,
    emailFieldIsDirty: false,
    doValidate: false
  };

  componentWillReceiveProps = ({ emailIsValid, passwordIsValid, userAuthentication, formIsActive }) => {
    const stateModifier = {};

    if (formIsActive === false && formIsActive !== this.props.formIsActive) {
      stateModifier.showError = false;
    }

    if (emailIsValid !== this.state.emailIsValid) {
      stateModifier.emailIsValid = emailIsValid;
    }

    if (passwordIsValid !== this.state.passwordIsValid) {
      stateModifier.passwordIsValid = passwordIsValid;
    }

    if (userAuthentication.error && this.props.userAuthentication.error) {
      if (userAuthentication.error.message !== this.props.userAuthentication.error.message) {
        stateModifier.showError = true;
      }
    } else {
      stateModifier.showError = !!(userAuthentication.error)
    }

    if (Object.keys(stateModifier).length) {
      this.setState(stateModifier);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.userAuthenticationData = {};
    this.setState({
      passwordFieldIsDirty: true,
      emailFieldIsDirty: true,
      doValidate: true
    });

    if (this.state.emailIsValid && this.state.passwordIsValid) {
      for (let index = 0; index < event.target.length; index++) {
        if (event.target[index].tagName === 'INPUT') {
          switch (event.target[index].type) {
            case 'checkbox':
              this.userAuthenticationData[event.target[index].name] = event.target[index].checked;
              break;
            default:
              this.userAuthenticationData[event.target[index].name] = event.target[index].value;
          }
        }
      }
      this.userAuthenticationData.requestType = this.props.typeTab;
      this.props.authenticateUser(this.userAuthenticationData);
    }
  };

  hideTooltip = () => this.setState({
    showError: false,
    doValidate: false
  });

  handleKeyDown = (event) => {
    if (event.target.name === 'password') {
      this.props.triggerPressEnter(event.keyCode, ReactDOM.findDOMNode(this.refs.submit));
    }
  };

  render = () => {
    const isNewAccountTab = this.props.typeTab === userAuthenticationTabs.NEW_ACCOUNT;
    const loadingUserData = (this.props.userAuthentication && this.props.userAuthentication.loading);
    const errorOverlay = (isNewAccountTab)
      ? (<Overlay
          show={this.state.showError}
          target={this.refs.email}
          placement="left"
      >
        <Popover id="tooltipError">
          {this.props.translate('errorMessage')}
        </Popover>
      </Overlay>)
      : null;

    return (
      <form className={ styles.authentication_form } onKeyDown={this.handleKeyDown} onSubmit={this.handleSubmit}>
        <FormGroup ref="email">
          <InputField
            name="email"
            type="text"
            placeholder={`${this.props.translate('emailFieldPlaceholder')}`}
            title={`${this.props.translate('emailTitle')}`}
            onFocus={this.hideTooltip}
            validate={this.props.validateEmail}
            isInvalid={isNewAccountTab ? this.state.showError : false}
            showHoverTooltip={!this.state.emailIsValid && this.state.emailFieldIsDirty}
            tooltipMessage={`${this.props.translate('emailTooltipMessage')}`}
            fieldIsDirty={isDirty => this.setState({emailFieldIsDirty: isDirty})}
            doValidate={this.state.doValidate}
            isMobile={this.props.isMobile}
          />
        </FormGroup>
        <FormGroup>
          <InputField
            name="password"
            type="password"
            placeholder={`${this.props.translate('passwordFieldPlaceholder')}`}
            title={`${this.props.translate('passwordTitle')}`}
            onFocus={this.hideTooltip}
            validate={this.props.validatePassword}
            isInvalid={isNewAccountTab ? this.state.showError : false}
            showHoverTooltip={!this.state.passwordIsValid && this.state.passwordFieldIsDirty}
            tooltipMessage={`${this.props.translate('passwordTooltipMessage')}`}
            fieldIsDirty={isDirty => this.setState({passwordFieldIsDirty: isDirty})}
            doValidate={this.state.doValidate}
            isMobile={this.props.isMobile}
            hidePasswordTitle={`${this.props.translate('hidePassword')}`}
            revealPasswordTitle={`${this.props.translate('revealPassword')}`}
          />
        </FormGroup>
        <FormGroup className={styles.authorization_buttons}>
          <Button ref="submit" bsStyle="primary" type="submit" bsSize="large" block disabled={loadingUserData}>
            { (loadingUserData)
              ? <i className={cx('fa fa-spinner fa-pulse', styles.spinner)}/>
              : <span className="button-text">{this.props.translate('buttonTitle')}</span> }
          </Button>
          {
            (this.props.typeTab === userAuthenticationTabs.SIGN_IN && this.state.showError)
              ? (<div className={styles.errorMessage}>
                  {this.props.translate('errorMessage')}
                </div>)
              : null
          }
        </FormGroup>
        { this.link }
        {errorOverlay}
      </form>
    );
  }
}
