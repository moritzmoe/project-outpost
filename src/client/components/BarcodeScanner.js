import React, { useEffect } from 'react';
import Quagga from 'quagga';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

let barcodeScannerProps;
let scannerIsRunning;

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scanner: {
    '& canvas': {
      display: 'none',
    }
  }
});

function quaggaCallback(data) {
  if (data && data.codeResult && data.codeResult.code) {
    const eanCode = data.codeResult.code;
    if (barcodeScannerProps.callback) { barcodeScannerProps.callback(eanCode); }
    if (barcodeScannerProps.stopOnDetect) {
      Quagga.stop();
      scannerIsRunning = false;
    }
  }
}

function initQuagga() {
  Quagga.init({
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: document.querySelector('#barcode-scanner') // Or '#yourElement' (optional)
    },
    decoder: {
      readers: ['ean_reader']
    },
    frequency: 15,
  }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    Quagga.start();
    scannerIsRunning = true;
  });
  Quagga.onDetected(quaggaCallback);
}

function handleScannerOnClick() {
  if (barcodeScannerProps.stopOnClick) {
    if (scannerIsRunning) {
      Quagga.stop();
      scannerIsRunning = false;
    } else {
      initQuagga();
    }
  }
}

const BarcodeScanner = (props) => {
  const classes = useStyles();
  useEffect(() => {
    if (props) { barcodeScannerProps = props; }
    scannerIsRunning = false;
    initQuagga();
  }, []);


  return (
    <div>
      <Box className={classes.box} onClick={handleScannerOnClick}>
        <div id="barcode-scanner" className={classes.scanner} />
      </Box>
    </div>
  );
};

export default BarcodeScanner;
