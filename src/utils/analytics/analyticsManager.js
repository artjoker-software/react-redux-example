import { initGA, gaTrackPage, gaTrackModalOpen, gaSetData, gaTrackEvent } from './google';
import { analytics } from '../../constants';

export const initAnalytics = () => {
  switch (analytics.analyticsProvider) {
    case 'google':
      initGA();
      break;
    default:
      console.warn('Not valid analytics provider');
      break;
  }
};

export const trackPage = () => {
  switch (analytics.analyticsProvider) {
    case 'google':
      gaTrackPage();
      break;
    default:
      console.warn('Not valid analytics provider');
      break;
  }
};

/**
 * @param {object} modalType
 */
export const trackModalOpen = (modalType) => {
  switch (analytics.analyticsProvider) {
    case 'google':
      gaTrackModalOpen(modalType);
      break;
    default:
      console.warn('Not valid analytics provider');
      break;
  }
};

/**
 * @param {object} data
 */
export const setData = (data) => {
  switch (analytics.analyticsProvider) {
    case 'google':
      gaSetData(data);
      break;
    default:
      console.warn('Not valid analytics provider');
      break;
  }
};

/**
 * @param {object} data
 */
export const trackEvent = (data) => {
  switch (analytics.analyticsProvider) {
    case 'google':
      gaTrackEvent(data);
      break;
    default:
      console.warn('Not valid analytics provider');
      break;
  }
};
