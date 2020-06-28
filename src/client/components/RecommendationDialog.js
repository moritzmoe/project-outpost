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


export default function RecommendationDialog(props) {
  const classes = useStyles();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [itemRec, setItemRec] = useState([]);
  const [items, setItems] = useState([]);
  const convertCo2ToScore = useStoreValue('co2Convert');
  const {
    isOpen, id, handleClose
  } = props;

  useEffect(() => {
    if (isOpen) {
      axios.get(`/api/items/${id}`).then((res) => {
        setItems(res.data);
        axios.get(`/api/recommendations/?score=${res.data[0].score}&subCategory=${res.data[0].categoryId}`).then((res2) => {
          setItemRec(res2.data);
        });
      });
    }
  }, [isOpen]);

  const handleRecClose = () => {
    handleClose();
  };

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
        onClose={handleRecClose}
      >
        <DialogTitle id="form-dialog-title" />
        <Grid container>
          <Grid item xs={12} align="right">
            <IconButton className={classes.closeButton} onClick={handleRecClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid container justify="center" spacing={3} />
        </Grid>
        <Grid item xs={10} align="center">
          <DialogContent>
            <Grid container>
              <Typography variant="h5" color="primary">Dein Einkauf:</Typography>
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
              <ItemUpdateDialog
                isOpen={openUpdate}
                id={itemId}
                handleClose={handleDetailClose}
                handleSave={handleItemsChange}
                handleDelete={handleItemsChange}
                noInput
              />
            </Grid>
            <Grid container>
              <Typography variant="h5" color="primary">Unsere Empfehlung:</Typography>
              <Grid container justify="center" spacing={2}>
                { itemRec.map(value => (
                  <ItemCard item={value} openDetails={handleItemDetails} />
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
        </Grid>
      </Dialog>
    </div>
  );
}

RecommendationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};
