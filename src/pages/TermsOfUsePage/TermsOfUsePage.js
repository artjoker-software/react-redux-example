// Modules
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Tabs, Tab } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getLang } from 'redux-pagan';
import { connect } from 'react-redux';
// Helpers
import appendLocale from '../../helpers/appendLocale';
import { shareUrl } from '../../constants';
// Styles
import './TermsOfUsePage.scss';
import * as styles from '../PrivacyPolicyPage/PrivacyPolicyPage.scss';

@connect(state => ({
  translate: getLang(state.lang, 'terms'),
  staticTranslates: getLang(state.lang, 'static')
}))
export default class TermsOfUsePage extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    staticTranslates: PropTypes.func.isRequired,
    route: PropTypes.string.isRequired
  };

  componentDidMount = () => {
    this.refs.parenthesis.innerHTML = this.props.translate('parenthesis');
  };

  handleSelect(key) {
    if (key === 2) {
      // TODO: Fix bug with not persisting locale on this (props.locale is undefined)
      browserHistory.push(appendLocale(this.props.locale, '/privacy'));
    }
  }

  render() {
    const { route } = this.props;
    return (
      <div className={styles.main_block}>
        <div className={styles.content}>
          <Helmet
            titleTemplate={this.props.staticTranslates('title', 'titleTemplate')()}
            title={this.props.staticTranslates('title', 'terms')()}
            meta={[{
              property: 'og:title',
              content: `Artjoker | ${this.props.staticTranslates('footer', 'terms')}`
            }]}
            link={[
              {rel: 'canonical', href: `${shareUrl}${route}`}
            ]}
          />
          <Tabs activeKey={1} onSelect={this.handleSelect} id="controlled-tab-example">
            <Tab eventKey={1} title={`${this.props.staticTranslates('footer', 'terms')}`}>
              <strong className="pageTitle">{this.props.staticTranslates('footer', 'terms')}</strong>
              <p style={{ textAlign: 'justify' }} ref="parenthesis"> </p>
              <ol>
                <li><strong>{this.props.translate('1')}</strong>
                  <ol>
                    <li>{this.props.translate('1.1')}</li>
                  </ol>
                </li>
              </ol>
            </Tab>
            <Tab eventKey={2} title={`${this.props.staticTranslates('footer', 'privacy')}`} />
          </Tabs>
        </div>
      </div>
    );
  }
}
