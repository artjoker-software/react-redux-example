// Modules
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
// Components
import { GenericContainer, UserAuthentication } from '../../containers';
import { Header, Footer, AppHelmet, HeaderMobile } from '../../components';
// Redux
import { setWindowDimentions } from '../../redux/modules/windowDimentions';
import {
  sendEmail,
  logOut,
  authenticateUser,
  openAuthenticationModal,
  hideAuthenticationModal,
  verifyToken,
  addSavedDataToStore,
  socialNetworkAuthentication,
  switchAuthModalType
} from '../../redux/modules/userAuthentication';
// helpers
import config from '../../config';
import WindowDimentionManager from '../../helpers/WindowDimentionManager';
import { authenticationModalType, storage, language } from '../../constants';
import { setLocalization } from '../../helpers/localization';
import { parseUrl } from '../../helpers/routerAdapter';
import { setupStorage } from '../../utils/setupStorage';
// Styles
import * as styles from './App.scss';
import cx from 'classnames';

const supportedLanguages = Object.values(language);

@asyncConnect([{ promise: () => Promise.all([]) }])
@connect(
  ({ propertyDetails, userAuthentication, messageModal, lang, routing, propertyTypes, mobilesFilters, windowDimentions: { isMobile } }) => {
    const route = routing.locationBeforeTransitions.pathname;
    const routeData = parseUrl(route);

    const locale = (!lang.locale && !routeData.locale)
      ? route.split('/').find(part => ((part.length === 2) && (supportedLanguages.indexOf(part) !== -1))) || language.default // Force parsing
      : lang.locale || routeData.locale;

    return {
      locale,
      route,
      routeData,
      propertyDetails,
      userAuthentication,
      messageModal,
      propertyTypes,
      mobilesFilters,
      isMobile
    };
  }, {
    authenticateUser,
    openAuthenticationModal,
    hideAuthenticationModal,
    verifyToken,
    sendEmail,
    logOut,
    addSavedDataToStore,
    socialNetworkAuthentication,
    switchAuthModalType,
    setWindowDimentions
  },
)

export default class App extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
    userAuthentication: PropTypes.object,
    authenticateUser: PropTypes.func,
    openAuthenticationModal: PropTypes.func,
    hideAuthenticationModal: PropTypes.func,
    verifyToken: PropTypes.func,
    updatePassword: PropTypes.func,
    changePassword: PropTypes.func,
    sendEmail: PropTypes.func,
    logOut: PropTypes.func,
    addSavedDataToStore: PropTypes.func,
    socialNetworkAuthentication: PropTypes.func,
    route: PropTypes.string.isRequired,
    routeData: PropTypes.object.isRequired,
    switchAuthModalType: PropTypes.func,
    setWindowDimentions: PropTypes.func,
    children: PropTypes.object.isRequired
  };

  componentWillMount() {
    setupStorage();
    setLocalization(this.props);
  }

  componentDidMount() {
    const savedUserData = storage.value.getItem('userData');
    if (this.props.location.query.token) {
      this.props.openAuthenticationModal({ bodyType: authenticationModalType.RESET_PASSWORD });
    }
    if (savedUserData) {
      this.props.addSavedDataToStore(JSON.parse(savedUserData));
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.route && newProps.route !== this.props.route) {
      this.routeChanged(newProps.route);
    }
  }

  routeChanged = (/* route */) => {
    // console.log('Route changed to', route);
    this.hideAllModals();
  };

  hideAllModals = () => {
    this.props.hideAuthenticationModal();
  };

  logOut = () => {
    storage.value.clear();
    this.props.logOut();
  };

  renderChildren(children, childProps) {
    return React.Children.map(children, child => React.cloneElement(child, childProps));
  }

  render() {
    const { data: userData, userIsAuthorized, isAuthenticationModalOpen, selectedTab } = this.props.userAuthentication;
    const location = (this.props.routeData) ? this.props.routeData.location : null;

    const { isMobile, locale, route, routeData } = this.props;
    const isFooterShown = (location !== 'homes');

    const mobileHeader = (isMobile && isMobile !== null) ? (<GenericContainer>
      <HeaderMobile
        locale={locale}
        location={location}
        route={route}
        userIsAuthorized={userIsAuthorized}
        openAuthenticationModal={this.props.openAuthenticationModal}
        logOut={this.logOut}
      />
    </GenericContainer>) : null;

    const desktopHeader = (!isMobile && isMobile !== null) ? (<GenericContainer>
      <Header
        locale={locale}
        location={location}
        route={route}
        userIsAuthorized={userIsAuthorized}
        profileImage={userData ? userData.profile_img : null}
        openAuthenticationModal={this.props.openAuthenticationModal}
        logOut={this.logOut}
      />
    </GenericContainer>) : null;

    // Get's passed to all children
    const propsForChildren = { isMobile, locale, route, routeData };

    return (
      <div className={styles.app}>
        <WindowDimentionManager onDimentionsChange={params => this.props.setWindowDimentions(params)} />
        <div className={ (isFooterShown) ? `${styles.pageWrapper}` : `${styles.pageWithoutFooter}` }>
          <Helmet {...config.app.head} />
          <GenericContainer>
            <AppHelmet {...propsForChildren} />
          </GenericContainer>
          { (isMobile) ? mobileHeader : desktopHeader }
          <div className={styles.appContent}>
            { this.renderChildren(this.props.children, propsForChildren) }
          </div>
        </div>
        {
          (isFooterShown)
          ? (<GenericContainer>
              <Footer displaySocial locale={this.props.locale}/>
            </GenericContainer>)
          : null
        }
        <GenericContainer>
          <UserAuthentication
            userAuthentication={this.props.userAuthentication}
            isOpen={isAuthenticationModalOpen}
            selectedTab={selectedTab}
            token={this.props.location.query.token}
            verifyToken={this.props.verifyToken}
            onRequestClose={this.props.hideAuthenticationModal}
            authenticateUser={this.props.authenticateUser}
            socialNetworkAuthentication={this.props.socialNetworkAuthentication}
            sendEmail={this.props.sendEmail}
            changeTab={this.props.openAuthenticationModal}
            switchAuthModalType={this.props.switchAuthModalType}
            isMobile={isMobile}
            locale={this.props.locale}
          />
        </GenericContainer>
      </div>
    );
  }
}
