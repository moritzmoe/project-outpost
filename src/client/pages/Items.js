import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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
import BarcodeScanner from '../components/BarcodeScanner';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minWidth: 320
  },
  control: {
    padding: theme.spacing(2)
  },
  container: {
    marginTop: theme.spacing(10)
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
  }

}));


export default function Items() {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [idToDelete, setIdToDelete] = useState(0);
  const [nameToDelete, setNameToDelete] = useState('');
  const [open, setOpen] = useState(false);
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

  function showBarcodeScannerResult(scanResult) {
    setBarcode(scanResult);
    console.log(`Scanner Result: ${barcode}`);
    setOpenBarcode(false);
    setOpen(true);
  }

  useEffect(() => {
    axios.get('/api/items').then((res) => { setItems(res.data); });
  }, []);

  const handleClickOpen = () => {
    setOpenBarcode(true);
  };

  const handleBarcodeDialogClose = () => {
    setOpenBarcode(false);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleDeleteAlertOpen = (id, itemName) => {
    setIdToDelete(id);
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
  };


  return (
    <div>
      <Container className={classes.container}>
        <Grid container justify="center" spacing={2}>
          {items.map(value => (
            <Grid key={value.id} item>
              <Card className={classes.root}>
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
                  <Typography variant="body2" component="p">
                    {value.packtype}
                    <br />
                    {value.packmat}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.deleteButton}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteAlertOpen(value.id, value.name)}
                  >
                    Delete
                  </Button>
                </CardActions>
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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                id="barcode"
                label="EAN-13 Barcode"
                type="number"
                fullWidth
                disabled
              />
              <TextField
                required
                margin="dense"
                id="itemname"
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
              <TextField
                required
                margin="dense"
                id="score"
                label="Score"
                type="text"
                fullWidth
                onChange={e => setScore(e.target.value)}
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
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
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
    </div>
  );
}
