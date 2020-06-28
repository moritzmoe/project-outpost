/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useSetStoreValue } from 'react-context-hook';
import {
  Grid, TextField, Dialog, DialogTitle, DialogContent, Button, IconButton, Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import BarcodeScanner from '../components/BarcodeScanner';
import ItemCard from '../components/ItemCard';
import ItemCreationDialog from '../components/ItemCreationDialog';

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

  const handleItemClick = (id) => {
  };

  const fetchSearchResults = (query) => {
    if (cancel) {
      cancel.cancel();
    }
    console.log('Query:', query);
    cancel = axios.CancelToken.source();
    axios.get(`/api/items?limit=5&offset=0&q=${query}`, { cancelToken: cancel.token, })
      .then((res) => {
        setItems(res.data);
      })
      .catch((error2) => {
        console.log(error2);
      });
    console.log('Items:', items);
  };

  const handleBarcodeInput = (data) => {
    setBarcode(data);
    if (!addProductSwitch) {
      setSearchFieldText(data);
      const query = data;
      setSearchQuery(query);
    } else {
      setOpenCreate(true);
      console.log('Item soll geadded werden'); setAddProductSwitch(false);
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
      setErrorMsg('Currently only 13 Digit EAN Barcodes are supported.');
      handleBarcodeDialogClose();
      return;
    }
    handleBarcodeInput(barcode);
  };

  const handleBarcodeScan = () => {
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
    axios.get('/api/items').then((res) => {
      setItems(res.data);
      handleClose();
    });
  };

  return (
    <Container>
      <Grid container justify="space-between" spacing={3}>
        <Grid item />
      </Grid>
      <Grid item xs={12} align="right">
        <Grid container justify="center" spacing={3}>
          <Grid item>
            <form className={classes.root} noValidate autoComplete="off" onChange={handleSearchInputChange}>
              <TextField id="itemSearchField" className={classes.bottomSpacing} label="Suchen" variant="outlined" value={searchFieldText} />
            </form>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.bottomSpacing} spacing={2}>
          {items.map(value => (
            <ItemCard item={value} openDetails={handleItemClick} />
          ))}
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
      <Fab
        color="primary"
        aria-label="search"
        className={classes.fabBarcode}
        variant="extended"
        startIcon={<AddShoppingCartIcon />}
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
        startIcon={<AddShoppingCartIcon />}
        onClick={handleItemCreate}
      >
        <AddIcon />
        Produkt
      </Fab>
    </Container>
  );
}
