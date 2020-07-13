/* eslint-disable array-callback-return */
import {
  AppBar, Button,
  Container, Dialog,

  DialogContent, DialogTitle, Grid, IconButton, Slide,

  TextField, Toolbar, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useStoreValue } from 'react-context-hook';
import BarcodeScanner from '../components/BarcodeScanner';
// import BarcodeTypeInDialog from '../components/BarcodeTypeInDialog';
import ItemCard from '../components/ItemCard';
import ItemCreationDialog from '../components/ItemCreationDialog';
import ItemSearchDialog from '../components/ItemSearchDialog';
import ItemUpdateDialog from '../components/ItemUpdateDialog';
import QRCodeScanner from '../components/QRCodeScanner';

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
  text: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  const [openQRCode, setOpenQRCode] = useState(false);

  const convertCo2ToScore = useStoreValue('co2Convert');

  const clearStateAndHandleClose = () => {
    if (items.length === 0) {
      axios.delete(`/api/purchases/${purchaseId}`);
    }
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
      let score = totalScore;
      res.data.Items.map((item) => {
        score = parseInt(score, 10) + (parseInt(item.score, 10));
      });
      setTotalScore(score);
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


  const handleBarcodeInput = (data) => {
    setBarcode(data);
    axios.post(`/api/purchases/item/${purchaseId}`, {
      barcode: data
    }).then((res) => {
      setBarcode(barcode);
      let score = totalScore;
      res.data.Items.map((item) => {
        score = parseInt(score, 10) + (parseInt(item.score, 10));
      });
      setTotalScore(score);
      setItems(res.data.Items);
    }).catch((err) => {
      setErrorMsg(err.response.data.error);
      setError(true);
      if (err.response.data.error === 'Item not found') {
        setOpenConfirmDialog(true);
      }
    });
    handleBarcodeDialogClose();
  };

  const handleItemDetails = (passedId) => {
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
      let score = totalScore;
      res.data.Items.map((item) => {
        score = parseInt(score, 10) + (parseInt(item.score, 10));
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

  const handleQRCodeOpen = () => {
    if (purchaseId === 0) {
      axios.post('/api/purchases').then((res) => {
        setPurchaseId(res.data.id);
      }).then((res) => {
        setOpenQRCode(true);
      });
    } else {
      setOpenQRCode(true);
    }
  };

  const handleQRCodeDialogClose = () => {
    setOpenQRCode(false);
  };

  const handleQRCodeInput = (data) => {
    const dataString = String(data);
    const dataArr = dataString.split(';');

    dataArr.map((scan) => {
      axios.post(`/api/purchases/item/${purchaseId}`, {
        barcode: scan
      }).then((res) => {
        setBarcode(barcode);
        let score = totalScore;
        res.data.Items.map((item) => {
          score = parseInt(score, 10) + (parseInt(item.score, 10));
        });
        setTotalScore(score);
        setItems(res.data.Items);
      }).catch((err) => {
        setErrorMsg(err.response.data.error);
        setError(true);
      });
    });
    handleQRCodeDialogClose();
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
              Einkauf
            </Typography>
            <Button autoFocus color="inherit" onClick={clearStateAndHandleClose}>
              Speichern
            </Button>
          </Toolbar>
        </AppBar>
        <Container spacing={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom className={classes.co2Display}>
                CO2 Punkte:
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
                  <ItemCard key={value.id} item={value} openDetails={handleItemDetails} quantity={value.PurchaseItem.quantity} />
                ))}
                {!items.length ? (
                  <Grid item>
                    <Typography>Keine Produkte hinzugefügt</Typography>
                  </Grid>
                ) : ''}
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
                Barcode scannen
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.alignItemsAndJustifyContent}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={handleQRCodeOpen}
                size="large"
              >
                QR-Code scannen
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.alignItemsAndJustifyContent}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                size="large"
                onClick={handleSearchOpen}
              >
                Suche
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

      <Dialog open={openQRCode} onClose={handleQRCodeDialogClose}>
        <DialogTitle id="form-dialog-title">QR-Code</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} className={classes.alignItemsAndJustifyContent}>
              <QRCodeScanner callback={handleQRCodeInput} stopOnDetect stopOnClick />
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
          <Typography variant="h5" color="primary">Leider wurde dieses Produkt nicht gefunden </Typography>
          <Typography className={classes.text}>Du kannst für diesen Einkauf ein neues Produkt erstellen, dieses wird von unserem Team überprüft und dann für Zukünftige Einkäufe und andere Nutzer freigeschaltet.</Typography>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Button variant="outlined" color="primary" onClick={handleCreateOpen}>
              Neues Produkt
            </Button>
            <Button variant="outlined" onClick={handleBarcodeScan}>
              Nochmal Scannen
            </Button>
            <Button variant="outlined" onClick={handleConfirmDialogClose}>
              Abbrechen
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

PurchaseDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};
