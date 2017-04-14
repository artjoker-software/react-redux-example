import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import {
  App,
  HomePage,
  NotFoundPage,
  TermsOfUsePage,
  PrivacyPolicyPage,
  EditProfilePage,
  AboutUsPage,
  HelpPage
} from './pages';

// Please keep routes in alphabetical order
export default () => (
  <Router history={browserHistory}>
    <Route path="/(:locale/)" component={App}>
      <IndexRoute name="HomePage" component={HomePage} />
      <Route path="about" component={AboutUsPage} />
      <Route path="help" component={HelpPage} />
      <Route path="privacy" component={PrivacyPolicyPage} />
      <Route path="terms" component={TermsOfUsePage} />
      <Route path="/(:locale/)profile/edit" component={EditProfilePage} />
      <Route path="*" component={NotFoundPage} status={404} />
    </Route>
  </Router>
);
