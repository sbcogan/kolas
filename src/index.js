// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';
import StoreProvider, { user } from 'stores';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import styled from 'styled-components';
import PrivateRoute from 'components/PrivateRoute';

// routes
import Kolas from 'scenes/Kolas';
import Login from 'scenes/Login';
import SignUp from 'scenes/SignUp';
import Meets from 'scenes/Meets';
import Teams from 'scenes/Teams';
import Regions from 'scenes/Regions';

const SiteWrapper = styled.div`min-height: 100vh;`;

const App = inject('user')(
  observer(() =>
    <Router>
      <SiteWrapper>
        <Route exact path="/" component={() => <Redirect to="/kolas" />} />
        <PrivateRoute path="/kolas" component={Kolas} authed={user.loggedIn} />
        <PrivateRoute
          path="/regions"
          component={Regions}
          authed={user.loggedIn}
        />
        <PrivateRoute path="/teams" component={Teams} authed={user.loggedIn} />
        <PrivateRoute path="/meets" component={Meets} authed={user.loggedIn} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </SiteWrapper>
    </Router>
  )
);

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </LocaleProvider>,
  document.getElementById('root')
);
registerServiceWorker();
