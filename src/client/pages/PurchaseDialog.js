/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Dialog, ListItemText, ListItem, List, Divider,
  AppBar, Toolbar, IconButton, Typography, Slide, Container,
  Grid, Paper, Box, DialogTitle, DialogContent, Snackbar
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import ScanBarcodeCard from '../components/ScanBarcodeCard';
import ScanQRCodeCard from '../components/ScanQRCodeCard';
import BarcodeScanner from '../components/BarcodeScanner';
import BarcodeTypeInDialog from '../components/BarcodeTypeInDialog';
import ItemCard from '../components/ItemCard';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  co2Display: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2)
  },
  error: {
    marginBottom: theme.spacing(2),
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function PurchaseDialog(props) {
  const classes = useStyles();
  const { isOpen, handleClose } = props;
  const [purchaseId, setPurchaseId] = useState(0);
  const [openBarcodeTypeIn, setOpenBarcodeTypeIn] = useState(false);
  const [openBarcode, setOpenBarcode] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const clearStateAndHandleClose = () => {
    setPurchaseId(0);
    setItems([]);
    setTotalScore(0);
    handleClose();
    setError(false);
    setErrorMsg('');
  };
  // this is needed to detect if the users system has a camera
  navigator.getMedia = (navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia);

  const handleBarcodeScan = () => {
    if (purchaseId === 0) {
      axios.post('/api/purchases').then((res) => {
        setPurchaseId(res.data.id);
      });
    }
    navigator.getMedia({ video: true }, () => {
      setOpenBarcode(true);
    }, () => {
      setOpenBarcodeTypeIn(true);
    });
  };

  const discardPurchase = () => {
    if (purchaseId !== 0) {
      axios.delete(`/api/purchases/${purchaseId}`);
    }
    clearStateAndHandleClose();
  };

  const handleBarcodeDialogClose = () => {
    setOpenBarcode(false);
  };

  const handleBarcodeTypeInClose = () => {
    setOpenBarcodeTypeIn(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
    setErrorMsg('');
  };

  const handleBarcodeInput = (data) => {
    axios.post(`/api/purchases/item/${purchaseId}`, {
      barcode: data
    }).then((res) => {
      let score = 0;
      res.data.Items.map((item) => {
        score = parseInt(totalScore, 10) + parseInt(item.score, 10);
      });
      setTotalScore(score);
      setItems(res.data.Items);
    }).catch((err) => {
      setErrorMsg(err.response.data.error);
      setError(true);
    });
    handleBarcodeDialogClose();
    handleBarcodeTypeInClose();
  };

  const nothing = () => {
    console.log('Item Detail for User is still needed');
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={clearStateAndHandleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={discardPurchase} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Purchase
            </Typography>
            <Button autoFocus color="inherit" onClick={clearStateAndHandleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container spacing={2}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.co2Display}>
                Total:
                {' '}
                {totalScore}
                {' '}
                g
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {items.map(value => (
                  <ItemCard item={value} openDetails={nothing} />
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ScanBarcodeCard handleClick={handleBarcodeScan} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ScanQRCodeCard />
            </Grid>
          </Grid>
        </Container>
      </Dialog>
      <Dialog open={openBarcode} onClose={handleBarcodeDialogClose}>
        <DialogTitle id="form-dialog-title">Scan Barcode</DialogTitle>
        <DialogContent>
          <BarcodeScanner callback={handleBarcodeInput} stopOnDetect stopOnClick />
        </DialogContent>
      </Dialog>
      <BarcodeTypeInDialog
        isOpen={openBarcodeTypeIn}
        barcodeTypeInResult={handleBarcodeInput}
        handleClose={handleBarcodeTypeInClose}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        className={classes.error}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

PurchaseDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};