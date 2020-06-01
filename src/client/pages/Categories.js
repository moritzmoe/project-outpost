import React, { useState, useEffect, forwardRef } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

import Container from '@material-ui/core/Container';


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

import SubCategoryDialog from '../components/SubCategoryDialog';

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
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
  },
  search: {
    margin: theme.spacing(2)
  }
}));

export default function Categories() {
  const classes = useStyles();
  const setPageName = useSetStoreValue('pageName');
  const isAdmin = useStoreValue('isAdmin');

  const [id, setId] = useState(0);
  const [catName, setCatName] = useState('');
  const [subCat, setSubCat] = useState([]);
  const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);

  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id', editable: 'never' },
      { title: 'Name', field: 'name' },
    ],
    data: [
    ],
  });

  useEffect(() => {
    axios.get('/api/categories').then((res) => {
      setState((prevState) => {
        const data = [...prevState.data];
        res.data.forEach((item) => { data.push(item); });
        return { ...prevState, data };
      });
    });
    setPageName('Category Database');
  }, []);

  const handleRowClick = (event, rowData) => {
    // axios.get(`/api/categories/subCats/${rowData.id}`).then((res) => {
    //  console.log(res.data);
    setId(parseInt(rowData.id, 10));
    setCatName(rowData.name);
    setOpenSubCategoryDialog(true);
    // });
  };

  const handleClose = () => {
    setOpenSubCategoryDialog(false);
    setId('');
    setCatName('');
  };

  return (
    <div>
      {isAdmin ? (
        <Container>
          <MaterialTable
            icons={tableIcons}
            onRowClick={handleRowClick}
            title="Categories"
            columns={state.columns}
            data={state.data}
            editable={{
              onRowAdd: newData => new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const { parentCat, name, co2 } = newData;
                  console.log('newdata', newData);
                  axios.post('/api/categories/subCats', {
                    parentCat,
                    name,
                    co2
                  }).then((res) => {
                    if (res.status === 200) {
                      const { newEntry } = res.data;
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data.push({ id: res.data.id, name: newData.name });
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
                  const { name } = newData;
                  axios.put(`/api/categories/${oldData.id}`, {
                    name
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
                  axios.delete(`/api/categories/${oldData.id}`).then((res) => {
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
          <SubCategoryDialog
            isOpen={openSubCategoryDialog}
            id={id}
            catName={catName}
            handleClose={handleClose}
          />
        </Container>
      ) : ''}
    </div>
  );
}
