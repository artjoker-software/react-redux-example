import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import { install } from 'redux-loop';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../utils/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(createMiddleware(client)),
      install(),
      applyMiddleware(reduxRouterMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = compose(
      applyMiddleware(createMiddleware(client)),
      install(),
      applyMiddleware(reduxRouterMiddleware),
    )(_createStore);
  }

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => store.replaceReducer(require('./modules/reducer')));
  }

  return store;
}
