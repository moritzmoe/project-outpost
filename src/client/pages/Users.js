import React, { useEffect, useState } from 'react';
import { useStoreValue, useSetStoreValue } from 'react-context-hook';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const setPageName = useSetStoreValue('pageName');
  const isAdmin = useStoreValue('isAdmin');

  useEffect(() => {
    setPageName('User Management');
    axios.get('/api/users').then((res) => { setUsers(res.data); console.log(res); });
  }, []);

  return (
    <div>
      <Container>
        { isAdmin ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>E-Mail</TableCell>
                  <TableCell>Firstname</TableCell>
                  <TableCell>Lastname</TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={user.isAdmin}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : ''}
      </Container>
    </div>
  );
}
