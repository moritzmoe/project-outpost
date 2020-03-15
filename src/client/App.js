import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

import Navigation from './components/layout/Navigation';
import Login from './pages/Login/Login';
import withAuth from './components/withAuth';

import Home from './pages/Home/Home';
import Timeline from './pages/Timeline/Timeline';
import Shopping from './pages/Shopping/Shopping';

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
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" exact component={withAuth(Home)} />
            <Route path="/timeline" component={withAuth(Timeline)} />
            <Route path="/shopping" component={withAuth(Shopping)} />

          </Switch>
        </ThemeProvider>
      </div>
    );
  }
}
