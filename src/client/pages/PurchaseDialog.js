/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Dialog, ListItemText, ListItem, List, Divider,
  AppBar, Toolbar, IconButton, Typography, Slide, Container,
  Grid, Paper, Box, DialogTitle, DialogContent, Snackbar, Fab,
  TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import ScanBarcodeCard from '../components/ScanBarcodeCard';
import ScanQRCodeCard from '../components/ScanQRCodeCard';
import BarcodeScanner from '../components/BarcodeScanner';
// import BarcodeTypeInDialog from '../components/BarcodeTypeInDialog';
import ItemCard from '../components/ItemCard';
import ItemSearchDialog from '../components/ItemSearchDialog';
import ItemUpdateDialog from '../components/ItemUpdateDialog';
import ItemCreationDialog from '../components/ItemCreationDialog';

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
    justifyContent: 'center',
    width: 100
  },
  co2Display: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2)
  },
  error: {
    marginBottom: theme.spacing(2),
  },
  bottomControls: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(1),
    left: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function PurchaseDialog(props) {
  const classes = useStyles();
  const { isOpen, handleClose } = props;
  const [purchaseId, setPurchaseId] = useState(0);
  // const [openBarcodeTypeIn, setOpenBarcodeTypeIn] = useState(false);
  const [openBarcode, setOpenBarcode] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openItemSearch, setOpenItemSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const convertCo2ToScore = useStoreValue('co2Convert');

  const clearStateAndHandleClose = () => {
    setPurchaseId(0);
    setItems([]);
    setTotalScore(0);
    handleClose();
    setError(false);
    setErrorMsg('');
  };
  // this is needed to detect if the users system has a camera
  /* navigator.getMedia = (navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia);
  */

  const handleSearchOpen = () => {
    if (purchaseId === 0) {
      axios.post('/api/purchases').then((res) => {
        setPurchaseId(res.data.id);
      });
    }
    setOpenItemSearch(true);
  };

  const handleItemSearchClose = () => {
    setOpenItemSearch(false);
  };

  const handleSearchInput = (data) => {
    axios.post(`/api/purchases/item/${purchaseId}`, {
      barcode: data
    }).then((res) => {
      let score = 0;
      res.data.Items.map((item) => {
        score = parseInt(totalScore, 10) + parseInt(item.score, 10);
      });
      setTotalScore(score);
      console.log(score);
      setItems(res.data.Items);
    }).catch((err) => {
      setErrorMsg(err.response.data.error);
      setError(true);
    });
    handleItemSearchClose();
  };

  const handleBarcodeScan = () => {
    handleConfirmDialogClose();
    if (purchaseId === 0) {
      axios.post('/api/purchases').then((res) => {
        setPurchaseId(res.data.id);
      });
    }
    // navigator.getMedia({ video: true }, () => {
    setOpenBarcode(true);
    // }, () => {
    //  setOpenBarcodeTypeIn(true);
    // });
  };

  const handleBarcodeTypeInSubmit = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setError(true);
      setErrorMsg('Currently only 13 Digit EAN Barcodes are supported.');
      handleBarcodeDialogClose();
      return;
    }
    handleBarcodeInput(barcode);
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

  /* const handleBarcodeTypeInClose = () => {
    setOpenBarcodeTypeIn(false);
  };
  */

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
      setBarcode(barcode);
      let score = 0;
      res.data.Items.map((item) => {
        score = parseInt(totalScore, 10) + parseInt(item.score, 10);
      });
      setTotalScore(score);
      setItems(res.data.Items);
    }).catch((err) => {
      setErrorMsg(err.response.data.error);
      setError(true);
      console.log('Hier fragen ob neues Item anlegen');
      setOpenConfirmDialog(true);
    });
    handleBarcodeDialogClose();
    // handleBarcodeTypeInClose();
  };

  const handleItemDetails = (passedId) => {
    console.log('passedId', passedId);
    axios.get(`/api/items/${passedId}`).then((res) => {
      setItemId(res.data[0].id);
      setOpenUpdate(true);
    });
  };

  const handleDetailClose = () => {
    setOpenUpdate(false);
  };

  const handleConfirmDialogClose = () => {
    setOpenConfirmDialog(false);
  };

  const handleItemsChange = () => {
    axios.post(`/api/purchases/item/${purchaseId}`, {
      barcode
    }).then((res) => {
      setBarcode(barcode);
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
    handleCreateClose();
  };

  const handleCreateOpen = () => {
    setOpenCreate(true);
    setOpenConfirmDialog(false);
  };

  const handleCreateClose = () => {
    setOpenCreate(false);
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom className={classes.co2Display}>
                Purchase CO2:
              </Typography>
              <Typography variant="h3" color="primary" gutterBottom className={classes.co2Display}>
                {(Math.floor(totalScore / convertCo2ToScore))}
                {' '}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {items.map(value => (
                  <ItemCard item={value} openDetails={handleItemDetails} />
                ))}
              </Grid>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <ScanBarcodeCard handleClick={handleBarcodeScan} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ScanQRCodeCard />
                </Grid> */}
          </Grid>
          <Grid container spacing={3} className={classes.bottomControls}>
            <Grid item xs={12} sm={6} className={classes.alignItemsAndJustifyContent}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                size="large"
                onClick={handleBarcodeScan}
              >
                Scan Barcode
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.alignItemsAndJustifyContent}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                size="large"
              >
                Scan QR-Code
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.alignItemsAndJustifyContent}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                size="large"
                onClick={handleSearchOpen}
              >
                Search
              </Button>
              <ItemSearchDialog
                isOpen={openItemSearch}
                itemClick={handleSearchInput}
                handleClose={handleItemSearchClose}
              />
              <ItemUpdateDialog
                isOpen={openUpdate}
                id={itemId}
                handleClose={handleDetailClose}
                handleSave={handleItemsChange}
                handleDelete={handleItemsChange}
                noInput
              />
              <ItemCreationDialog
                isOpen={openCreate}
                handleClose={handleCreateClose}
                handleItemCreated={handleItemsChange}
                barcode={barcode}
              />
            </Grid>
          </Grid>
        </Container>
      </Dialog>
      <Dialog open={openBarcode} onClose={handleBarcodeDialogClose}>
        <DialogTitle id="form-dialog-title">Scan Barcode</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} className={classes.alignItemsAndJustifyContent}>
              <BarcodeScanner callback={handleBarcodeInput} stopOnDetect stopOnClick />
            </Grid>
            <Grid item xs={12} sm={12} className={classes.alignItemsAndJustifyContent}>
              <form on onSubmit={handleBarcodeTypeInSubmit}>
                <TextField
                  label="Barcode"
                  variant="outlined"
                  onChange={e => setBarcode(e.target.value)}
                />
              </form>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog open={openConfirmDialog} onClose={handleConfirmDialogClose}>
        <DialogContent>
          <Grid item xs={12} align="right">
            <IconButton className={classes.closeButton} onClick={handleConfirmDialogClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Typography color="primary">Leider wurde dieses Produkt nicht gefunden. </Typography>
          <Typography>Du kannst für diesen Einkauf ein neues Produkt erstellen, dieses wird von unserem Team überprüft und dann für Zukünftige Einkäufe und andere Nutzer freigeschaltet.</Typography>
          <Button variant="outlined" color="primary" onClick={handleCreateOpen}>
            Neues Produkt
          </Button>
          <Button variant="outlined" onClick={handleBarcodeScan}>
            Nochmal Scannen
          </Button>
          <Button variant="outlined" onClick={handleConfirmDialogClose}>
            Abbrechen
          </Button>
        </DialogContent>
      </Dialog>
      {/* <BarcodeTypeInDialog
        isOpen={openBarcodeTypeIn}
        barcodeTypeInResult={handleBarcodeInput}
        handleClose={handleBarcodeTypeInClose}
      /> */ }
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
