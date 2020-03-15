import React from 'react';
import BarcodeScanner from '../../components/BarcodeScanner';

function showBarcodeScannerResult(result) {
  console.log(`Scanner Result: ${result}`);
}

export default function Shopping() {
  return (
    <div>
      <h1>Shopping</h1>
      <BarcodeScanner callback={showBarcodeScannerResult} stopOnDetect stopOnClick />
    </div>
  );
}
