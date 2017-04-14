import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLang } from 'redux-pagan';

@connect(({ lang }) => ({ translate: getLang(lang, 'static'), locale: lang.locale }))
export default class GenericContainer extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    translate: PropTypes.func,
    children: PropTypes.object
  };

  render() {
    return (
      React.cloneElement(this.props.children, { translate: this.props.translate, locale: this.props.locale })
    );
  }
}

