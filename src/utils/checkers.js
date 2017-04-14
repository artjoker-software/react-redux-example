import { storage } from '../constants';

export const isMobileDisplaySize = displayWidth => (displayWidth < 768);

export const isUserAuthorized = (nextState, replace) => {
  if (global && storage.value) {
    const userData = storage.value.getItem('userData');
    if (!userData || !JSON.parse(userData).access_token) {
      replace('/');
    }
  }
};

export const isLocalStorageAvailable = () => {
  try {
    global.localStorage.setItem('test', 'test');
    global.localStorage.removeItem('test');
    return true;
  } catch (exception) {
    return false;
  }
};
