import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, Typography, IconButton, DialogContent, TextField, DialogActions,
  Button, Grid, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ItemCard from './ItemCard';
import ItemUpdateDialog from './ItemUpdateDialog';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
}));

const convertCo2ToScore = 67;

export default function InformationDialog(props) {
  const classes = useStyles();
  const {
    isOpen, handleClose
  } = props;

  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

  const handleInfoClose = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpen}
        onClose={handleInfoClose}
      >
        <DialogTitle id="form-dialog-title" />
        <Grid container>
          <Grid item xs={12} align="right">
            <IconButton className={classes.closeButton} onClick={handleInfoClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid container justify="center" spacing={3} />
        </Grid>
        <Grid item xs={10} align="center">
          <Typography align="center" color="primary" container>
            Hallo liebe Umweltschützer! Vielen Dank das du unsere App nutzt.
            Wir vom Project-Oupost Team, haben es uns zur Aufgabe macht die Welt zu retten und du kannst uns dabei helfen!
            Unsere Mission ist es den Klimawandel zu verhindern und die durchschnittliche Erderwärmung bis 2050 auf 1.5°C zu halten.
          </Typography>
          <Typography align="center" color="primary" container>
            Jedes Jahr verbraucht eine Person in Deutschland im Durchschnitt 1.75 Tonnen Co2 für Nahrungsmittel.
            Wir möchten diesen Wert mithilfe unserer WebApp senken und dafür brauchen wir deine Hilfe!
            Dafür hat unser Team hat ein Punktesysteme ausgearbeitet. Jedem Nutzer stehen 100 Punkte pro Tag zur Verfügung.
            Ein Punkt spiegelt 0.067 Kg Co2 wieder. Wenn jeder Mensch nur 100 Punkte pro Tag verbrauchen würde, könnten wir den Klimawandel
            verhindern und die Welt retten.
          </Typography>
          <Typography align="center" color="primary" container>
            Mithilfe dieser App kannst du Einkäufe anlegen und Barcodes einscannen. Für jeden Einkauf werden deine verbrauchten Punkte
            gespeichert. Du kannst dir außerdem anschauen wie viele Punkte du die letzten 7 Tage insgesamt verbraucht hast und wie viel dein
            Konsum von einer Nachhaltigen Lebensweise entfernt ist.
          </Typography>
        </Grid>
      </Dialog>
    </div>
  );
}

InformationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
