import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";

const Scanner = () => {
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  const [scanLinePos, setScanLinePos] = useState(0);
  const animationRef = useRef();

  // Scan Line Animation
  useEffect(() => {
    if (!scanning) return;

    const animateScanLine = () => {
      setScanLinePos((prev) => (prev >= 100 ? 0 : prev + 1));
      animationRef.current = requestAnimationFrame(animateScanLine);
    };

    animationRef.current = requestAnimationFrame(animateScanLine);

    return () => cancelAnimationFrame(animationRef.current);
  }, [scanning]);

  const playBeep = () => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3");
    audio.play().catch(() => {});
  };

  useEffect(() => {
    if (!scanning) return;

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        },
        decoder: {
          readers: ["code_128_reader", "qrcode_reader"],
          multiple: false,
        },
        locate: true, // Keep true for QR and general use
        frequency: 25, // Good balance between speed & performance
        locator: {
          halfSample: true, // Improve performance without killing accuracy
          patchSize: "medium",
        },
      },
      (err) => {
        if (err) {
          console.error("Init error:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      if (data?.codeResult) {
        const { code } = data.codeResult;

        // Simple validation
        if (code.length >= 5) {
          setResult(code);
          playBeep();
          Quagga.stop();
          setScanning(false);
          cancelAnimationFrame(animationRef.current);
        }
      }
    });

    return () => {
      Quagga.stop();
      Quagga.offDetected();
    };
  }, [scanning]);

  const resetScanner = () => {
    setResult(null);
    setScanning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 font-sans">
      <div className="text-center mb-5 text-gray-800">
        <h2 className="flex items-center justify-center gap-2 text-2xl mb-2">
          <span className="text-3xl">📷</span> Scan Your Ticket
        </h2>
        <p className="text-gray-600 text-base">Align the barcode or QR code within the frame</p>
      </div>

      <div className="relative w-full max-w-md h-96 border-4 border-dashed border-green-500 rounded-lg overflow-hidden">
        <div ref={scannerRef} className="w-full h-full">
          {scanning && <div className="absolute left-0 w-full h-1 bg-green-500 z-10" style={{ top: `${scanLinePos}%` }} />}
        </div>

        {!scanning && result && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-5xl text-green-500 mb-2">✓</div>
              <p className="text-lg font-medium">Scanned Successfully!</p>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-full max-w-md text-center">
          <h3 className="text-lg font-semibold mb-2">Scanned Code:</h3>
          <p className="text-xl font-mono bg-gray-100 p-2 rounded break-all">{result}</p>
          <button onClick={resetScanner} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
