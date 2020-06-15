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
  const [createdDate, setCreatedDate] = useState([]);
  const [items, setItems] = useState([]);
  const {
    isOpen, id, handleClose
  } = props;

  useEffect(() => {
    if (isOpen) {
    // const found = purchases.filter(item => item.id === id);
    // setItems(found[0].Items);
    // console.log(items);
      axios.get(`/api/purchases/${id}?expand=ITEMS&expand=PACKAGING&expand=SUBCATEGORY`).then((res) => {
        setItems(res.data.Items);
        setCreatedDate(new Date(res.data.createdAt));
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
        <DialogTitle id="form-dialog-title">
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">
                Einkauf vom:
                {' '}
              </Typography>
              <Typography variant="h5" component="h2">
                {createdDate.getDate()}
                .
                {createdDate.getMonth() + 1}
                .
                {createdDate.getFullYear()}
              </Typography>
              <Typography variant="body2" component="h2">
                {createdDate.getHours()}
                :
                {(createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes()}
                {' '}
                h
              </Typography>
            </Grid>
            <Grid item xs={5} align="right">
              <Typography variant="h4" color="primary">
                {id}
                {'g'}
              </Typography>
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={5}>
              <Typography color="textSecondary" variant="body2">
                ID:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography color="textSecondary" variant="body2">
                {id}
                <br />
              </Typography>
            </Grid>
          </Grid>

        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid container justify="center" spacing={2}>
              { items.map(value => (
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

PurchaseDetailDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};
