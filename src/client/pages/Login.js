/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import EcoIcon from '@material-ui/icons/Eco';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useSetStoreValue } from 'react-context-hook';
import RouterHistory from '../Tools/RouterHistory';
import LogoText from '../img/logoText.svg';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.dark,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrong, setWrong] = useState(false);

  const setUserFirstname = useSetStoreValue('userFirstname', 'Not logged in');
  const setIsAdmin = useSetStoreValue('isAdmin', false);
  const setIsOwner = useSetStoreValue('isOwner', false);
  const setPageName = useSetStoreValue('pageName');
  const setCo2Convert = useSetStoreValue('co2Convert');
  const setUserLastname = useSetStoreValue('userLastname', 'Not logged in');
  const setUserEmail = useSetStoreValue('userEmail', 'Not logged in');
  const setUserId = useSetStoreValue('userId', 'Not logged in');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.get('/api/constants?id=1').then((response) => {
      setCo2Convert(response.data.value);
      console.log(response.data.value);
    });
    axios.post('/api/auth', { email, password })
      .then((res) => {
        if (res.status === 200) {
          axios.get('/api/auth/user').then((response) => {
            setUserFirstname(response.data.firstname);
            setUserId(response.data.id);
            setUserLastname(response.data.lastname);
            setUserEmail(response.data.email);
            if (response.data.Role.name === 'Admin') {
              setIsAdmin(true);
            } else if (response.data.Role.name === 'Owner') {
              setIsAdmin(true);
              setIsOwner(true);
            }
          });
          RouterHistory.push('/');
          props.isLoggedIn(true);
        }
      })
      .catch(() => {
        setWrong(true);
      });
  };

  useEffect(() => {
    setPageName('Login');
    fetch('/api/auth/checkToken')
      .then((res) => {
        if (res.status === 200) {
          axios.get('/api/auth/logout');
        }
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setWrong(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={LogoText} alt="Logo" width="300em" height="150em" />
        {/* <img src="../../img/logoText.svg" alt="Logo" width="300em" height="150em" />
         <Avatar className={classes.avatar}>
          <EcoIcon />
        </Avatar>
        <Typography variant="body1">
          Project Outpost
        </Typography>
        <Typography component="h1" variant="h5">
          Login
        </Typography> */}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="E-Mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/signup" onClick={(evt) => { evt.preventDefault(); RouterHistory.push('/signup'); }} variant="body2">
              Kein Account? Sign up
            </Link>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={wrong}
          autoHideDuration={6000}
          onClose={handleClose}
          className={classes.passwordAlert}
        >
          <Alert onClose={handleClose} severity="error">
            Falsche E-Mail or Password
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}
