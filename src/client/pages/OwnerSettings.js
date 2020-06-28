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

  useEffect(() => {
    setPageName('Owner Settings');
  }, []);

  const handleCo2ConvertInput = (input) => {
    setCo2ConvertInput(input.target.value);
    console.log(co2ConvertInput);
  };

  const handleCo2ConvertSave = () => {
    axios.post(`/api/constants/changeCo2Convert?id=${1}&content=${co2ConvertInput}`).then((res) => {
      if (res.status === 200) {
        window.alert('Co2 Umrechnungsfaktor wurde geändert');
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
            <Typography variant="h6">Co2 Umrechnungsfaktor:</Typography>
          </Grid>
          <Grid item>
            <form className={classes.root} noValidate autoComplete="off" onChange={handleCo2ConvertInput}>
              <TextField type="number" id="itemSearchField" className={classes.bottomSpacing} label="Vorname" variant="outlined" defaultValue={co2Convert} />
            </form>
          </Grid>
          <Fab color="primary" aria-label="info" className={classes.fabInfo} variant="extended" onClick={handleCo2ConvertSave}>
            <SaveIcon />
          </Fab>
        </Grid>
        {' '}
      </Container>
    </div>
  );
}
