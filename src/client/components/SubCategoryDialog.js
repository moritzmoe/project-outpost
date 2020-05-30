import React, { useState, useEffect } from 'react';
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

export default function SubCategoryDialog(props) {
  const classes = useStyles();

  const {
    isOpen, id, handleClose, handleSave, handleDelete
  } = props;

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);


  // useEffect(() => {
  //  axios.get(`/api/categories/${id}`).then((res) => {
  //    setName(res.data[0].name);
  //    // setCategoryId(res.data[0].SubCategory.parentCat);
  //  });
  // }, [isOpen]);

  useEffect(() => {
    axios.get('/api/categories').then((res) => { setCategories(res.data); });
  }, []);


  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title" />
        {id}
        {console.log('Id in dialog:', id)}
      </Dialog>
    </div>
  );
}

SubCategoryDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};
