import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-40">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-[#FF004D] animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
