import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
// import favicon from 'serve-favicon';
import compression from 'compression';
import request from 'request';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { Provider } from 'react-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import getRoutes from './routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

const proxy = (link, req, res) => req.pipe(request(`${config.targetApi}${link}`, (error) => {
  if (error && error.code === 'ECONNREFUSED') {
    console.error('Proxy error', error);
  }

  res.status(500).send(error);
})).pipe(res);

// Log GET requests on local
if (process.env.NODE_ENV === 'local') {
  app.use((req, res, next) => { console.log(req.method, req.url); next(); });
}
app.get('/sitemap.xml', (req, res) => proxy('/v1/seo/sitemap', req, res));
app.use('/api', (req, res) => proxy(req.url, req, res));

// SSR
app.use((req, res) => {
  const localhost = (req.headers.host.indexOf('localhost') === 0);
  const isHttp = (req.headers['x-forwarded-proto'] === 'http');

  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  } else if (isHttp && !localhost) {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
    return;
  } else if (__PRODUCTION__ && !req.headers.host.match(/^www\..*/i) && !localhost) {
    // Allow localhost for testing
    res.redirect(301, `https://www.${req.headers.host}${req.url}`);
    return;
  }

  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send(`<!doctype html>\n${
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />)}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const notFoundRoutes = renderProps.routes.filter(route => route.status === 404);
      const isNotFound = notFoundRoutes.length > 0;
      loadOnServer({ ...renderProps, store, helpers: { client } })
        .then(() => {
          const component = (
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );

          res.status(isNotFound ? 404 : 200);

          global.navigator = { userAgent: req.headers['user-agent'] };

          const reactComponents = <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />;
          const html = ReactDOM.renderToString(reactComponents);

          res.send(`<!doctype html>\n${html}`);
        })
        .catch((err) => {
          console.error('Error in server rendering: ', err);
          res.status(500);
        });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error('Port error', err);
    } else {
      console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.targetApi);
      console.info('==>    Open http://%s:%s in a browser to view the app.', config.host, config.port);
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
