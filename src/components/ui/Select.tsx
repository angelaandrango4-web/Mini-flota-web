import type { ComponentPropsWithoutRef } from "react";

type SelectProps = ComponentPropsWithoutRef<"select">;

export function Select({
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}