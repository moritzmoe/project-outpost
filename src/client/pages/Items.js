import React, { useState, useEffect } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { CardActionArea } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import BarcodeScanner from '../components/BarcodeScanner';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minWidth: 320
  },
  control: {
    padding: theme.spacing(2)
  },
  deleteButton: {
    color: theme.palette.getContrastText(red[400]),
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[700],
    },
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(3),
  },
  button: {
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
  }
}));


export default function Items() {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [id, setId] = useState(0);
  const [idToDelete, setIdToDelete] = useState(0);
  const [nameToDelete, setNameToDelete] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [packtype, setPacktype] = useState('');
  const [packmat, setPackmat] = useState('');
  const [origin, setOrigin] = useState('');
  const [score, setScore] = useState('');
  const [barcodeErr, setBarcodeErr] = useState(false);
  const [barcodeErrMsg, setBarcodeErrMsg] = useState('');
  const [openBarcode, setOpenBarcode] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [createdBy, setCreatedBy] = useState('');
  const [lastUpdatedBy, setLastUpdatedBy] = useState('');

  const setPageName = useSetStoreValue('pageName');
  const isAdmin = useStoreValue('isAdmin');

  function showBarcodeScannerResult(scanResult) {
    setBarcode(scanResult);
    console.log(`Scanner Result: ${barcode}`);
    setOpenBarcode(false);
    setOpenCreate(true);
  }

  useEffect(() => {
    axios.get('/api/items').then((res) => { setItems(res.data); });
    setPageName('Item Database');
  }, []);

  const handleClickOpen = () => {
    setOpenBarcode(true);
  };

  const handleBarcodeDialogClose = () => {
    setOpenBarcode(false);
  };

  const handleDetailsClose = () => {
    setOpenDetails(false);
  };

  const handleClose = () => {
    setOpenDetails(false);
    setOpenCreate(false);
    setBarcodeErr(false);
    setBarcodeErrMsg('');
    setBarcode('');
    setName('');
    setCategory('');
    setPacktype('');
    setPackmat('');
    setOrigin('');
    setScore('');
  };

  const handleItemDetails = (passedId) => {
    console.log('Handle Details called');
    axios.get(`/api/items/${passedId}`).then((res) => {
      setId(res.data[0].id);
      setBarcode(res.data[0].barcode);
      setName(res.data[0].name);
      setCategory(res.data[0].category);
      setPacktype(res.data[0].packtype);
      setPackmat(res.data[0].packmat);
      setOrigin(res.data[0].origin);
      setScore(res.data[0].score);
      setCreatedBy(res.data[0].createdBy);
      setLastUpdatedBy(res.data[0].lastUpdatedBy);
      setOpenDetails(true);
    });
  };

  const handleItemCreate = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setBarcodeErr(true);
      setBarcodeErrMsg('Currently only 13 Digit EAN Barcodes are supported.');
      return;
    }
    axios.post('/api/items', {
      name, category, barcode, packtype, packmat, origin, score
    }).then((res) => {
      if (res.status === 200) {
        axios.get('/api/items').then((response) => { setItems(response.data); });
        handleClose();
      }
    }).catch((err) => {
      console.log(err);
      handleClose();
    });
  };

  const handleItemChange = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setBarcodeErr(true);
      setBarcodeErrMsg('Currently only 13 Digit EAN Barcodes are supported.');
      return;
    }
    axios.put(`/api/items/${id}`, {
      name, category, barcode, packtype, packmat, origin, score
    }).then((res) => {
      if (res.status === 200) {
        axios.get('/api/items').then((response) => { setItems(response.data); });
        handleClose();
      }
    }).catch((err) => {
      console.log(err);
      handleClose();
    });
  };
  const handleDeleteAlertOpen = (passedId, itemName) => {
    setIdToDelete(passedId);
    setNameToDelete(itemName);
    setDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setDeleteAlert(false);
    setIdToDelete(0);
    setNameToDelete('');
  };

  const handleItemDelete = () => {
    axios.delete(`/api/items/${idToDelete}`).then((res) => {
      if (res.status === 200) {
        axios.get('/api/items').then((response) => { setItems(response.data); });
      }
    });
    handleDeleteAlertClose();
    handleDetailsClose();
  };


  return (
    <div>
      {isAdmin ? (
        <Container>
          <Grid container justify="center" spacing={2}>
            {items.map(value => (
              <Grid key={value.id} item>
                <Card className={classes.root}>
                  <CardActionArea onClick={() => handleItemDetails(value.id)}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {value.barcode}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {value.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {value.category}
                      </Typography>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="body2" component="p">
                            {value.packtype}
                            <br />
                            {value.packmat}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} align="right">
                          <Typography variant="h4" align="right" color="primary">
                            {value.score}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Fab color="primary" aria-label="add" className={classes.fab} variant="extended" onClick={handleClickOpen}>
            <AddIcon />
            Add Item
          </Fab>
          <Dialog open={openBarcode} onClose={handleBarcodeDialogClose}>
            <DialogTitle id="form-dialog-title">Scan Barcode</DialogTitle>
            <DialogContent>
              <BarcodeScanner callback={showBarcodeScannerResult} stopOnDetect stopOnClick />
            </DialogContent>
          </Dialog>
          <Dialog open={openDetails} onClose={handleDetailsClose}>
            <DialogTitle id="form-dialog-title">
              {name}
              <Typography color="textSecondary" variant="body2">
                ID:
                {' '}
                {id}
                {' '}
                Created by:
                {' '}
                {createdBy}
                {' '}
                Last changed by:
                {' '}
                {lastUpdatedBy}
                {' '}
              </Typography>
              <IconButton className={classes.closeButton} onClick={handleDetailsClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <form onSubmit={handleItemChange}>
              <DialogContent>
                <TextField
                  error={barcodeErr}
                  helperText={barcodeErrMsg}
                  value={barcode}
                  type="number"
                  fullWidth
                  required
                  margin="dense"
                  label="EAN-13 Barcode"
                  onChange={e => setBarcode(e.target.value)}
                />
                <TextField
                  value={name}
                  fullWidth
                  required
                  margin="dense"
                  label="Name"
                  onChange={e => setName(e.target.value)}
                />
                <TextField
                  value={category}
                  fullWidth
                  required
                  margin="dense"
                  label="Category"
                  onChange={e => setCategory(e.target.value)}
                />
                <TextField
                  value={packtype}
                  fullWidth
                  required
                  margin="dense"
                  label="Packaging Type"
                  onChange={e => setPacktype(e.target.value)}
                />
                <TextField
                  value={packmat}
                  fullWidth
                  required
                  margin="dense"
                  label="Packaging Material"
                  onChange={e => setPackmat(e.target.value)}
                />
                <TextField
                  value={origin}
                  fullWidth
                  required
                  margin="dense"
                  label="Origin"
                  onChange={e => setOrigin(e.target.value)}
                />
                <Typography gutterBottom className={classes.scoreText}>
                  Score:
                </Typography>
                <Slider
                  required
                  defaultValue={score}
                  step={1}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  onChange={e => setScore(e.target.innerText)}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.deleteButton}
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteAlertOpen(id, name)}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<EditIcon />}
                >
                  Save Changes
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <Dialog open={openCreate} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleItemCreate}>
              <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please provide the following information to add an item to the database:
                </DialogContentText>
                <TextField
                  error={barcodeErr}
                  helperText={barcodeErrMsg}
                  autoFocus
                  required
                  value={barcode}
                  margin="dense"
                  label="EAN-13 Barcode"
                  type="number"
                  fullWidth
                  disabled
                />
                <TextField
                  required
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  onChange={e => setName(e.target.value)}
                />
                <TextField
                  required
                  margin="dense"
                  id="itemcategory"
                  label="Category"
                  type="text"
                  fullWidth
                  onChange={e => setCategory(e.target.value)}
                />
                <TextField
                  required
                  margin="dense"
                  id="packtype"
                  label="Packaging Type"
                  type="text"
                  fullWidth
                  onChange={e => setPacktype(e.target.value)}
                />
                <TextField
                  required
                  margin="dense"
                  id="packmat"
                  label="Packaging Material"
                  type="text"
                  fullWidth
                  onChange={e => setPackmat(e.target.value)}
                />
                <TextField
                  required
                  margin="dense"
                  id="origin"
                  label="Origin"
                  type="text"
                  fullWidth
                  onChange={e => setOrigin(e.target.value)}
                />
                <Typography gutterBottom className={classes.scoreText}>
                  Score:
                </Typography>
                <Slider
                  required
                  defaultValue={10}
                  step={1}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  onChange={e => setScore(e.target.innerText)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Add Item
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <Dialog
            open={deleteAlert}
            onClose={handleDeleteAlertClose}
          >
            <DialogTitle id="alert-dialog-title">
              Delete
              {' '}
              {nameToDelete}
              ?
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleDeleteAlertClose} color="primary">
                Abort
              </Button>
              <Button onClick={handleItemDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      ) : ''}
    </div>
  );
}
