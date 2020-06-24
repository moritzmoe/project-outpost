import React, { useState, useEffect, forwardRef } from 'react';
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
// import EditIcon from '@material-ui/icons/Edit';
import ItemCard from './ItemCard';


const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
}));

export default function ItemSearchDialog(props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  const {
    isOpen, handleClose// , handleSave, handleDelete
  } = props;


  useEffect(() => {

  }, [isOpen]);

  const handleItemDetails = () => {
    console.log('Coming Soon');
  };

  const handleCloseClearState = () => {
    handleClose();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const itemId = document.getElementById('itemSearchField').value;
    axios.get(`/api/items/${itemId}`).then((res) => {
      setItems(res.data);
      console.log(res.data[0]);
    });
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpen}
        onClose={handleCloseClearState}
      >
        <DialogTitle id="form-dialog-title" />
        <Grid container>
          <Grid item xs={1} align="right">
            <IconButton className={classes.closeButton} onClick={handleCloseClearState}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSearch}>
            <TextField id="itemSearchField" label="Suchen" variant="outlined" />
          </form>
          <Grid container justify="center" spacing={2}>
            {items.map(value => (
              <ItemCard item={value} openDetails={handleItemDetails} />
            ))}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

ItemSearchDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
