import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, Typography, IconButton, DialogContent, TextField, DialogActions,
  Button, Grid, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import ItemCard from './ItemCard';
import ItemUpdateDialog from './ItemUpdateDialog';

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
  const [createdDate, setCreatedDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [totalPurchaseScore, setTotalPurchaseScore] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [itemRec, setItemRec] = useState([]);
  const [itemRecScore, setItemRecScore] = useState(0);
  const [itemRecSubCategory, setItemRecSubcategory] = useState(0);
  const convertCo2ToScore = useStoreValue('co2Convert');

  const {
    isOpen, id, handleClose
  } = props;

  useEffect(() => {
    if (isOpen) {
      axios.get(`/api/purchases/${id}?expand=ITEMS&expand=PACKAGING&expand=SUBCATEGORY`).then((res) => {
        const sortedItems = res.data.Items;
        sortedItems.sort((a, b) => ((a.score > b.score) ? -1 : 1));
        setItems(sortedItems);
        setCreatedDate(new Date(res.data.createdAt));
        let totalScore = 0;
        res.data.Items.map((item) => {
          totalScore = parseInt(totalScore, 10) + parseInt(item.score, 10);
          console.log(item.score);
        });
        setTotalPurchaseScore(Math.floor(totalScore / convertCo2ToScore));
        setItemRecScore(sortedItems[0].score);
        setItemRecSubcategory(sortedItems[0].SubCategory.id);
      });
    }
  }, [isOpen]);

  const handleItemDetails = (passedId) => {
    axios.get(`/api/items/${passedId}`).then((res) => {
      setItemId(res.data[0].id);
      setOpenUpdate(true);
    });
  };

  const handleItemsChange = () => {
  };

  const handleDetailClose = () => {
    setOpenUpdate(false);
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
                Uhr
              </Typography>
            </Grid>
            <Grid item xs={5} align="right">
              <Typography variant="h4" color="primary">
                {totalPurchaseScore}
                {' Punkte'}
              </Typography>
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid container justify="center" spacing={2}>
              { items.map(value => (
                <ItemCard item={value} openDetails={handleItemDetails} openRec />
              ))}
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0, marginTop: 31 }} />
            <ItemUpdateDialog
              isOpen={openUpdate}
              id={itemId}
              handleClose={handleDetailClose}
              handleSave={handleItemsChange}
              handleDelete={handleItemsChange}
              noInput
            />
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
