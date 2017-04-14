// Modules
import { combineReducers } from 'redux-loop';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { i18n as lang } from 'redux-pagan';
// Import redux reducers
import userAuthentication from './userAuthentication';
import windowDimentions from './windowDimentions';
import mobileHeader from './mobileHeader';
// Config axios
import axiosDefaults from 'axios/lib/defaults';
import { apiURL } from '../../constants';
axiosDefaults.baseURL = apiURL;

export default combineReducers({
  lang,
  routing,
  mobileHeader,
  reduxAsyncConnect,
  userAuthentication,
  windowDimentions
});
