import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import {
  Dialog, DialogTitle, Typography, IconButton, DialogContent, TextField, DialogActions,
  Button, Grid, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';

const useStyles = makeStyles(theme => ({
  deleteButton: {
    color: theme.palette.getContrastText(red[400]),
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[700],
    },
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  scoreText: {
    marginTop: theme.spacing(2)
  },
  dropDown: {
    marginTop: theme.spacing(1)
  }
}));

export default function ItemUpdateDialog(props) {
  const classes = useStyles();

  const {
    isOpen, id, handleClose, handleSave, handleDelete, noInput
  } = props;

  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [packagingId, setPackagingId] = useState('');
  const [packaging, setPackaging] = useState([]);
  const [originId, setOriginId] = useState('');
  const [origin, setOrigin] = useState([]);
  const [score, setScore] = useState(0);
  const [createdBy, setCreatedBy] = useState('');
  const [lastUpdatedBy, setLastUpdatedBy] = useState('');
  const [barcodeErr, setBarcodeErr] = useState(false);
  const [barcodeErrMsg, setBarcodeErrMsg] = useState('');
  const [idToDelete, setIdToDelete] = useState(0);
  const [nameToDelete, setNameToDelete] = useState('');
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);

  const convertCo2ToScore = useStoreValue('co2Convert');

  useEffect(() => {
    axios.get(`/api/items/${id}`).then((res) => {
      setBarcode(res.data[0].barcode);
      setName(res.data[0].name);
      setWeight(res.data[0].weight);
      setCategoryId(res.data[0].SubCategory.parentCat);
      setSubCategoryId(res.data[0].categoryId);
      setPackagingId(res.data[0].packaging);
      setOriginId(res.data[0].origin);
      setScore(res.data[0].score);
      setCreatedBy(res.data[0].created.email);
      setLastUpdatedBy(res.data[0].lastUpdated.email);
      axios.get(`/api/categories/subCats/${res.data[0].SubCategory.parentCat}`).then((response) => {
        setSubcategories(response.data);
      });
      setInputDisabled(noInput);
    });
  }, [isOpen]);

  useEffect(() => {
    axios.get('/api/categories').then((res) => { setCategories(res.data); });
    axios.get('/api/packaging').then((res) => { setPackaging(res.data); });
    axios.get('/api/origins').then((res) => { setOrigin(res.data); });
  }, []);

  const handleItemChange = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setBarcodeErr(true);
      setBarcodeErrMsg('Currently only 13 Digit EAN Barcodes are supported.');
      return;
    }
    axios.put(`/api/items/${id}`, {
      name, weight, subCategoryId, packagingId, originId, score, barcode
    }).then((res) => {
      if (res.status === 200) {
        handleSave();
      }
    }).catch((err) => {
      console.log(err);
      handleClose();
    });
  };

  const handleDeleteAlertOpen = (passedId, itemName) => {
    setIdToDelete(passedId);
    setNameToDelete(itemName);
    setDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setDeleteAlert(false);
    setIdToDelete(0);
    setNameToDelete('');
  };

  const handleItemDelete = () => {
    axios.delete(`/api/items/${idToDelete}`).then((res) => {
      if (res.status === 200) {
        handleDelete();
      }
    });
    handleDeleteAlertClose();
    handleClose();
  };

  const handlePackagingPick = (evt) => {
    setPackagingId(evt.target.value);
  };

  const handleCategoryPick = (evt) => {
    setCategoryId(evt.target.value);
    axios.get(`/api/categories/subCats/${evt.target.value}`).then(res => setSubcategories(res.data));
  };

  const handleSubCategoryPick = (evt) => {
    setSubCategoryId(evt.target.value);
  };

  const handleOriginPick = (evt) => {
    setOriginId(evt.target.value);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={5} align="right">
              <Typography variant="h4" color="primary">
                {(Math.floor(score / convertCo2ToScore))}
                {}
              </Typography>
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          {!inputDisabled ? (
            <Grid container>
              <Grid item xs={5}>

                <Typography color="textSecondary" variant="body2">
                  ID:
                  <br />
                  Erstellt von:
                  <br />
                  Letzte Änderung:
                </Typography>

              </Grid>
              <Grid item xs={7}>
                <Typography color="textSecondary" variant="body2">
                  {id}
                  <br />
                  {createdBy}
                  <br />
                  {lastUpdatedBy}
                </Typography>
              </Grid>
            </Grid>
          ) : ''}
        </DialogTitle>
        <form onSubmit={handleItemChange}>
          <DialogContent>
            <TextField
              disabled={inputDisabled}
              error={barcodeErr}
              helperText={barcodeErrMsg}
              value={barcode}
              type="number"
              fullWidth
              required
              margin="dense"
              label="EAN-13 Barcode"
              onChange={e => setBarcode(e.target.value)}
            />
            <TextField
              disabled={inputDisabled}
              value={name}
              fullWidth
              required
              margin="dense"
              label="Name"
              onChange={e => setName(e.target.value)}
            />
            <TextField
              disabled={inputDisabled}
              value={weight}
              required
              margin="dense"
              label="Weight (g)"
              type="number"
              fullWidth
              onChange={e => setWeight(e.target.value)}
            />
            <FormControl required fullWidth className={classes.dropDown}>
              <InputLabel>Kategorie</InputLabel>
              <Select
                disabled={inputDisabled}
                id="category-select"
                value={categoryId}
                onChange={handleCategoryPick}
              >
                {categories.map(value => (
                  <MenuItem value={value.id}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required fullWidth className={classes.dropDown} disabled={!categoryId}>
              <InputLabel>Unterkategorie</InputLabel>
              <Select
                disabled={inputDisabled}
                id="subCat-select"
                value={subCategoryId}
                onChange={handleSubCategoryPick}
              >
                {subCategories.map(value => (
                  <MenuItem value={value.id}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required fullWidth className={classes.dropDown}>
              <InputLabel>Verpackung </InputLabel>
              <Select
                disabled={inputDisabled}
                id="pack-select"
                value={packagingId}
                onChange={handlePackagingPick}
              >
                {packaging.map(value => (
                  <MenuItem value={value.id}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required fullWidth className={classes.dropDown}>
              <InputLabel>Herkunft </InputLabel>
              <Select
                disabled={inputDisabled}
                id="origin-select"
                value={originId}
                onChange={handleOriginPick}
              >
                {origin.map(value => (
                  <MenuItem value={value.id}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={inputDisabled}
              size="small"
              variant="contained"
              color="primary"
              className={classes.deleteButton}
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteAlertOpen(id, name)}
            >
              Löschen
            </Button>
            <Button
              disabled={inputDisabled}
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<EditIcon />}
            >
              Speichern
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={deleteAlert}
        onClose={handleDeleteAlertClose}
      >
        <DialogTitle id="alert-dialog-title">
          Löschen
          {' '}
          {nameToDelete}
          ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteAlertClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleItemDelete} color="primary" autoFocus>
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ItemUpdateDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  noInput: PropTypes.bool.isRequired
};
