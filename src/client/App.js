import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

import Navigation from './components/layout/Navigation';
import Login from './components/Login';

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
          <Login />
        </ThemeProvider>
      </div>
    );
  }
}
