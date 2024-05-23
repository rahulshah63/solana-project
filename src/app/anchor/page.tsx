"use client";

import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { callHelloProgram, callHelloAnchorProgram } from "../../anchorClient";

import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import Popup from "../../Popup";

const AnchorPage: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [status, setStatus] = useState<string>("");
  const [status2, setStatus2] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string>("");
  const [resultUrl2, setResultUrl2] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(true);

  useEffect(() => {
    // Show popup when page is displayed
    setShowPopup(true);
  }, []);

  const handleHelloClick = async () => {
    if (!connected) {
      setStatus("Wallet not connected");
      return;
    }

    setStatus("Loading...");

    try {
      if(!wallet) throw new Error('Wallet not connected')
      const result = await callHelloProgram(wallet, connection);
      setStatus("Successful Execution");
      setResultUrl(`https://solscan.io/tx/${result}?cluster=devnet`);
    } catch (err: any) {
      setStatus(`Execution failed: ${err.message}`);
    }
  };
  const handleHelloClick2 = async () => {
    if (!connected) {
      setStatus2("Wallet not connected");
      return;
    }

    setStatus2("Loading...");

    try {
      if(!wallet) throw new Error('Wallet not connected')
      const result = await callHelloAnchorProgram(wallet, connection);
      setStatus2("Successful Execution");
      setResultUrl2(`https://solscan.io/tx/${result}?cluster=devnet`);
    } catch (err: any) {
      setStatus2(`Execution failed: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-4">
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Anchor Program execution
        </h1>
        {/* <WalletMultiButton className="mb-4" /> */}
        <button
          onClick={handleHelloClick}
          disabled={!connected}
          className="relative w-full disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Hello (Run Program)
        </button>
      </div>
      {status && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md shadow-inner max-w-md w-full overflow-auto">
          <p className="text-center text-sm text-gray-600 break-all">
            {status}
          </p>
        </div>
      )}
      {resultUrl && (
        <div className="mt-4 p-2  max-w-md w-full overflow-auto">
          <p className="text-left text-sm text-gray-600 break-all">
            <p className="text-left">Execution Result</p>
            <a
              href={resultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {resultUrl}
            </a>
          </p>
        </div>
      )}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Hello Anchor (Run Program)
        </h1>
        {/* <WalletMultiButton className="mb-4" /> */}
        <button
          onClick={handleHelloClick2}
          disabled={!connected}
          className="relative w-full disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Hello Anchor (Run Program)
        </button>
      </div>
      {status2 && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md shadow-inner max-w-md w-full overflow-auto">
          <p className="text-center text-sm text-gray-600 break-all">
            {status2}
          </p>
        </div>
      )}
      {resultUrl2 && (
        <div className="mt-4 p-2  max-w-md w-full overflow-auto">
          <p className="text-left text-sm text-gray-600 break-all">
            <p className="text-left">Execution Result</p>
            <a
              href={resultUrl2}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {resultUrl2}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AnchorPage;
