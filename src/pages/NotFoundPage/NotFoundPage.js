// Modules
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLang } from 'redux-pagan';
import Helmet from 'react-helmet';
// Styles
import * as styles from './NotFoundPage.scss';

@connect(state =>({
  translate: getLang(state.lang, 'static')
}))

export default class NotFoundPage extends Component {
  static propTypes = {
    translate: PropTypes.func,
    title: PropTypes.func
  };

  state = {
    height: 0
  }

  componentDidMount() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const headerHeight = (header) ? header.offsetHeight : 0;
    let footerHeight = (footer) ? footer.offsetHeight : 0;
    footerHeight = (footerHeight < 196) ? 256 : footerHeight;
    this.state.height = document.documentElement.clientHeight - headerHeight - footerHeight;
  }

  render() {
    return (
      <div className={styles.notFoundWrapper} style={{ height: this.state.height }}>
        <Helmet
          titleTemplate={this.props.translate('title', 'titleTemplate')()}
          title={this.props.translate('title', 'notFound')()}
        />
        <div className={styles.content}>
          <img className={styles.icon} src={'/icons/icon-smile.png'} alt="not found"/>
          <h1>{this.props.translate('notFound', 'oop')}!</h1>
          <p>{this.props.translate('notFound', 'pageNotFound')}</p>
          <p>
            {this.props.translate('notFound', 'goBack')}&nbsp;
            <a href="/" className="link">{this.props.translate('notFound', 'toHomePage')}</a>
          </p>
        </div>
      </div>
    );
  }
}
