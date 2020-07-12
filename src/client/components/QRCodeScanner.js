import QrReader from 'react-qr-reader';
import React, { useState, useEffect } from 'react';

let QRCodeScannerProps;

const QRCodeScanner = (props) => {
  const [result, setResult] = React.useState({
    result: 'No result'
  });

  useEffect(() => {
    if (props) { QRCodeScannerProps = props; }
  }, []);


  const handleScan = (data) => {
    if (data) {
      setResult({
        result: data
      });
      QRCodeScannerProps.callback({ result: data });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '300%' }}
      />
      <p>{result.result}</p>
    </div>
  );
};
export default QRCodeScanner;
