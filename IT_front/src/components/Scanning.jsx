import React, { useState } from 'react';
import BarcodeScanner from '../components/BroadCodeScanner';
import BarcodeSvg from '../components/BarcodeSvg';
; // Your existing Barcode component

const Scanning = () => {
  const [serialNumber, setSerialNumber] = useState('');

  const handleDetected = (code) => {
    setSerialNumber(code);
  };

  return (
    <div>
      <h1 className='mt-5'>فحص الباركود</h1>
      <p className='mt-4'>من فضلك افحص الباركود</p>
      <BarcodeScanner onDetected={handleDetected} />
      {serialNumber && (
        <div>
          <h2>Serial Number: {serialNumber}</h2>
          <BarcodeSvg serialNum={serialNumber} />
        </div>
      )}
    </div>
  );
};

export default Scanning;
