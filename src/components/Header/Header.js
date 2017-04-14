// Styles
import * as styles from './Header.scss';
// Modules
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLang } from 'redux-pagan';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
// Helpers
import { userAuthenticationTabs } from '../../constants';
import { trackModalOpen } from '../../utils/analytics/analyticsManager';
import appendLocale from '../../helpers/appendLocale';

@connect(
  state => ({
    translate: getLang(state.lang, 'static', 'header')
  })
)

export default class Header extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    userIsAuthorized: PropTypes.bool,
    openAuthenticationModal: PropTypes.func,
    profileImage: PropTypes.string,
    openMessageModal: PropTypes.func,
    logOut: PropTypes.func,
    location: PropTypes.string,
    route: PropTypes.string.isRequired
  };

  // TODO: Improve homepage detection without locale dependency
  isHomePage = () => (!this.props.location || (this.props.route === '/' || this.props.route === '/en/'));

  openUserAuthOverlay = (event) => {
    event.preventDefault();

    this.userAuthOverlaySelectedTab = (event.target.tagName === 'SPAN') ? +event.target.offsetParent.name : +event.target.name;
    this.props.openAuthenticationModal({ selectedTab: this.userAuthOverlaySelectedTab });
    const modalName = (this.userAuthOverlaySelectedTab === userAuthenticationTabs.SIGN_IN) ? 'login' : 'register';

    trackModalOpen(modalName);
  };

  clickHome = (event) => {
    if (this.isHomePage()) {
      event.preventDefault();
      global.window.location.reload();
    }
  };

  render() {
    const profileImage = (this.props.profileImage) ? <img src={this.props.profileImage}/> : <i className="fa fa-user-o" aria-hidden="true"></i>;

    const userAuthorizedBlock = (
      <Nav className={styles.listMenu} pullRight>
        <NavDropdown
          bsSize="small"
          title={`${this.props.translate('profile')}`}
          id="dropdown-size-small"
          eventKey={6}
        >
          <LinkContainer to={appendLocale(this.props.locale, '/profile/edit')}>
            <MenuItem eventKey="1">
              {`${this.props.translate('editProfile')}`}
            </MenuItem>
          </LinkContainer>
          <MenuItem eventKey="3" onClick={this.props.logOut}>
            {`${this.props.translate('logOut')}`}
          </MenuItem>
        </NavDropdown>
        <li className={styles.userProfileImage}>
          {profileImage}
        </li>
      </Nav>
    );

    const userNotAuthorizedBlock = (
      <Nav pullRight className={styles.listMenu}>
        <NavItem
          onClick={this.openUserAuthOverlay}
          name={userAuthenticationTabs.SIGN_IN}
          eventKey={6}
        >
          {this.props.translate('signIn')}
        </NavItem>
        <NavItem
          onClick={this.openUserAuthOverlay}
          name={userAuthenticationTabs.NEW_ACCOUNT}
          eventKey={7}>
          {this.props.translate('newAccount')}
        </NavItem>
      </Nav>
    );

    const authenticationBlock = (this.props.userIsAuthorized) ? userAuthorizedBlock : userNotAuthorizedBlock;
    const isHome = this.isHomePage();

    const logoImg = (isHome) ? 'logo-white.svg' : 'logo-blue.svg';

    return (
      <header className={styles.header}>
        <Navbar className={styles.menu} id={(isHome) ? 'header_home_page' : ''}>
          <div className="clearfix">
            <div className={styles.desktopMenu}>
              <Nav pullLeft className={styles.listMenu}>
                <LinkContainer to={appendLocale(this.props.locale, '/')}>
                  <NavItem eventKey={1}>
                    <img
                      alt="Logo"
                      src={`/images/${logoImg}`}
                      title={`${this.props.translate('homepage')}`}
                      onClick={this.clickHome}
                      className={styles.logoSmall}
                    />
                  </NavItem>
                </LinkContainer>
              </Nav>
              {authenticationBlock}
            </div>
          </div>
        </Navbar>
      </header>
    );
  }
}
