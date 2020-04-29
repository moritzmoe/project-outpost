import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

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

  const { isOpen, barcode, handleClose } = props;
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
  const [barcodeErr, setBarcodeErr] = useState(false);
  const [barcodeErrMsg, setBarcodeErrMsg] = useState('');

  useEffect(() => {
    axios.get('/api/categories').then((res) => { setCategories(res.data); });
    axios.get('/api/packaging/packMat').then((res) => { setPackagingMaterials(res.data); });
    axios.get('/api/packaging/packType').then((res) => { setPackagingTypes(res.data); });
  }, []);

  const handleCategoryPick = (evt) => {
    setCategoryId(evt.target.value);
    axios.get(`/api/categories/subCats/${evt.target.value}`).then(res => setSubcategories(res.data));
  };

  const handleSubCategoryPick = (evt) => {
    setSubCategoryId(evt.target.value);
  };

  const handlePackMatPick = (evt) => {
    setPackmat(evt.target.value);
  };

  const handlePackTypePick = (evt) => {
    setPacktype(evt.target.value);
  };

  const handleItemCreate = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setBarcodeErr(true);
      setBarcodeErrMsg('Currently only 13 Digit EAN Barcodes are supported.');
      return;
    }
    axios.post('/api/items', {
      name, categoryId: subCategoryId, barcode, packtype, packmat, origin, score
    }).then((res) => {
      if (res.status === 200) {
        handleClose();
      }
    }).catch((err) => {
      console.log(err);
      handleClose();
    });
  };

  const clearState = () => {
    setName('');
    setCategoryId('');
    setSubCategoryId('');
    setPackmat('');
    setPacktype('');
    setOrigin('');
    setScore('');
    handleClose();
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={clearState} aria-labelledby="form-dialog-title">
        <form onSubmit={handleItemCreate}>
          <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide the following information to add an item to the database:
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
              required
              margin="dense"
              label="Name"
              type="text"
              fullWidth
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
              required
              margin="dense"
              id="origin"
              label="Origin"
              type="text"
              fullWidth
              onChange={e => setOrigin(e.target.value)}
            />
            <Typography gutterBottom className={classes.scoreText}>
              Score:
            </Typography>
            <Slider
              required
              defaultValue={10}
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              onChange={e => setScore(e.target.innerText)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={clearState} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Item
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
  handleClose: PropTypes.func.isRequired
};
