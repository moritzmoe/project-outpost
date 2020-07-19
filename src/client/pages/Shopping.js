import {
  Dialog, DialogContent, DialogTitle, Fab, Grid, IconButton, Snackbar, TextField, Typography
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSetStoreValue } from 'react-context-hook';
import BarcodeScanner from '../components/BarcodeScanner';
import ItemCard from '../components/ItemCard';
import ItemCreationDialog from '../components/ItemCreationDialog';
import ItemUpdateDialog from '../components/ItemUpdateDialog';

const useStyles = makeStyles(theme => ({
  bottomSpacing: {
    bottom: theme.spacing(2)
  },
  fabBarcode: {
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(3),
  },
  fabAdd: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(3),
  },
}));

let cancel = '';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Shopping() {
  const [result, setResult] = useState('');
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [barcode, setBarcode] = useState('');
  const [openBarcode, setOpenBarcode] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchFieldText, setSearchFieldText] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [addProductSwitch, setAddProductSwitch] = useState(false);
  const [id, setId] = useState(0);
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [openError, setOpenError] = useState(false);

  const setPageName = useSetStoreValue('pageName');

  useEffect(() => {
    setPageName('Shopping');
    fetchSearchResults(searchQuery);
  }, []);

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  const handleSearchInputChange = (evt) => {
    setSearchFieldText(evt.target.value);
    evt.preventDefault();
    const query = evt.target.value;
    setSearchQuery(query);
  };

  const handleItemClick = (idOfClick) => {
    setId(idOfClick);
    setOpenUpdate(true);
  };

  const fetchSearchResults = (query) => {
    if (cancel) {
      cancel.cancel();
    }
    cancel = axios.CancelToken.source();
    axios.get(`/api/items?limit=9&offset=0&q=${query}`, { cancelToken: cancel.token, })
      .then((res) => {
        setItems(res.data);
      })
      .catch((error2) => {
      });
  };

  const handleBarcodeInput = (data) => {
    setBarcode(data);
    if (!addProductSwitch) {
      setSearchFieldText(data);
      const query = data;
      setSearchQuery(query);
    } else {
      setOpenCreate(true);
    }
    handleBarcodeDialogClose();
    // handleBarcodeTypeInClose();
  };

  const handleBarcodeDialogClose = () => {
    setOpenBarcode(false);
  };

  const handleBarcodeTypeInSubmit = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setError(true);
      setMessage('Currently only 13 Digit EAN Barcodes are supported.');
      setOpenError(true);
      handleBarcodeDialogClose();
      return;
    }
    handleBarcodeInput(barcode);
  };

  const handleBarcodeScan = () => {
    setAddProductSwitch(false);
    setOpenBarcode(true);
  };

  const handleClose = () => {
    setOpenUpdate(false);
    setOpenCreate(false);
    setBarcode('');
  };

  const handleItemCreate = () => {
    setAddProductSwitch(true);
    setOpenBarcode(true);
  };

  const handleItemsChange = () => {
    setMessage('Produkt wurde eingereicht und wird überprüft');
    setOpenMessage(true);
    handleClose();
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
    <Container>
      <Grid container justify="space-between" spacing={3}>
        <Grid item />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          <Grid item>
            <form className={classes.root} noValidate autoComplete="off" onChange={handleSearchInputChange}>
              <TextField id="itemSearchField" className={classes.bottomSpacing} label="Produktsuche" variant="outlined" value={searchFieldText} />
            </form>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.bottomSpacing} spacing={2}>
          {items.map(value => (
            <ItemCard key={value.id} item={value} openDetails={handleItemClick} openRec />
          ))}
          {!items.length ? (
            <Grid item>
              <Typography>Keine Produkte gefunden</Typography>
            </Grid>
          ) : ''}
        </Grid>
      </Grid>
      <Dialog open={openBarcode} onClose={handleBarcodeDialogClose}>
        <DialogTitle id="form-dialog-title">Scan Barcode</DialogTitle>
        <DialogContent>
          <IconButton className={classes.closeButton} onClick={handleBarcodeDialogClose}>
            <CloseIcon />
          </IconButton>
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
      <ItemCreationDialog
        isOpen={openCreate}
        handleClose={handleClose}
        handleItemCreated={handleItemsChange}
        barcode={barcode}
      />
      <ItemUpdateDialog
        isOpen={openUpdate}
        id={id}
        handleClose={handleClose}
        handleSave={handleItemsChange}
        handleDelete={handleItemsChange}
        noInput
      />
      <Fab
        color="primary"
        aria-label="search"
        className={classes.fabBarcode}
        variant="extended"
        onClick={handleBarcodeScan}
      >
        <ImageSearchIcon />
        Scan Barcode
      </Fab>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fabAdd}
        variant="extended"
        onClick={handleItemCreate}
      >
        <AddIcon />
        Produkt
      </Fab>
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
    </Container>

  );
}
