import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";
import Icon_Helper from "../helper/Icon_Helper";

const Scanner = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const controlsRef = useRef(null);
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [mode, setMode] = useState(null);
  const [typedTicketId, setTypedTicketId] = useState("");

  useEffect(() => {
    if (mode !== "scan") return;

    const hints = new Map();
    const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128, BarcodeFormat.CODE_39];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

    const codeReader = new BrowserMultiFormatReader(hints, {
      delayBetweenScanAttempts: 100, // Faster scanning
    });

    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { min: 1280, ideal: 1920 },
            height: { min: 720, ideal: 1080 },
          },
        });

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        await videoRef.current.play();

        const controls = await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
          if (result && !scanned) {
            const scannedText = result.getText();
            setScanned(true);
            playBeep();
            stopCamera();
            navigate("/scanned-result", { state: { scannedText } });
          }
        });

        controlsRef.current = controls;
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };

    startScanner();

    return () => {
      stopCamera();
    };
  }, [scanned, navigate, mode]);

  const stopCamera = () => {
    if (controlsRef.current) controlsRef.current.stop();
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const playBeep = () => {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
  };

  const handleSubmitTyped = () => {
    if (typedTicketId.trim() !== "") {
      navigate("/scanned-result", { state: { scannedText: typedTicketId.trim() } });
    }
  };

  const handleBack = () => {
    stopCamera();
    setMode(null);
    setScanned(false);
    setTypedTicketId("");
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {mode === null && (
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setScanned(false);
              setMode("scan");
            }}
            className="px-6 py-2 rounded font-medium text-white bg-blue-500 hover:bg-blue-600"
          >
            Scan
          </button>
          <button
            onClick={() => {
              stopCamera();
              setMode("type");
            }}
            className="px-6 py-2 rounded font-medium text-white bg-green-500 hover:bg-green-600"
          >
            Type
          </button>
        </div>
      )}

      {mode === "scan" && (
        <>
          <button onClick={handleBack} className="mb-4 px-4 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition">
            ← Back
          </button>
          <div className="bg-white rounded shadow-xl p-6 w-full max-w-lg text-center">
            <h2 className="mb-4 flex flex-row items-center justify-center font-semibold text-xl gap-2">
              <Icon_Helper.Ticket_Icon /> Show Your Ticket & Hold Steady
            </h2>
            <div className="border-4 border-indigo-400 border-dashed animate-pulse p-2 rounded-xl">
              <video ref={videoRef} className="w-full rounded" />
            </div>
            <div className="mt-4 text-gray-600">Waiting for scan...</div>
          </div>
        </>
      )}

      {mode === "type" && (
        <div className="flex flex-col gap-4 items-center w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700">Enter Ticket ID Manually</h2>
          <input type="text" value={typedTicketId} onChange={(e) => setTypedTicketId(e.target.value)} placeholder="Enter Ticket ID" className="w-full px-4 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400" />
          <button onClick={handleSubmitTyped} disabled={!typedTicketId.trim()} className={`px-6 py-2 rounded w-full text-white ${typedTicketId.trim() ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"}`}>
            Submit
          </button>
          <button onClick={handleBack} className="text-sm text-gray-500 hover:text-gray-700 underline mt-2">
            ← Back to options
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
