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


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [co2ConvertInput, setCo2ConvertInput] = useState(0);
  const co2Convert = useStoreValue('co2Convert');
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    setPageName('Owner Settings');
  }, []);

  const handleCo2ConvertInput = (input) => {
    setCo2ConvertInput(input.target.value);
  };

  const handleCo2ConvertSave = () => {
    if (!(co2ConvertInput === '')) {
      axios.put(`/api/constants/1/?content=${co2ConvertInput}`).then((res) => {
        if (res.status === 200) {
          setMessage('Co2 Umrechnungsfaktor wurde geändert');
          setOpenMessage(true);
        }
      }).catch((err) => {
        setMessage('Etwas ist schiefgelaufen');
        setOpenError(true);
      });
    } else {
      setMessage('Bitte gebe einen Dividor ein');
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
            <Typography variant="h6">Co2 / Punkte Divisor:</Typography>
          </Grid>
          <Grid item>
            <form className={classes.root} noValidate autoComplete="off" onChange={handleCo2ConvertInput}>
              <TextField type="number" id="itemSearchField" className={classes.bottomSpacing} label="Co2 Dividor" variant="outlined" defaultValue={co2Convert} />
            </form>
          </Grid>
          <Fab color="primary" aria-label="info" className={classes.fabInfo} variant="extended" onClick={handleCo2ConvertSave}>
            <SaveIcon />
          </Fab>
        </Grid>
        {' '}
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
