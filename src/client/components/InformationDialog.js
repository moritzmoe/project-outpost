import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle,
  Slide
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function InformationDialog(props) {
  const classes = useStyles();
  const {
    isOpen, handleClose
  } = props;

  const handleInfoClose = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Hallo Umweltschützer!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Vielen Dank, dass du unsere App nutzt.
            <br />
            Wir vom Project-Oupost Team haben es uns zur Aufgabe gemacht die Welt zu retten und du kannst uns dabei helfen!
            Unsere Mission ist es den Klimawandel zu verhindern und die durchschnittliche Erderwärmung bis 2050 auf 1.5°C zu halten.
            <br />
            Jedes Jahr verbraucht eine Person in Deutschland im Durchschnitt 1.75 Tonnen CO2 für Nahrungsmittel.
            Wir möchten diesen Wert mithilfe unserer WebApp senken und dafür brauchen wir deine Hilfe!
            Dafür hat unser Team ein Punktesysteme ausgearbeitet. Jedem Nutzer stehen 100 Punkte pro Tag zur Verfügung.
            Ein Punkt spiegelt 0.067 Kg Co2 wieder. Wenn jeder Mensch nur 100 Punkte pro Tag verbrauchen würde, könnten wir den Klimawandel
            verhindern und die Welt retten.
            <br />
            Mithilfe dieser App kannst du Einkäufe anlegen und Barcodes einscannen. Für jeden Einkauf werden deine verbrauchten Punkte
            gespeichert. Du kannst dir außerdem anschauen, wie viele Punkte du die letzten 7 Tage insgesamt verbraucht hast und wie stark dein
            Konsum von einer nachhaltigen Lebensweise entfernt ist.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog
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
        </Grid>
          <Grid container justify="center" spacing={3} />
            <Grid item xs={12}>
              <Typography align="center" color="primary" container>
                Hallo liebe Umweltschützer!
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <Typography align="center" color="primary" container>
                Hallo liebe Umweltschützer! Vielen Dank, dass du unsere App nutzt.
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
          </Grid>
      </Dialog> */}
    </div>
  );
}

InformationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
