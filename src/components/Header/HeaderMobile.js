// Modules
import React, { Component, PropTypes } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { getLang } from 'redux-pagan';
import { browserHistory} from 'react-router';
// Redux
import { openMobileHeader, hideMobileHeader } from '../../redux/modules/mobileHeader';
// Helpers
import { userAuthenticationTabs } from '../../constants';
import { trackModalOpen } from '../../utils/analytics/analyticsManager';
import appendLocale from '../../helpers/appendLocale';
// Styles
import * as styles from './Header.scss';
import cx from 'classnames';

@connect(
  state => ({
    isMobileHeaderOpen: state.mobileHeader.isMobileHeaderOpen,
    translate: getLang(state.lang, 'static', 'header')
  }), { openMobileHeader, hideMobileHeader }
)

export default class HeaderMobile extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    route: PropTypes.string.isRequired,
    location: PropTypes.string,
    userIsAuthorized: PropTypes.bool,
    openAuthenticationModal: PropTypes.func,
    openMessageModal: PropTypes.func,
    logOut: PropTypes.func,
    isMobileHeaderOpen: PropTypes.bool,
    openMobileHeader: PropTypes.func,
    hideMobileHeader: PropTypes.func
  };

  componentWillReceiveProps(newProps) {
    if (newProps.route !== this.props.route) {
      this.props.hideMobileHeader();
    }
    if (!this.props.isMobileHeaderOpen && newProps.isMobileHeaderOpen) {
      document.body.classList.add('open-mobile-menu');
    }
    if (this.props.isMobileHeaderOpen && !newProps.isMobileHeaderOpen) {
      this.closeMenu();
    }
  }

  // TODO: Improve homepage detection without locale dependency
  isHomePage = () => (!this.props.location || (this.props.route === '/' || this.props.route === '/ru/'));

  handleOpen = () => (this.props.isMobileHeaderOpen) ?
    this.props.hideMobileHeader() : this.props.openMobileHeader();

  handleUserAuth = (selectedTab) => {
    this.props.hideMobileHeader();
    this.closeMenu();
    this.openUserAuthOverlay(selectedTab);
  };

  closeMenu = () => document.body.classList.remove('open-mobile-menu');

  openUserAuthOverlay = (selectedTab) => {
    this.props.openAuthenticationModal({ selectedTab });
    const modalName = (selectedTab === userAuthenticationTabs.SIGN_IN) ? 'login' : 'register';

    trackModalOpen(modalName);
  };

  clickHome = (event) => {
    if (this.isHomePage()) {
      event.preventDefault();
      global.window.location.reload();
    }
  };

  render() {
    const userAuthorizedBlock = (
      <Nav className={styles.dropMenuList}>
        <LinkContainer to={appendLocale(this.props.locale, '/profile/edit')}>
          <MenuItem>
            <span className="icon icon-user" />
            {this.props.translate('editProfile')}
          </MenuItem>
        </LinkContainer>
        <MenuItem onClick={this.props.logOut}>
          <span className="icon icon-logout" />
          {`${this.props.translate('logOut')}`}
        </MenuItem>
      </Nav>
    );
    const userNotAuthorizedBlock = (
      <Nav className={styles.dropMenuList}>
        <MenuItem onClick={() => this.handleUserAuth(userAuthenticationTabs.SIGN_IN)}>
          <span className="icon icon-login" />
          {this.props.translate('signIn')}
        </MenuItem>
        <MenuItem onClick={() => this.handleUserAuth(userAuthenticationTabs.NEW_ACCOUNT)}>
          <span className="icon icon-new-account" />
          {this.props.translate('newAccount')}
        </MenuItem>
      </Nav>
    );
    const authenticationBlock = (this.props.userIsAuthorized) ? userAuthorizedBlock : userNotAuthorizedBlock;

    const isHomePage = this.isHomePage();
    const isHomeDetails = (this.props.location === 'home_details');
    const logoImage = (isHomePage) ? 'logo-white.svg' : 'logo-blue.svg';

    const event = ('ontouchstart' in window) ? 'onTouchStart' : 'onClick';

    const menuBurger = (isHomeDetails && (history.length > 2))
      ? (<span
          className={styles.buttonBack}
          onClick={browserHistory.goBack}
        ><span className="icon icon-next"/></span>)
      : (<span className={styles.btnToggle} { ...{[event]: this.handleOpen} }> {/* This is how you do conditional attributes :) */}
           <span className="icon-nav">
             <span/>
             <span/>
             <span/>
             <span/>
           </span>
         </span>);

    return (
      <header className={styles.mobileHeader}>
        <div className={`mobileNavigation ${styles.mobileMenu}`} id={(isHomePage) ? 'header_home_page' : ''}>
          <LinkContainer to={appendLocale(this.props.locale, '/')}>
            <a className={styles.logoLink}>
              <img
                alt="Logo"
                className={styles.logoSmall}
                src={`/images/${logoImage}`}
                title={`${this.props.translate('homepage')}`}
                onClick={this.clickHome}
              />
            </a>
          </LinkContainer>
          { menuBurger }
          <div className={`${styles.dropMenu} ${(this.props.isMobileHeaderOpen) ? 'open-menu' : ''}`}>
            <Nav className={styles.dropMenuList}>
              <LinkContainer to={appendLocale(this.props.locale, '/')}>
                <MenuItem
                  onClick={this.clickHome}>
                  <span className="icon" />
                  {this.props.translate('dropDownMenu', 'homePage')}
                </MenuItem>
              </LinkContainer>
            </Nav>
            {authenticationBlock}
            <Nav className={styles.dropMenuList}>
              <LinkContainer to={appendLocale(this.props.locale, '/about')}>
                <MenuItem>
                  <span className="icon icon-about" />
                  {this.props.translate('dropDownMenu', 'aboutUs')}
                </MenuItem>
              </LinkContainer>
            </Nav>
          </div>
        </div>
      </header>
    );
  }
}
