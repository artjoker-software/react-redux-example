import { isMobileDisplaySize } from '../../utils/checkers';
import { createAction, createReducer } from 'redux-act';

export const setWindowDimentions = createAction('/SET_WINDOW_DIMENSION');

const initialState = {
  width: 0,
  height: 0,
  isMobile: null
};

const handleResize = (state, params) => ({
  ...state,
  ...params,
  isMobile: isMobileDisplaySize(params.width)
});

const windowDimentions = createReducer((on) => {
  on(setWindowDimentions, handleResize);
}, initialState);

export default windowDimentions;
