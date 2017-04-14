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
import * as styles from './PrivacyPolicyPage.scss';

@connect(state => ({
  translate: getLang(state.lang, 'privacy'),
  staticTranslates: getLang(state.lang, 'static')
}))
export default class PrivacyPolicyPage extends Component {
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
    if (key === 1) {
      browserHistory.push(appendLocale(this.props.locale, '/terms'));
    }
  }

  render() {
    const { route } = this.props;
    return (
      <div className={styles.main_block}>
        <div className={styles.content}>
          <Helmet
            titleTemplate={this.props.staticTranslates('title', 'titleTemplate')()}
            title={this.props.staticTranslates('title', 'privacy')()}
            meta={[{
              property: 'og:title',
              content: `Artjoker | ${this.props.staticTranslates('header', 'dropDownMenu', 'privacyPolicy')}`
            }]}
            link={[
              {rel: 'canonical', href: `${shareUrl}${route}`}
            ]}
          />
          <Tabs activeKey={2} onSelect={this.handleSelect} id="controlled-tab-example">
            <Tab eventKey={1} title={`${this.props.staticTranslates('footer', 'terms')}`}/>
            <Tab eventKey={2} title={`${this.props.staticTranslates('footer', 'privacy')}`}>
              <strong className="pageTitle">{this.props.staticTranslates('footer', 'privacy')}</strong>
              <p style={{ textAlign: 'justify' }} ref="parenthesis"> </p>
              <ol>
                <li><strong>{this.props.translate('1')}</strong>
                  <ol>
                    <li>{this.props.translate('1.1')}</li>
                  </ol>
                </li>
              </ol>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
