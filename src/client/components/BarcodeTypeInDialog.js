// This is just a utility component
// It can be used for development on a machine without camera to read in a barcode.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  TextField, Button
} from '@material-ui/core';


export default function BarcodeTypeInDialog(props) {
  const { isOpen, barcodeTypeInResult, handleClose } = props;
  const [barcode, setBarcode] = useState('');
  const [barcodeErr, setBarcodeErr] = useState(false);
  const [barcodeErrMsg, setBarcodeErrMsg] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (barcode.length !== 13) {
      setBarcodeErr(true);
      setBarcodeErrMsg('Currently only 13 Digit EAN Barcodes are supported.');
      return;
    }
    barcodeTypeInResult(barcode);
    setBarcodeErr(false);
    handleClose();
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <form on onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Type in Barcode</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sadly we could not detect a camera :(
            </DialogContentText>
            <TextField
              error={barcodeErr}
              helperText={barcodeErrMsg}
              required
              margin="dense"
              label="EAN-13 Barcode"
              type="text"
              fullWidth
              onChange={e => setBarcode(e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add Item
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}


BarcodeTypeInDialog.propTypes = {
  barcodeTypeInResult: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};
