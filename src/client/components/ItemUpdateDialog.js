import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import {
  Dialog, DialogTitle, Typography, IconButton, DialogContent, TextField, DialogActions,
  Button, Slider, Grid, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
    isOpen, id, handleClose, handleSave, handleDelete
  } = props;
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [packmat, setPackmat] = useState('');
  const [packagingMaterials, setPackagingMaterials] = useState([]);
  const [packtype, setPacktype] = useState('');
  const [packagingTypes, setPackagingTypes] = useState([]);
  const [origin, setOrigin] = useState('');
  const [score, setScore] = useState(0);
  const [createdBy, setCreatedBy] = useState('');
  const [lastUpdatedBy, setLastUpdatedBy] = useState('');
  const [barcodeErr, setBarcodeErr] = useState(false);
  const [barcodeErrMsg, setBarcodeErrMsg] = useState('');
  const [idToDelete, setIdToDelete] = useState(0);
  const [nameToDelete, setNameToDelete] = useState('');
  const [deleteAlert, setDeleteAlert] = useState(false);

  useEffect(() => {
    axios.get(`/api/items/${id}`).then((res) => {
      setBarcode(res.data[0].barcode);
      setName(res.data[0].name);
      setCategoryId(res.data[0].SubCategory.parentCat);
      setSubCategoryId(res.data[0].categoryId);
      setPacktype(res.data[0].packtype);
      setPackmat(res.data[0].packmat);
      setOrigin(res.data[0].origin);
      setScore(res.data[0].score);
      setCreatedBy(res.data[0].created.email);
      setLastUpdatedBy(res.data[0].lastUpdated.email);
      axios.get(`/api/categories/subCats/${res.data[0].SubCategory.parentCat}`).then((response) => {
        setSubcategories(response.data);
      });
    });
  }, [isOpen]);

  useEffect(() => {
    axios.get('/api/categories').then((res) => { setCategories(res.data); });
    axios.get('/api/packaging/packMat').then((res) => { setPackagingMaterials(res.data); });
    axios.get('/api/packaging/packType').then((res) => { setPackagingTypes(res.data); });
  }, []);

  const handleItemChange = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setBarcodeErr(true);
      setBarcodeErrMsg('Currently only 13 Digit EAN Barcodes are supported.');
      return;
    }
    axios.put(`/api/items/${id}`, {
      name, subCategoryId, barcode, packtype, packmat, origin, score
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

  const handlePackMatPick = (evt) => {
    setPackmat(evt.target.value);
  };

  const handlePackTypePick = (evt) => {
    setPacktype(evt.target.value);
  };

  const handleCategoryPick = (evt) => {
    setCategoryId(evt.target.value);
    axios.get(`/api/categories/subCats/${evt.target.value}`).then(res => setSubcategories(res.data));
  };

  const handleSubCategoryPick = (evt) => {
    setSubCategoryId(evt.target.value);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">
          {name}
          <Grid container>
            <Grid item xs={6}>
              <Typography color="textSecondary" variant="body2">
                ID:
                <br />
                Created by:
                <br />
                Last changed by:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textSecondary" variant="body2">
                {id}
                <br />
                {createdBy}
                <br />
                {lastUpdatedBy}
              </Typography>
            </Grid>
          </Grid>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleItemChange}>
          <DialogContent>
            <TextField
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
              value={name}
              fullWidth
              required
              margin="dense"
              label="Name"
              onChange={e => setName(e.target.value)}
            />
            <FormControl required fullWidth className={classes.dropDown}>
              <InputLabel>Category</InputLabel>
              <Select
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
              <InputLabel>Subcategory</InputLabel>
              <Select
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
              <InputLabel>Packaging Type</InputLabel>
              <Select
                id="packMat-select"
                value={packtype}
                onChange={handlePackTypePick}
              >
                {packagingTypes.map(value => (
                  <MenuItem value={value.id}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required fullWidth className={classes.dropDown}>
              <InputLabel>Packaging Material</InputLabel>
              <Select
                fullWidth
                id="packMat-select"
                value={packmat}
                onChange={handlePackMatPick}
              >
                {packagingMaterials.map(value => (
                  <MenuItem value={value.id}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              value={origin}
              fullWidth
              required
              margin="dense"
              label="Origin"
              onChange={e => setOrigin(e.target.value)}
            />
            <Typography gutterBottom className={classes.scoreText}>
              Score:
            </Typography>
            <Slider
              required
              value={score}
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              onChange={(e, v) => setScore(v)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.deleteButton}
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteAlertOpen(id, name)}
            >
              Delete
            </Button>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<EditIcon />}
            >
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={deleteAlert}
        onClose={handleDeleteAlertClose}
      >
        <DialogTitle id="alert-dialog-title">
          Delete
          {' '}
          {nameToDelete}
          ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteAlertClose} color="primary">
            Abort
          </Button>
          <Button onClick={handleItemDelete} color="primary" autoFocus>
            Delete
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
  handleDelete: PropTypes.func.isRequired
};
