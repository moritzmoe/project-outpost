import React, { useState, useEffect } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

// Only for testing purposes
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';

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

  const [state, setState] = React.useState({});

  useEffect(() => {
    setPageName('Category Database');
  }, []);

  return (
    <div>
      {isAdmin ? (
        <Container>
          <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            editable={{
              onRowAdd: newData => new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
              onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
              onRowDelete: oldData => new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            }}
          />
        </Container>
      ) : ''}
    </div>
  );
}
