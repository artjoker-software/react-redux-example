import { createAction, createReducer } from 'redux-act';

export const openMobileHeader = createAction('/OPEN_MOBILE_HEADER');
export const hideMobileHeader = createAction('/HIDE_MOBILE_HEADER');

const initialState = {
  isMobileHeaderOpen: false
};

const handleOpen = state => ({
  ...state,
  isMobileHeaderOpen: true
});

const handleHide = state => ({
  ...state,
  isMobileHeaderOpen: false
});

const mobileHeader = createReducer((on) => {
  on(openMobileHeader, handleOpen);
  on(hideMobileHeader, handleHide);
}, initialState);

export default mobileHeader;
