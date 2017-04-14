// Modules
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getLang } from 'redux-pagan';
// Styles
import * as styles from '../PrivacyPolicyPage/PrivacyPolicyPage.scss';
// Helpers
import { shareUrl } from '../../constants';

@connect(({ lang }) => ({
  title: getLang(lang, 'static', 'header', 'dropDownMenu', 'aboutUs'),
  staticTranslate: getLang(lang, 'static'),
  translate: getLang(lang, 'about')
}))

export default class AboutUsPage extends Component {
  static propTypes = {
    translate: PropTypes.func,
    staticTranslate: PropTypes.func,
    siteTitle: PropTypes.func,
    title: PropTypes.func,
    route: PropTypes.string.isRequired
  };

  componentDidMount = () => {
    this.refs.parenthesis.innerHTML = this.props.translate('parenthesis');
    this.refs.subtitle.innerHTML = this.props.translate('subtitle');
  };

  render() {
    const { route } = this.props;
    return (
      <div className={styles.main_block}>
        <div className={styles.content}>
          <Helmet
            titleTemplate={this.props.staticTranslate('title', 'titleTemplate')()}
            title={this.props.staticTranslate('title', 'about')()}
            meta={[
              {property: 'og:title', content: `Artjoker | ${this.props.title}`}
            ]}
            link={[
              {rel: 'canonical', href: `${shareUrl}${route}`}
            ]}
          />
          <div className={styles.aboutWrap}>
            <div style={{marginTop: '50px', marginBottom: '50px'}}>
              <strong className="pageTitle">{this.props.title}</strong>
              <h3 ref="subtitle"></h3>
              <div>{this.props.translate('1.1')}</div>
              <div>{this.props.translate('1.2')}</div>
              <div>{this.props.translate('1.3')}</div>
              <div ref="parenthesis"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
