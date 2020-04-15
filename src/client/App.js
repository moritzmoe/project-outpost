/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navigation from './components/Navigation';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import withAuth from './components/withAuth';

import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Shopping from './pages/Shopping';
import Items from './pages/Items';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#80cbc4',
      main: '#009688',
    },
    secondary: amber,
  },
  status: {
    danger: 'orange'
  },
});

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(10)
  }
}));


export default function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const [pageName, setPageName] = useState('Project Outpost');
  const classes = useStyles();

  useEffect(() => {
    fetch('/api/auth/checkToken')
      .then((res) => {
        if (res.status === 200) {
          setloggedIn(true);
        }
      });
  }, []);

  const isLoggedIn = (logIn) => {
    setloggedIn(logIn);
  };

  const reportPageName = (name) => {
    setPageName(name);
  };

  return (
    <div>
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation loggedIn={loggedIn} pageName={pageName} isLoggedIn={isLoggedIn} />
          <div className={classes.content}>
            <Switch>
              {/* no authentication needed */}
              <Route path="/login" component={() => <Login isLoggedIn={isLoggedIn} reportPageName={reportPageName} />} />
              <Route path="/signup" component={() => <SignUp reportPageName={reportPageName} />} />
              {/* authentication needed */}
              <Route path="/" exact component={withAuth(() => <Home reportPageName={reportPageName} />)} />
              <Route path="/timeline" component={withAuth(() => <Timeline reportPageName={reportPageName} />)} />
              <Route path="/items" component={withAuth(() => <Items reportPageName={reportPageName} />)} />
              <Route path="/shopping" component={withAuth(() => <Shopping reportPageName={reportPageName} />)} />
            </Switch>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
