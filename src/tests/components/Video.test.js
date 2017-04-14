import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { Video } from '../../components';

const setUserAgent = (window, userAgent) => {
  if (window.navigator.userAgent !== userAgent) {
    const userAgentProp = { get: () => userAgent };
    try {
      Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
    } catch (error) {
      window.navigator = Object.create(navigator, {
        userAgent: userAgentProp
      });
    }
  }
};

let video = [];

describe('Video', () => {
  beforeEach(() => {
    video = mount(<Video />);
  });

  it('video component should be rendered correctly', () => {
    expect(video).to.have.length(1);
  });

  it('context menu should not showing up', () => {
    const mockEvent = {
      defaultPrevented: false,
      preventDefault: () => {
        mockEvent.defaultPrevented = true;
      }
    };

    video.find('video').simulate('contextmenu', mockEvent);
    expect(mockEvent.defaultPrevented).to.be.equal(true);
  });

  it('video should be rendered on desktop devices', () => {
    expect(video.find('video').length).to.be.equal(1);
    expect(video.find('img').length).to.be.equal(0);
  });

  it('video should not be rendered on mobile devices', () => {
    setUserAgent(window, 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4');
    video.mount();
    expect(video.find('video').length).to.be.equal(0);
    expect(video.find('img').length).to.be.equal(1);
  });
});
