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
  }
}));


export default function Items() {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [id, setId] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [openBarcode, setOpenBarcode] = useState(false);
  const [openBarcodeTypeIn, setOpenBarcodeTypeIn] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const setPageName = useSetStoreValue('pageName');
  const isAdmin = useStoreValue('isAdmin');

  // this is needed to detect if the users system has a camera
  navigator.getMedia = (navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia
    || navigator.msGetUserMedia);

  const handleClickOpen = () => {
    navigator.getMedia({ video: true }, () => {
      setOpenBarcode(true);
    }, () => {
      setOpenBarcodeTypeIn(true);
    });
  };

  function onBarcodeScannerResult(scanResult) {
    setBarcode(scanResult);
    setOpenBarcode(false);
    setOpenCreate(true);
  }

  useEffect(() => {
    axios.get('/api/items').then((res) => {
      setItems(res.data);
    });
    setPageName('Item Database');
  }, []);

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
    axios.get('/api/items').then((res) => {
      setItems(res.data);
      handleClose();
    });
  };


  return (
    <div>
      {isAdmin ? (
        <Container>
          <Grid container justify="center" spacing={2}>
            {items.map(value => (
              <ItemCard item={value} openDetails={handleItemDetails} />
            ))}
          </Grid>

          <Fab color="primary" aria-label="add" className={classes.fab} variant="extended" onClick={handleClickOpen}>
            <AddIcon />
            Add Item
          </Fab>

          <Dialog open={openBarcode} onClose={handleBarcodeDialogClose}>
            <DialogTitle id="form-dialog-title">Scan Barcode</DialogTitle>
            <DialogContent>
              <BarcodeScanner callback={onBarcodeScannerResult} stopOnDetect stopOnClick />
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
          />
        </Container>
      ) : ''}
    </div>
  );
}
