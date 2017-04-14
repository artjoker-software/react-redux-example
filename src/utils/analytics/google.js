import ReactGA from 'react-ga';
import { analytics } from '../../constants';

export const initGA = () => {
  ReactGA.initialize(analytics.google.trackingId);
};

export const gaTrackPage = () => {
  ReactGA.set({ page: window.location.pathname, title: document.title });
  ReactGA.pageview(window.location.pathname);
};

export const gaTrackModalOpen = (modalType) => {
  ReactGA.modalview(modalType);
};

export const gaSetData = (data) => {
  ReactGA.set(data);
};

export const gaTrackEvent = (data) => {
  ReactGA.event(data);
};
