import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';

const useStyles = makeStyles(theme => ({
  scoreText: {
    marginTop: theme.spacing(2)
  },
  dropDown: {
    marginTop: theme.spacing(1)
  }
}));

export default function ItemCreationDialog(props) {
  const classes = useStyles();

  const {
    isOpen, barcode, handleClose, handleItemCreated
  } = props;
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
  const [barcodeErr, setBarcodeErr] = useState(false);
  const [barcodeErrMsg, setBarcodeErrMsg] = useState('');
  const isAdmin = useStoreValue('isAdmin');
  const [needApproval, setNeedApproval] = useState(0);

  useEffect(() => {
    axios.get('/api/categories').then((res) => { setCategories(res.data); });
    axios.get('/api/packaging').then((res) => { setPackaging(res.data); });
    axios.get('/api/origins').then((res) => { setOrigin(res.data); });
    if (isAdmin) setNeedApproval(1);
    console.log('isadmin', isAdmin);
    console.log('approval', needApproval);
  }, []);

  const handleCategoryPick = (evt) => {
    setCategoryId(evt.target.value);
    axios.get(`/api/categories/subCats/${evt.target.value}`).then(res => setSubcategories(res.data));
  };

  const handleSubCategoryPick = (evt) => {
    setSubCategoryId(evt.target.value);
  };

  const handlePackagingPick = (evt) => {
    setPackagingId(evt.target.value);
  };

  const handleOriginPick = (evt) => {
    setOriginId(evt.target.value);
  };

  const clearState = () => {
    setName('');
    setCategoryId('');
    setSubCategoryId('');
    setPackagingId('');
    setOriginId('');
  };

  const clearStateHandleClose = () => {
    clearState();
    handleClose();
  };

  const handleItemCreate = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setBarcodeErr(true);
      setBarcodeErrMsg('Currently only 13 Digit EAN Barcodes are supported.');
      return;
    }
    axios.post('/api/items', {
      name, weight, categoryId: subCategoryId, barcode, packaging: packagingId, origin: originId, approved: needApproval
    }).then((res) => {
      if (res.status === 200) {
        clearState();
        handleItemCreated();
      }
    }).catch((err) => {
      console.log(err);
      clearStateHandleClose();
    });
  };


  return (
    <div>
      <Dialog open={isOpen} onClose={clearStateHandleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleItemCreate}>
          <DialogTitle id="form-dialog-title">Produkt hinzufügen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bitte gib die folgenden Informationen ein:
            </DialogContentText>
            <TextField
              error={barcodeErr}
              helperText={barcodeErrMsg}
              autoFocus
              required
              value={barcode}
              margin="dense"
              label="EAN-13 Barcode"
              type="number"
              fullWidth
              disabled
            />
            <TextField
              autoFocus
              required
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              onChange={e => setName(e.target.value)}
            />
            <TextField
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
            <Button onClick={clearStateHandleClose} color="primary">
              Abbrechen
            </Button>
            <Button type="submit" color="primary">
              Produkt hinzufügen
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

ItemCreationDialog.propTypes = {
  barcode: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleItemCreated: PropTypes.func.isRequired
};
