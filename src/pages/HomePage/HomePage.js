// Styles
import * as styles from './HomePage.scss';
// Modules
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getLang } from 'redux-pagan';
// Components
// import { Video } from '../../components';
// Helpers
import appendLocale from '../../helpers/appendLocale';
import { shareUrl } from '../../constants';

@connect(state => ({
  langStatic: getLang(state.lang, 'static')
}))

export default class HomePage extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
    langStatic: PropTypes.func,
    majorCitiesData: PropTypes.array,
    propertyTypes: PropTypes.array,
    mobilesFilters: PropTypes.object,
    openMobileFilters: PropTypes.func
  };

  shouldComponentUpdate({ route, locale }) {
    return (route === appendLocale(locale, '/'));
  }

  render() {
    return (
      <div className={styles.home}>
        <Helmet
          titleTemplate={this.props.langStatic('title', 'titleTemplate')()}
          title={this.props.langStatic('title', 'home')()}
          link={[
            {rel: 'canonical', href: `${shareUrl}${this.props.route}`}
          ]}
        />
        <div className={styles.wrapperTop}>
          <div className={styles.masthead}>
            {/* <Video /> */}
            <img alt="Logo" className={styles.bigImage} src="/images/brain.svg"/>
          </div>
        </div>
      </div>
    );
  }
}
