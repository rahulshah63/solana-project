import React from "react";

const Popup = ({ onClose }: {onClose: () => void}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <p className="mb-6 text-center text-blue-600 text-2xl font-bold">Note</p>
        <p className="mb-4 text-center text-blue-500 text-lg">
        To avoid using actual gas money,
        </p>
        <p className="mb-4 text-center text-blue-500 text-lg">
          Make sure to run your wallet on devnet.
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
