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
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

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

export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalQueryCount, setTotalQueryCount] = useState(0);
  const setPageName = useSetStoreValue('pageName');
  const isAdmin = useStoreValue('isAdmin');

  let cancel = '';

  const handleChangePage = (event, newPage) => {
    const offset = rowsPerPage * (newPage);
    axios.get(`api/users?limit=${rowsPerPage}&offset=${offset}`).then((res) => {
      setUsers(res.data);
      setPage(newPage);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    const offset = newRowsPerPage * (page);
    axios.get(`api/users?limit=${newRowsPerPage}&offset=${offset}`).then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    setPageName('User Management');
    axios.get('/api/users/totalUserCount').then((res) => {
      setTotalUserCount(res.data);
      axios.get(`api/users?limit=${rowsPerPage}&offset=0`).then((response) => {
        setUsers(response.data);
      });
    });
  }, []);

  const handleAdminChange = (id) => {
    axios.post('/api/users/changeAdmin', { id })
      .then((res) => {
        if (res.status === 200) {
          if (!searchQuery) {
            const offset = rowsPerPage * (page);
            axios.get(`api/users?limit=${rowsPerPage}&offset=${offset}`).then((response) => {
              setUsers(response.data);
            });
          } else {
            axios.get(`api/users?limit=${rowsPerPage}&offset=0&q=${searchQuery}`).then((response) => {
              setUsers(response.data);
            });
          }
        }
      });
  };

  const handleSearchInputChange = (evt) => {
    const query = evt.target.value;
    setSearchQuery(query);
  };

  const fetchSearchResults = (query) => {
    if (cancel) {
      cancel.cancel();
    }

    cancel = axios.CancelToken.source();

    axios.get(`/api/users?limit=${rowsPerPage}&offset=0&q=${query}`, { cancelToken: cancel.token, })
      .then((res) => {
        setUsers(res.data);
        axios.get(`/api/users/totalQueryCount?q=${query}`, { cancelToken: cancel.token })
          .then((response) => {
            setTotalQueryCount(parseInt(response.data, 10));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <Container className={classes.container}>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Search by E-Mail or Lastname"
            variant="outlined"
            className={classes.search}
            onChange={handleSearchInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
        { isAdmin && users ? (
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
                  <TableRow key={user.name}>
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={user.isAdmin}
                        onChange={() => handleAdminChange(user.id)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                { !searchQuery ? (
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      colSpan={3}
                      count={totalUserCount}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </TableRow>

                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      {totalQueryCount > rowsPerPage ? (
                        `Fetched ${totalQueryCount} Results. Showing only ${rowsPerPage}.`
                      ) : (`${totalQueryCount} Result(s).`)}
                    </TableCell>
                  </TableRow>
                )}
              </TableFooter>
            </Table>
          </TableContainer>
        ) : ''}
      </Container>
    </div>
  );
}
