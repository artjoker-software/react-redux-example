import axios from 'axios';
import sha256 from 'sha256';
import { createAction, createReducer } from 'redux-act';
import { loop, Effects } from 'redux-loop';
import {
  userAuthenticationTabs,
  authenticationModalType
} from '../../constants';

const { promise } = Effects;

const addSavedDataToStore = createAction('/ADD_SAVED_DATA_TO_STORE');
const openAuthenticationModal = createAction('/OPEN_AUTHENTICATE_MODAL');
const hideAuthenticationModal = createAction('/HIDE_AUTHENTICATE_MODAL');
const logOut = createAction('/LOG_OUT');
const authenticateUser = createAction('/AUTHENTICATE_USER');
const authenticateUserSuccess = createAction('/AUTHENTICATE_USER_SUCCESS');
const authenticateUserFail = createAction('/AUTHENTICATE_USER_FAIL');
const editUserProfile = createAction('/EDIT_USER_PROFILE');
const editUserProfileSuccess = createAction('/EDIT_USER_PROFILE_SUCCESS');
const editUserProfileFail = createAction('/EDIT_USER_PROFILE_FAIL');
const verifyToken = createAction('/VERIFY_TOKEN');
const verifyTokenSuccess = createAction('/VERIFY_TOKEN_SUCCESS');
const verifyTokenFail = createAction('/VERIFY_TOKEN_FAIL');
const socialNetworkAuthentication = createAction('/SOCIAL_NETWORK_AUTHENTICATION');
const socialNetworkAuthenticationSuccess = createAction('/SOCIAL_NETWORK_AUTHENTICATION_SUCCESS');
const socialNetworkAuthenticationFail = createAction('/SOCIAL_NETWORK_AUTHENTICATION_FAIL');
const switchAuthModalType = createAction('/SWITCH_AUTHENTICATION_MODAL_TYPE');

const initialState = {
  isAuthenticationModalOpen: false,
  authenticationModalType: authenticationModalType.DEFAULT,
  userIsAuthorized: false,
  selectedTab: userAuthenticationTabs.SIGN_IN,
  emailSent: false,
  loading: false,
  loaded: false,
  edited: null
};

const fetchAuthentication = ({ email, password, is_agent, requestType }) =>
  axios.post(`${requestType === userAuthenticationTabs.SIGN_IN ? '/login' : '/users'}`, {
    email,
    is_agent,
    password: sha256(password)
  })
    .then(authenticateUserSuccess, authenticateUserFail);

const fetchEditProfileRequest = ({ userData, userToken }) =>
  axios.put('/users/me', userData, { headers: { access_token: userToken } })
    .then(editUserProfileSuccess, editUserProfileFail);

const fetchVerifyToken = token =>
  axios.post('/users/password/verify_token', { token })
    .then(verifyTokenSuccess, verifyTokenFail);

/* eslint-disable no-multi-spaces */
const editProfileHandler                 = (state, userData)        => loop({ ...state, loading: true, error: null, edited: false }, promise(fetchEditProfileRequest,          userData));
const authenticationHandler              = (state, userData)        => loop({ ...state, loading: true, error: null },                promise(fetchAuthentication,              userData));
const verifyTokenHandler                 = (state, token)           => loop({ ...state, loading: true, error: null },                promise(fetchVerifyToken,                 token));
/* eslint-enable no-multi-spaces */

const addSavedDataToStoreHandler = (state, action) => ({
  ...state,
  data: action,
  userIsAuthorized: true
});

const verifyTokenHandlerSuccess = state => ({
  ...state,
  loading: false,
  loaded: true,
  tokenIsValid: true
});

const verifyTokenHandlerFail = (state, action) => {
  console.error(action);

  return {
    ...state,
    loading: false,
    loaded: false,
    tokenIsValid: false,
    authenticationModalType: authenticationModalType.TOKEN_INVALID,
    error: action
  };
};

const logOutHandler = state => ({
  ...state,
  userIsAuthorized: false,
  data: null
});

const authenticationHandlerSuccess = (state, action) => ({
  ...state,
  loading: false,
  loaded: true,
  userIsAuthorized: true,
  data: action.data.access_token ? action.data : { ...action.data, access_token: state.data.access_token },
  error: null
});

const authenticationHandlerFail = (state, action) => {
  console.error(action);

  return {
    ...state,
    loading: false,
    loaded: false,
    data: null,
    error: action.response.data
  };
};

const editProfileHandlerSuccess = (state, action) => ({
  ...state,
  loading: false,
  loaded: true,
  edited: true,
  data: action.data.access_token ? action.data : { ...action.data, access_token: state.data.access_token },
  error: null
});

const editProfileHandlerFail = (state, action) => {
  console.error(action);

  return {
    ...state,
    loading: false,
    loaded: false,
    edited: false,
    data: state.data,
    error: action.response.data
  };
};

const handleOpen = (state, action) => ({
  ...state,
  isAuthenticationModalOpen: true,
  error: null,
  authenticationModalType: action.bodyType || authenticationModalType.DEFAULT,
  selectedTab: action.selectedTab || userAuthenticationTabs.SIGN_IN
});

const handleHide = state => ({
  ...state,
  isAuthenticationModalOpen: false,
  error: null,
  emailSent: false
});


const switchAuthModalTypeHandler = (state, action) => ({
  ...state,
  authenticationModalType: action.bodyType,
  selectedTab: action.selectedTab || state.selectedTab
});

const userAuthentication = createReducer((on) => {
  on(addSavedDataToStore, addSavedDataToStoreHandler);
  on(openAuthenticationModal, handleOpen);
  on(hideAuthenticationModal, handleHide);
  on(logOut, logOutHandler);
  on(authenticateUser, authenticationHandler);
  on(authenticateUserSuccess, authenticationHandlerSuccess);
  on(authenticateUserFail, authenticationHandlerFail);
  on(editUserProfile, editProfileHandler);
  on(editUserProfileSuccess, editProfileHandlerSuccess);
  on(editUserProfileFail, editProfileHandlerFail);
  on(verifyToken, verifyTokenHandler);
  on(verifyTokenSuccess, verifyTokenHandlerSuccess);
  on(verifyTokenFail, verifyTokenHandlerFail);
  on(socialNetworkAuthenticationSuccess, authenticationHandlerSuccess);
  on(socialNetworkAuthenticationFail, authenticationHandlerFail);
  on(switchAuthModalType, switchAuthModalTypeHandler);
}, initialState);

export {
  addSavedDataToStore,
  logOut,
  authenticateUser,
  openAuthenticationModal,
  hideAuthenticationModal,
  editUserProfile,
  verifyToken,
  socialNetworkAuthentication,
  switchAuthModalType
};

export default userAuthentication;
