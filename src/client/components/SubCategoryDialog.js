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

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
}));

export default function SubCategoryDialog(props) {
  const classes = useStyles();

  const {
    isOpen, id, catName, handleClose// , handleSave, handleDelete
  } = props;

  // const [name, setName] = useState('');
  // const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id', editable: 'never' },
      { title: 'ParentCat', field: 'parentCat', editable: 'never' },
      { title: 'Name', field: 'name' },
      { title: 'Co2', field: 'co2' },
    ],
    data: [
    ],
  });


  // useEffect(() => {
  //  axios.get(`/api/categories/${id}`).then((res) => {
  //    setName(res.data[0].name);
  //    // setCategoryId(res.data[0].SubCategory.parentCat);
  //  });
  // }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      axios.get(`/api/categories/subCats/${id}`).then((res) => {
        setState((prevState) => {
          const data = [...prevState.data];
          res.data.forEach((item) => { data.push(item); });
          return { ...prevState, data };
        });
      });
    }
  }, [isOpen]);

  const handleCloseClearState = () => {
    handleClose();
    setState({
      columns: [
        { title: 'ID', field: 'id', editable: 'never' },
        { title: 'ParentCat', field: 'parentCat', editable: 'never' },
        { title: 'Name', field: 'name' },
        { title: 'Co2', field: 'co2' },
      ],
      data: [
      ],
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
          <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0, marginTop: 31 }}>
            <MaterialTable
              icons={tableIcons}
              title={`${catName}${id}`}
              columns={state.columns}
              data={state.data}
              editable={{
                onRowAdd: newData => new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    const { name, co2 } = newData;
                    const parentCat = id;
                    axios.post('/api/categories/subCats', {
                      parentCat, name, co2
                    }).then((res) => {
                      if (res.status === 200) {
                        const { newEntry } = res.data;
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data.push({
                            id: res.data.id, parentCat, name: newData.name, co2: newData.co2
                          });
                          return { ...prevState, data };
                        });
                      }
                    }).catch((err) => {
                      console.log(err);
                    });
                  }, 600);
                }),
                onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    const { name, co2 } = newData;
                    axios.put(`/api/categories/subCats/${oldData.id}`, {
                      name, co2
                    }).then((res) => {
                      if (res.status === 200) {
                        if (oldData) {
                          setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                        }
                      }
                    }).catch((err) => {
                      console.log(err);
                    });
                  }, 600);
                }),
                onRowDelete: oldData => new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    axios.delete(`/api/categories/subCats/${oldData.id}`).then((res) => {
                      if (res.status === 200) {
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        });
                      }
                    }).catch((err) => {
                      console.log(err);
                    });
                  }, 600);
                }),
              }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

SubCategoryDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  catName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
