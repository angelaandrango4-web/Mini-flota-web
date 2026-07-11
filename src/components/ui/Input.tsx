import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

export function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        w-full
        rounded-xl
        border border-slate-300
        bg-white
        px-3.5 py-2.5
        text-sm text-slate-900
        shadow-sm
        outline-none
        transition-all duration-200
        placeholder:text-slate-400
        hover:border-slate-400
        focus:border-amber-400
        focus:ring-4
        focus:ring-amber-300/30
        disabled:cursor-not-allowed
        disabled:bg-slate-100
        disabled:text-slate-500
        ${className}
      `}
      {...props}
    />
  );
}