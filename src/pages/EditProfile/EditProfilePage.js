// Modules
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLang } from 'redux-pagan';
import Helmet from 'react-helmet';
// Styles
import * as styles from './EditProfilePage.scss';

@connect(state =>({
  translate: getLang(state.lang, 'static')
}))

export default class NotFoundPage extends Component {
  static propTypes = {
    translate: PropTypes.func,
    title: PropTypes.func
  };

  render() {
    return (
      <div>
        <Helmet
          titleTemplate={this.props.translate('title', 'titleTemplate')()}
          title={this.props.translate('title', 'editProfile')()}
        />
        <div className={styles.defaultClass}>
         Fill content here
        </div>
      </div>
    );
  }
}
