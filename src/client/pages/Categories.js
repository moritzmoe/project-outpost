import React, { useState, useEffect } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
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

  useEffect(() => {
    setPageName('Category Database');
  }, []);

  return (
    <div>
      {isAdmin ? (
        <Container>
          <Button variant="contained" color="primary">
            Primary
          </Button>
        </Container>
      ) : ''}
    </div>
  );
}
