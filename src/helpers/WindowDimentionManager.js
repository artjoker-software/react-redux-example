import { Component, PropTypes } from 'react';

export default class WindowDimentionManager extends Component {
  static propTypes = {
    onDimentionsChange: PropTypes.func.isRequired
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler = () => {
    const width = global.document.body.clientWidth;
    const height = global.document.body.clientHeight;
    this.props.onDimentionsChange({ width, height });
  };

  render() {
    return null;
  }
}
