import React, { useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  const webcamRef = useRef(null);

  const handleDetected = useCallback((result) => {
    if (result && result.codeResult && result.codeResult.code) {
      onDetected(result.codeResult.code);
    }
  }, [onDetected]);

  useEffect(() => {
    if (webcamRef.current) {
      const track = webcamRef.current.stream;

      Quagga.init({
        inputStream: {
          type: 'LiveStream',
          target: webcamRef.current.video,
          constraints: {
            facingMode: 'environment'
          }
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader']
        }
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected(handleDetected);

      return () => {
        Quagga.offDetected(handleDetected);
        Quagga.stop();
        if (track) track.stop();
      };
    }
  }, [webcamRef, handleDetected]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default BarcodeScanner;
