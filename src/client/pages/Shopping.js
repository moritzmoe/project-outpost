/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useSetStoreValue } from 'react-context-hook';
import BarcodeScanner from '../components/BarcodeScanner';

export default function Shopping() {
  const [result, setResult] = useState('');

  const setPageName = useSetStoreValue('pageName');

  useEffect(() => {
    setPageName('Shopping');
  }, []);

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
