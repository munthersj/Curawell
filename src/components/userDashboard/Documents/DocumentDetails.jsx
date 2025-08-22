import React from "react";

export default function DocumentDetails({ onClose, imageUrl }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#1D212836] bg-opacity-20"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed bg-white rounded-2xl shadow-lg w-[750px] h-[700px] max-w-4xl z-50 p-8 flex flex-col right-4 items-center justify-center">
        <button //fixed justify-start bg-white rounded-2xl shadow-lg w-[750px] h-[700px] max-w-4xl z-50 p-8 right-4
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <img
          src={imageUrl}
          alt="Document"
          className="max-w-full max-h-full rounded-lg object-contain"
        />
      </div>
    </div>
  );
}
