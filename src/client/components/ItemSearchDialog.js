import {
  Dialog, DialogTitle,
  Grid, IconButton, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// import EditIcon from '@material-ui/icons/Edit';
import ItemCard from './ItemCard';


const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  bottomSpacing: {
    bottom: theme.spacing(2)
  },
}));

export default function ItemSearchDialog(props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  let cancel = '';

  const {
    isOpen, itemClick, handleClose// , handleSave, handleDelete
  } = props;

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [isOpen]);

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  const handleItemClick = (id) => {
    let barcode;
    items.map((item) => {
      if (item.id === id) {
        ({ barcode } = item);
      }
    });
    itemClick(barcode);
  };

  const handleCloseClearState = () => {
    handleClose();
    setSearchQuery('');
    setItems([]);
  };

  const handleSearchInputChange = (evt) => {
    evt.preventDefault();
    const query = evt.target.value;
    setSearchQuery(query);
  };

  const fetchSearchResults = (query) => {
    if (cancel) {
      cancel.cancel();
    }
    cancel = axios.CancelToken.source();
    axios.get(`/api/items?limit=5&offset=0&q=${query}`, { cancelToken: cancel.token, })
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
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
          <Grid item xs={12} align="right">
            <IconButton className={classes.closeButton} onClick={handleCloseClearState}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid container justify="center" spacing={3}>
            <Grid item>
              <form className={classes.root} noValidate autoComplete="off" onChange={handleSearchInputChange}>
                <TextField id="itemSearchField" className={classes.bottomSpacing} label="Suchen" variant="outlined" />
              </form>
            </Grid>
          </Grid>
          <Grid container justify="center" className={classes.bottomSpacing} spacing={2}>
            {items.map(value => (
              <ItemCard key={value} item={value} openDetails={handleItemClick} />
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
