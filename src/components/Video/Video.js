// Modules
import React, { Component } from 'react';
// Helpers
import { headerVideo } from '../../constants';
import checkAgent from '../../utils/checkUserAgent';
// Styles
import * as styles from './Video.scss';

export default class Video extends Component {

  render() {
    const content = (checkAgent.isMobileOrTablet(navigator.userAgent))
      ? (<div className={styles.imgCover}>
        <img src={headerVideo.preloaderJpg} alt="Background image" />
      </div>)
      : (<video
        loop
        autoPlay
        controls={false}
        poster={headerVideo.preloaderJpg}
        onContextMenu={event => event.preventDefault()}
      >
        <source src={headerVideo.mp4} type="video/mp4" />
        <source src={headerVideo.ogv} type="video/ogv" />
        <source src={headerVideo.webm} type="video/webm" />
      </video>);

    return (
      <div className={styles.header_video_container}>{content}</div>
    );
  }
}
