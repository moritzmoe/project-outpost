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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalQueryCount, setTotalQueryCount] = useState(0);

  let cancel = '';

  const {
    isOpen, itemClick, handleClose// , handleSave, handleDelete
  } = props;

  useEffect(() => {
    console.log('initial', items);
  }, [isOpen]);

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  const handleItemClick = (id) => {
    let barcode;
    console.log(id);
    items.map((item) => {
      if (item.id === id) {
        barcode = item.barcode;
      }
    });
    itemClick(barcode);
  };

  const handleCloseClearState = () => {
    handleClose();
  };

  /*
  const handleSearch = (e) => {
    e.preventDefault();
    const itemId = document.getElementById('itemSearchField').value;
    axios.get(`/api/items/${itemId}`).then((res) => {
      setItems(res.data);
      console.log(res.data[0]);
    });
  };
  */

  const handleSearchInputChange = (evt) => {
    evt.preventDefault();
    const query = evt.target.value;
    setSearchQuery(query);
  };

  const fetchSearchResults = (query) => {
    if (cancel) {
      cancel.cancel();
    }
    console.log('Query:', query);
    cancel = axios.CancelToken.source();
    axios.get(`/api/items?limit=${rowsPerPage}&offset=0&q=${query}`, { cancelToken: cancel.token, })
      .then((res) => {
        setItems(res.data);
        console.log('Res.data:', res.data);
        axios.get(`/api/items/totalQueryCount?q=${query}`, { cancelToken: cancel.token })
          .then((response) => {
            setTotalQueryCount(parseInt(response.data, 10));
          });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('Items:', items);
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
          <form className={classes.root} noValidate autoComplete="off" onChange={handleSearchInputChange}>
            <TextField id="itemSearchField" label="Suchen" variant="outlined" />
          </form>
          <Grid container justify="center" spacing={2}>
            {items.map(value => (
              <ItemCard item={value} openDetails={handleItemClick} />
            ))}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

ItemSearchDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  itemClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
