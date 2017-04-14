// Modules
import React, { Component, PropTypes } from 'react';
import { FormControl, OverlayTrigger, Popover } from 'react-bootstrap';
import ReactDOM from 'react-dom';
// Components
import { Tooltip } from '../../components';
// Styles
import * as styles from './InputField.scss';

export default class OMInputField extends Component {
  static propTypes = {
    isMobile: PropTypes.bool,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    validate: PropTypes.func,
    isInvalid: PropTypes.bool,
    showHoverTooltip: PropTypes.bool,
    tooltipMessage: PropTypes.string,
    fieldIsDirty: PropTypes.func,
    doValidate: PropTypes.bool,
    hidePasswordTitle: PropTypes.string,
    revealPasswordTitle: PropTypes.string
  };

  state = {
    type: this.props.type,
    inputField: null,
    isInvalid: this.props.isInvalid,
    showMobileTooltip: false,
    hidePassword: false
  };

  componentDidMount = () => {
    this.setState({
      inputField: ReactDOM.findDOMNode(this.refs.inputField)
    });
  };

  componentWillReceiveProps = ({doValidate, isInvalid, value}) => {
    if (doValidate && doValidate !== this.props.doValidate) {
      this.validate(this.state.inputField);
    }
    if (isInvalid !== this.props.isInvalid) {
      this.setState({isInvalid});
    }
    if (value && value !== this.props.value && this.props.validate && this.state.inputField) {
      this.state.inputField.value = value;
      this.validate(this.state.inputField);
    }
  };

  validate = (target) => {
    const isValid = this.props.validate(target.value);

    if (!isValid) {
      target.classList.add('not_valid');
    } else {
      target.classList.remove('not_valid');
    }
    this.setState({isInvalid: !isValid});
  };

  handleBlur = (event) => {
    if (this.props.fieldIsDirty) {
      this.props.fieldIsDirty(true);
    }
    if (this.props.validate) {
      this.validate(event.target);
    }
  };

  handleFocus = (event) => {
    event.target.classList.remove('not_valid');
    this.setState({
      isInvalid: false,
      showMobileTooltip: false
    });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleIconClick = (event) => {
    event.preventDefault();
    this.setState({
      showMobileTooltip: !this.state.showMobileTooltip
    });
  };

  render() {
    const { showHoverTooltip, tooltipMessage, isMobile, name, type, placeholder, title, isInvalid, className, hidePasswordTitle, revealPasswordTitle } = this.props;
    const inputType = (this.state.hidePassword) ? 'text' : 'password';
    const tooltip = showHoverTooltip && this.state.isInvalid ? (
      <Popover id="tooltip">
        {tooltipMessage}
      </Popover>
    ) : <span id="tooltip" />;

    const passwordIcon = (this.state.type === 'password')
      ? (<div className={styles.iconWrapper}>
           <img
             className={styles.hidePassword}
             src={(this.state.hidePassword) ? '/icons/hide-password-icon.svg' : '/icons/reveal-password-icon.svg'}
             onClick={() => this.setState({hidePassword: !this.state.hidePassword})}
             alt={(this.state.hidePassword) ? hidePasswordTitle : revealPasswordTitle}
             title={(this.state.hidePassword) ? hidePasswordTitle : revealPasswordTitle}
           />
         </div>)
      : null;

    return (
      (isMobile)
        ? (<div className={styles.mobileInput}>
            <input
              {...this.props}
              ref="inputField"
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              name={name}
              type={(this.state.type === 'password') ? inputType : type}
              placeholder={placeholder}
              title={title}
              className={`form-control ${styles.inputField} ${isInvalid ? 'not_valid' : ''} ${className || ''}`}
            />
          { passwordIcon }
          { (this.state.isInvalid)
              ? (<img
                  src={'/icons/exclamation-button.png'}
                  alt="warning-icon"
                  tabIndex="1"
                  onBlur={() => this.setState({showMobileTooltip: false})}
                  onClick={this.handleIconClick}
                />)
              : null}
            { (this.state.showMobileTooltip && this.state.isInvalid)
              ? (<OMTooltip
                  msg={tooltipMessage}
                  className="mobileAuthenticationTooltip"
                />)
              : null }
          </div>)
        : (<div className={styles.wrapper}>
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="left"
              overlay={tooltip}
            >
              <FormControl
                {...this.props}
                ref="inputField"
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                name={name}
                type={(this.state.type === 'password') ? inputType : type}
                placeholder={placeholder}
                title={title}
                className={`${styles.inputField} ${isInvalid ? 'not_valid' : ''} ${className || ''}`}
              />
          </OverlayTrigger>
          { passwordIcon }
        </div>)
    );
  }
}
