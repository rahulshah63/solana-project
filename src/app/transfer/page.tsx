"use client";
import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import Popup from "../../Popup";

const TransferPage: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

  const [destination, setDestination] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(true);

  useEffect(() => {
    // Show popup when page is displayed
    setShowPopup(true);
  }, []);

  const handleTransfer = async () => {
    if (!connected) {
      setStatus("Wallet not connected");
      return;
    }

    try {
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      if (isNaN(lamports) || lamports <= 0) {
        setStatus("Please enter a valid amount");
        return;
      }

      setIsLoading(true);
      const recipient = new PublicKey(destination);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: recipient,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      setStatus(`https://solscan.io/tx/${signature}?cluster=devnet`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">SOLを送付</h1>
        <label className="block mb-4">
          <span className="text-gray-700">Destination address:</span>
          <input
            type="text"
            className="mt-1 block text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Amount to send (SOL):</span>
          <input
            type="text"
            className="mt-1 block text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button
          onClick={handleTransfer}
          disabled={isLoading || !connected}
          className="relative w-full bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-10 w-10 text-white absolute inset-0 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Send"
          )}
        </button>
      </div>
      {status && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md shadow-inner max-w-md w-full overflow-auto">
          <p className="text-left text-2xl text-black">Result</p>
          <a
            href={status}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            {status}
          </a>
        </div>
      )}
    </div>
  );
};

export default TransferPage;
