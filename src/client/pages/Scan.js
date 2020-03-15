import React from 'react';
import BarcodeScanner from '../components/BarcodeScanner';

function showBarcodeScannerResult(result) {
  console.log(`Scanner Result: ${result}`);
}

const Scan = () => (
  <div>
    <BarcodeScanner callback={showBarcodeScannerResult} stopOnDetect stopOnClick />

  </div>
);

export default Scan;
