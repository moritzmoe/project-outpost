/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';


import {
  Container, Typography, Fab, Grid, TextField
} from '@material-ui/core';

const convertCo2ToScore = 67;

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
}));


export default function Settings() {
  const classes = useStyles();
  const setPageName = useSetStoreValue('pageName');
  const [firstNameInput, setFirstnameInput] = useState('');
  const [lastnameInput, setLastnameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const userId = useStoreValue('userId');
  const userFirstname = useStoreValue('userFirstname');
  const userLastname = useStoreValue('userLastname');
  const userEmail = useStoreValue('userEmail');

  useEffect(() => {
    setPageName('Settings');
  }, []);

  const handleFirstnameInput = (input) => {
    setFirstnameInput(input.target.value);
    console.log(firstNameInput);
  };

  const handleLastnameInput = (input) => {
    setLastnameInput(input.target.value);
  };

  const handleEmailInput = (input) => {
    setEmailInput(input.target.value);
  };

  const handleFirstnameSave = () => {
    axios.post(`/api/users/changeFirstname?id=${userId}&content=${firstNameInput}`).then((res) => {
      if (res.status === 200) {
        window.alert('Vorname erfolgreich geändert');
      }
    }).catch((err) => {
      console.log(err);
      window.alert('Etwas ist schiefgelaufen');
    });
  };

  const handleLastnameSave = () => {
    axios.post(`/api/users/changeLastname?id=${userId}&content=${lastnameInput}`).then((res) => {
      if (res.status === 200) {
        window.alert('Nachname erfolgreich geändert');
      }
    }).catch((err) => {
      console.log(err);
      window.alert('Etwas ist schiefgelaufen');
    });
  };

  const handleEmailSave = () => {
    axios.post(`/api/users/changeEmail?id=${userId}&content=${emailInput}`).then((res) => {
      if (res.status === 200) {
        window.alert('E-mail Adresse erfolgreich geändert');
      }
    }).catch((err) => {
      console.log(err);
      window.alert('Etwas ist schiefgelaufen');
    });
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
    </div>
  );
}
