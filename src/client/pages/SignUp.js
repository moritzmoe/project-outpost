/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  registrationAlert: {
    marginTop: theme.spacing(7),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [failed, setFailed] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const setPageName = useSetStoreValue('pageName');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post('/api/auth/register', {
      email, firstname, lastname, password
    }).then((res) => {
      if (res.status === 200) {
        RouterHistory.push('/login');
      }
    }).catch((res) => {
      setErrMsg(res.response.data.error);
      setFailed(true);
    });
  };

  useEffect(() => {
    setPageName('Sign Up');
    fetch('/api/auth/checkToken')
      .then((res) => {
        if (res.status === 200) {
          axios.get('/api/logout');
        }
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailed(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={LogoText} alt="Logo" width="300em" height="150em" />
        {/* <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography variant="body1">
          Project Outpost
        </Typography>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Vorname"
                autoFocus
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nachname"
                name="lastName"
                autoComplete="lname"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="E-Mail"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Passwort"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrieren
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" onClick={(evt) => { evt.preventDefault(); RouterHistory.push('/login'); }} variant="body2">
                Schon einen Account? Jetzt anmelden!
              </Link>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={failed}
          autoHideDuration={6000}
          onClose={handleClose}
          className={classes.passwordAlert}
        >
          <Alert onClose={handleClose} severity="error">
            {errMsg}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}
