import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { withStore, useSetStoreValue, useStoreValue } from 'react-context-hook';
import axios from 'axios';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import withAuth from './components/withAuth';

import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Shopping from './pages/Shopping';
import Items from './pages/Items';
import Users from './pages/Users';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import OwnerSettings from './pages/OwnerSettings';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#c1e5e2', // #80cbc4
      main: '#009688', // #009688
    },
    secondary: {
      main: '#ff9800',
      dark: '#ef6c00',
    }, // amber
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

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const classes = useStyles();
  const setUserFirstname = useSetStoreValue('userFirstname', 'Not logged in');
  const setIsAdmin = useSetStoreValue('isAdmin', false);
  const setIsOwner = useSetStoreValue('isOwner', false);
  const setCo2Convert = useSetStoreValue('co2Convert');
  const setUserLastname = useSetStoreValue('userLastname', 'Not logged in');
  const setUserEmail = useSetStoreValue('userEmail', 'Not logged in');
  const setUserId = useSetStoreValue('userId', 'Not logged in');

  useEffect(() => {
    axios.get('/api/constants?id=1').then((response) => {
      setCo2Convert(response.data.value);
    });
    axios.get('/api/auth/checkToken').then((res) => {
      if (res.status === 200) {
        setloggedIn(true);
        axios.get('/api/auth/user').then((response) => {
          if (response.data.Role.name === 'Admin') setIsAdmin(true);
          if (response.data.Role.name === 'Owner') { setIsOwner(true); setIsAdmin(true); }

          setUserFirstname(response.data.firstname);
          setUserId(response.data.id);
          setUserLastname(response.data.lastname);
          setUserEmail(response.data.email);
        });
      }
    });
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

  return (
    <div>
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loggedIn ? (
            <Navigation loggedIn={loggedIn} isLoggedIn={isLoggedIn} />
          ) : ''}
          <div className={classes.content}>
            <Switch>
              {/* no authentication needed */}
              <Route path="/login" component={() => <Login isLoggedIn={isLoggedIn} />} />
              <Route path="/signup" component={() => <SignUp />} />
              {/* authentication needed */}
              <Route path="/" exact component={withAuth(() => <Home />)} />
              <Route path="/timeline" component={withAuth(() => <Timeline />)} />
              <Route path="/items" component={withAuth(() => <Items />)} />
              <Route path="/shopping" component={withAuth(() => <Shopping />)} />
              <Route path="/users" component={withAuth(() => <Users />)} />
              <Route path="/categories" component={withAuth(() => <Categories />)} />
              <Route path="/settings" component={withAuth(() => <Settings />)} />
              <Route path="/ownersettings" component={withAuth(() => <OwnerSettings />)} />
            </Switch>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default withStore(App);
