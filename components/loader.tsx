import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-4 bg-background/70 backdrop-blur-xs"
    >
      <Loader2 className="size-10 text-growth animate-spin" aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
