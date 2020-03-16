import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

import Navigation from './components/layout/Navigation';
import Login from './pages/Login';
import withAuth from './components/withAuth';

import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Shopping from './pages/Shopping';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#80cbc4',
      main: '#009688',
    },
    secondary: amber,
  },
  status: {
    danger: 'orange',
  },
});

export default class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Navigation />
          <div>
            <Switch>
              <Route path="/" exact component={withAuth(Home)} />
              <Route path="/login" component={Login} />
              <Route path="/timeline" component={withAuth(Timeline)} />
              <Route path="/shopping" component={withAuth(Shopping)} />

            </Switch>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}
