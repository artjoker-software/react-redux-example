// Modules
import React, { Component, PropTypes } from 'react';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';
// Helpers
import appendLocale from '../../helpers/appendLocale';
// Styles
import * as styles from './Footer.scss';

export default class Footer extends Component {

  static propTypes = {
    locale: PropTypes.string.isRequired,
    translate: PropTypes.func,
    displaySocial: PropTypes.bool
  };

  render() {
    const Social = (this.props.displaySocial) ?
      (<div className={ styles.social } id="SocialBlock">
        <span className={styles.label}>{this.props.translate('footer', 'follow')}</span>
        <a href="https://twitter.com/artjoker" target="_blank" id="Twitter" className={ styles.twitter }><span className="fa fa-twitter"> </span></a>
        <a href="https://www.facebook.com/artjoker.ua" target="_blank" id="Facebook" className={ styles.facebook }><span className="fa fa-facebook"> </span></a>
      </div>) : null;

    // TODO: Legal research on the copyright law and dynamic updates
    const year = new Date().getFullYear();
    const copyright = `Artjoker ${year}`;

    return (
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.top}>
            <ul className={styles.nav}>
              <LinkContainer to={appendLocale(this.props.locale, '/about')}>
                <NavItem>{this.props.translate('footer', 'about')}</NavItem>
              </LinkContainer>
              <LinkContainer to={appendLocale(this.props.locale, '/terms')}>
                <NavItem>{this.props.translate('footer', 'terms')}</NavItem>
              </LinkContainer>
              <LinkContainer to={appendLocale(this.props.locale, '/privacy')}>
                <NavItem>{this.props.translate('footer', 'privacy')}</NavItem>
              </LinkContainer>
            </ul>
          </div>
          {Social}
          <div className={styles.copyright}>
            <p>
              <span className={styles.copy}>&copy;&nbsp;</span>
              {copyright}
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
