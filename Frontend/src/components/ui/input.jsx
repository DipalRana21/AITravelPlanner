import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      {...props}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-700 bg-[#1f2937] px-4 py-2 text-base text-white placeholder:text-gray-400 shadow-sm outline-none transition-all duration-300",
        "focus:ring-2 focus:ring-neon-pink focus:border-neon-pink focus:shadow-[0_0_10px_#ff4ecb]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    />
  );
});
Input.displayName = "Input";

export { Input };
