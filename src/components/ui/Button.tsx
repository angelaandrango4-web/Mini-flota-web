import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export function Button({
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl
        bg-slate-900
        px-5 py-2.5
        text-sm font-semibold
        text-white
        shadow-sm
        transition-all duration-200
        hover:bg-slate-800
        hover:shadow-md
        active:scale-[0.98]
        focus:outline-none
        focus:ring-4
        focus:ring-amber-300/50
        disabled:cursor-not-allowed
        disabled:bg-slate-400
        disabled:shadow-none
        disabled:opacity-70
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}