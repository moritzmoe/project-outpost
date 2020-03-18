import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import BarcodeScanner from '../components/BarcodeScanner';

export default function Shopping() {
  const [result, setResult] = useState('');

  function showBarcodeScannerResult(scanResult) {
    setResult(scanResult);
    console.log(`Scanner Result: ${result}`);
  }

  return (
    <Container maxWidth="sm">
      <h1>Shopping</h1>
      <p>{result}</p>
      <BarcodeScanner callback={showBarcodeScannerResult} stopOnDetect stopOnClick />
    </Container>
  );
}
