import React from "react";
import { Loader2 } from "lucide-react"; // spinner icon

const Loadingoverlay = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default Loadingoverlay;
