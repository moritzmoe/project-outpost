/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import {
  Container, Fab, Grid, Snackbar, TextField, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';


const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  bottomSpacing: {
    bottom: theme.spacing(2)
  },
  message: {
    marginBottom: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Settings() {
  const classes = useStyles();
  const setPageName = useSetStoreValue('pageName');
  const [firstNameInput, setFirstnameInput] = useState('');
  const [lastnameInput, setLastnameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const userFirstname = useStoreValue('userFirstname');
  const userLastname = useStoreValue('userLastname');
  const userEmail = useStoreValue('userEmail');
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    setPageName('Settings');
  }, []);

  const handleFirstnameInput = (input) => {
    setFirstnameInput(input.target.value);
  };

  const handleLastnameInput = (input) => {
    setLastnameInput(input.target.value);
  };

  const handleEmailInput = (input) => {
    setEmailInput(input.target.value);
  };

  const handleFirstnameSave = () => {
    if (!(firstNameInput === '')) {
      axios.put(`/api/users/firstname?content=${firstNameInput}`).then((res) => {
        if (res.status === 200) {
          setMessage('Vorname erfolgreich geändert');
          setOpenMessage(true);
        }
      }).catch((err) => {
        setMessage('Etwas ist schiefgelaufen');
        setOpenError(true);
      });
    } else {
      setMessage('Bitte gib einen Vornamen ein');
      setOpenError(true);
    }
  };

  const handleLastnameSave = () => {
    if (!(lastnameInput === '')) {
      axios.put(`/api/users/lastname?content=${lastnameInput}`).then((res) => {
        if (res.status === 200) {
          setMessage('Nachname erfolgreich geändert');
          setOpenMessage(true);
        }
      }).catch((err) => {
        setMessage('Etwas ist schiefgelaufen');
        setOpenError(true);
      });
    } else {
      setMessage('Bitte gib einen Nachnamen ein');
      setOpenError(true);
    }
  };

  const handleEmailSave = () => {
    if (!(emailInput === '')) {
      axios.put(`/api/users/email?content=${emailInput}`).then((res) => {
        if (res.status === 200) {
          setMessage('E-mail Adresse erfolgreich geändert');
          setOpenMessage(true);
        }
      }).catch((err) => {
        setMessage('Etwas ist schiefgelaufen');
        setOpenError(true);
      });
    } else {
      setMessage('Bitte gib eine E-Mail Adresse ein');
      setOpenError(true);
    }
  };

  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessage(false);
    setOpenError(false);
    setMessage('');
  };


  return (
    <div>
      <Container maxWidth="sm">
        <Grid container justify="space-between" spacing={3}>
          <Grid item />
        </Grid>
        <Grid container justify="space-between" spacing={3}>
          <Grid item xs={5}>
            <Typography variant="h6">Vorname ändern:</Typography>
          </Grid>
          <Grid item>
            <form className={classes.root} noValidate autoComplete="off" onChange={handleFirstnameInput}>
              <TextField id="itemSearchField" className={classes.bottomSpacing} label="Vorname" variant="outlined" defaultValue={userFirstname} />
            </form>
          </Grid>
          <Fab color="primary" aria-label="info" className={classes.fabInfo} variant="extended" onClick={handleFirstnameSave}>
            <SaveIcon />
          </Fab>
        </Grid>
        {' '}
        <Grid container justify="space-between" spacing={3}>
          <Grid item xs={5}>
            <Typography variant="h6">Nachname ändern:</Typography>
          </Grid>
          <Grid item>
            <form className={classes.root} noValidate autoComplete="off" onChange={handleLastnameInput}>
              <TextField id="itemSearchField" className={classes.bottomSpacing} label="Nachname" variant="outlined" defaultValue={userLastname} />
            </form>
          </Grid>
          <Fab color="primary" aria-label="info" className={classes.fabInfo} variant="extended" onClick={handleLastnameSave}>
            <SaveIcon />
          </Fab>
        </Grid>
        {' '}
        <Grid container justify="space-between" spacing={3}>
          <Grid item xs={5}>
            <Typography variant="h6">E-Mail Adresse ändern:</Typography>
          </Grid>
          <Grid item>
            <form className={classes.root} noValidate autoComplete="off" onChange={handleEmailInput}>
              <TextField id="itemSearchField" className={classes.bottomSpacing} label="E-Mail" variant="outlined" defaultValue={userEmail} />
            </form>
          </Grid>
          <Fab color="primary" aria-label="info" className={classes.fabInfo} variant="extended" onClick={handleEmailSave}>
            <SaveIcon />
          </Fab>
        </Grid>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openMessage}
        autoHideDuration={6000}
        className={classes.message}
        onClose={handleMessageClose}
      >
        <Alert onClose={handleMessageClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openError}
        autoHideDuration={6000}
        className={classes.message}
        onClose={handleMessageClose}
      >
        <Alert onClose={handleMessageClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
