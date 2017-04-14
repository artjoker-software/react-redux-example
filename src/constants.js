export const language = {
  default: 'en',
  optionalLanguage: 'ru'
};

export const analytics = {
  analyticsProvider: 'google',
  google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
};

export const userAuthenticationTabs = {
  SIGN_IN: 1,
  NEW_ACCOUNT: 2
};

const hosts = {
  local: 'http://localhost:3000',
  development: '', // Add hosts here
  staging: '',
  production: ''
};

const apiVersion = 'v1';
export const hostName = hosts[process.env.NODE_ENV || 'local'];
export const apiURL = `${hostName}/api/${apiVersion}`;

export const storage = {
  value: global.localStorage
};

// TODO: Replace usages
export const shareUrl = hostName;

export const authenticationModalType = {
  TOKEN_INVALID: 'tokenInvalid',
  DEFAULT: 'authentication'
};

export const headerVideo = {
  mp4: '/home_video_mp4.mp4',
  ogv: '/home_video_ogv.ogv',
  webm: '/home_video_webm.webm',
  preloaderJpg: 'video_preload.jpg'
};

export const enterKey = 13;

export const phoneNumberRegex = /^[+|\d]((\d+)?[\- ]?)?([\d\- ]+)?$/;
