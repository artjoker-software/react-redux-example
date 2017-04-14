import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { shareUrl } from '../../constants';

export default class AppHelmet extends Component {
  static propTypes = {
    translate: PropTypes.func
  };

  render() {
    return (
      <Helmet meta={[
        {property: 'og:url', content: shareUrl},
        {property: 'og:image', content: `${shareUrl}/images/logo-blue.png`},
        {property: 'og:description', content: this.props.translate('description')}
      ]}/>
    );
  }
}
