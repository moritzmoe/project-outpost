import React, { useState, useEffect } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Snackbar, Typography } from '@material-ui/core';


import MuiAlert from '@material-ui/lab/Alert';
import BarcodeScanner from '../components/BarcodeScanner';
import BarcodeTypeInDialog from '../components/BarcodeTypeInDialog';
import ItemCreationDialog from '../components/ItemCreationDialog';
import ItemUpdateDialog from '../components/ItemUpdateDialog';
import ItemCard from '../components/ItemCard';


const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(3),
  },
  message: {
    marginBottom: theme.spacing(2),
  },
  bottom_space: {
    marginBottom: theme.spacing(2),
  },
  top_space: {
    marginTop: theme.spacing(2),
  },
}));

let cancel = '';
let cancelNA = '';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Items() {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [id, setId] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [openBarcode, setOpenBarcode] = useState(false);
  const [openBarcodeTypeIn, setOpenBarcodeTypeIn] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFieldText, setSearchFieldText] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [itemsNA, setItemsNA] = useState([]);
  const [searchQueryNA, setSearchQueryNA] = useState('');
  const [searchFieldTextNA, setSearchFieldTextNA] = useState('');

  const setPageName = useSetStoreValue('pageName');
  const isAdmin = useStoreValue('isAdmin');

  // this is needed to detect if the users system has a camera
  navigator.getMedia = (navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia
    || navigator.msGetUserMedia);

  const handleClickOpen = () => {
    // navigator.getMedia({ video: true }, () => {
    setOpenBarcode(true);
    // }, () => {
    //   setOpenBarcodeTypeIn(true);
    // });
  };

  function onBarcodeScannerResult(scanResult) {
    setBarcode(scanResult);
    setOpenBarcode(false);
    setOpenCreate(true);
  }

  useEffect(() => {
    fetchSearchResults(searchQuery);
    fetchSearchResultsNA(searchQueryNA);
    setPageName('Item Database');
    console.log('JaNein', itemsNA.length);
  }, []);

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchSearchResultsNA(searchQueryNA);
  }, [searchQueryNA]);

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

  const fetchSearchResultsNA = (query) => {
    if (cancelNA) {
      cancelNA.cancel();
    }
    console.log('Query:', query);
    cancelNA = axios.CancelToken.source();
    axios.get(`/api/items/approved/?limit=2&offset=0&q=${query}`, { cancelToken: cancelNA.token, })
      .then((res) => {
        setItemsNA(res.data);
      })
      .catch((error2) => {
        console.log(error2);
      });
    console.log('Items:', itemsNA);
  };

  const handleBarcodeDialogClose = () => {
    setOpenBarcode(false);
  };

  const handleBarcodeTypeInClose = () => {
    setOpenBarcodeTypeIn(false);
  };

  const handleBarcodeTypeIn = (data) => {
    setBarcode(data);
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpenUpdate(false);
    setOpenCreate(false);
    setBarcode('');
  };

  const handleItemDetails = (passedId) => {
    axios.get(`/api/items/${passedId}`).then((res) => {
      setId(res.data[0].id);
      setOpenUpdate(true);
    });
  };

  const handleItemsChange = () => {
    /* axios.get('/api/items').then((res) => {
      setItems(res.data);

    }); */

    const queryNA = '';
    setSearchQueryNA(queryNA);
    fetchSearchResultsNA(searchQueryNA);

    setSearchFieldText(barcode);
    const query = barcode;
    setSearchQuery(query);
    fetchSearchResults(searchQuery);
    setMessage('Produkt wurde erfolgreich angelegt!');
    setOpenMessage(true);
    handleClose();
  };

  const handleSearchInputChange = (evt) => {
    setSearchFieldText(evt.target.value);
    evt.preventDefault();
    const query = evt.target.value;
    setSearchQuery(query);
  };

  const handleSearchInputChangeNA = (evt) => {
    setSearchFieldTextNA(evt.target.value);
    evt.preventDefault();
    const query = evt.target.value;
    setSearchQueryNA(query);
  };

  const handleBarcodeTypeInSubmit = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setError(true);
      setErrorMsg('Currently only 13 Digit EAN Barcodes are supported.');
      handleBarcodeDialogClose();
      return;
    }
    handleBarcodeDialogClose();
    handleBarcodeTypeIn(barcode);
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
      {isAdmin ? (
        <Container>
          <Grid container justify="center" spacing={3}>
            <Container>
              <Typography variant="h5" justify="center" color="primary" className={classes.top_space}>Noch zu bestätigende Items</Typography>
              <Grid container justify="center" spacing={3}>
                <Grid item>
                  <form className={classes.root} noValidate autoComplete="off" onChange={handleSearchInputChangeNA}>
                    <TextField id="itemSearchFieldNA" className={classes.bottomSpacing} label="Suchen" variant="outlined" value={searchFieldTextNA} />
                  </form>
                </Grid>
              </Grid>
              <Grid container justify="center" spacing={3} className={classes.bottom_space}>
                {itemsNA.map(value => (
                  <ItemCard item={value} openDetails={handleItemDetails} />
                ))}
                {!itemsNA.length ? (
                  <Grid item>
                    <Typography>Keine Produkte zum Bestätigen gefunden</Typography>
                  </Grid>
                ) : ''}
              </Grid>
            </Container>
            <Container>
              <Typography variant="h5" justify="center" color="primary">Bereits bestätigte Produkte</Typography>
              <Grid container justify="center" spacing={3}>
                <Grid item>
                  <form className={classes.root} noValidate autoComplete="off" onChange={handleSearchInputChange}>
                    <TextField id="itemSearchField" className={classes.bottomSpacing} label="Suchen" variant="outlined" value={searchFieldText} />
                  </form>
                </Grid>
              </Grid>
              <Grid container justify="center" spacing={2}>
                {items.map(value => (
                  <ItemCard item={value} openDetails={handleItemDetails} />
                ))}
                {!items.length ? (
                  <Grid item>
                    <Typography>Keine Produkte gefunden</Typography>
                  </Grid>
                ) : ''}
              </Grid>

              <Fab color="primary" aria-label="add" className={classes.fab} variant="extended" onClick={handleClickOpen}>
                <AddIcon />
                Add Item
              </Fab>

              <Dialog open={openBarcode} onClose={handleBarcodeDialogClose}>
                <DialogTitle id="form-dialog-title">Scan Barcode</DialogTitle>
                <DialogContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} className={classes.alignItemsAndJustifyContent}>
                      <BarcodeScanner callback={handleBarcodeTypeIn} stopOnDetect stopOnClick />
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

              <BarcodeTypeInDialog
                isOpen={openBarcodeTypeIn}
                barcodeTypeInResult={handleBarcodeTypeIn}
                handleClose={handleBarcodeTypeInClose}
              />

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
                noInput={false}
              />
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
          </Grid>
        </Container>


      ) : ''}
    </div>
  );
}
