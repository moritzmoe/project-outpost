import React, { useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';


export default function Shopping() {
  const [result, setResult] = useState('');

  function showBarcodeScannerResult(scanResult) {
    setResult(scanResult);
    console.log(`Scanner Result: ${result}`);
  }

  return (
    <div>
      <h1>Shopping</h1>
      <p>{result}</p>
      <BarcodeScanner callback={showBarcodeScannerResult} stopOnDetect stopOnClick />
    </div>
  );
}
