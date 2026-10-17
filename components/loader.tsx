import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 bg-background/50 container">
      <Loader2 className="text-growth animate-spin" size={48} />
    </div>
  );
};

export default Loader;
