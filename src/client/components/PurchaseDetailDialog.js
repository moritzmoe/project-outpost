import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, Typography, IconButton, DialogContent, TextField, DialogActions,
  Button, Grid, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ItemCard from './ItemCard';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
}));

export default function PurchaseDetailDialog(props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const {
    isOpen, id, handleClose
  } = props;

  useEffect(() => {
    if (isOpen) {
    // const found = purchases.filter(item => item.id === id);
    // setItems(found[0].Items);
    // console.log(items);
      axios.get(`/api/purchases/${id}`).then((res) => {
        setItems(res.data);
        console.log(res.data);
      });
    }
  }, [isOpen]);

  const handleItemDetails = () => {
    console.log('NTBD');
  };


  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title" />
        <Grid container>
          <Grid item xs={1} align="right">
            {id}
          </Grid>
          <Grid container justify="center" spacing={2}>
            {items.map(value => (
              <ItemCard item={value} openDetails={handleItemDetails} />
            ))}
          </Grid>
          <Grid item xs={1} align="right">
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0, marginTop: 31 }} />
        </Grid>
      </Dialog>
    </div>
  );
}

PurchaseDetailDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};
