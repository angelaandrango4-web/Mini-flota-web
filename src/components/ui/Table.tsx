import type { ComponentPropsWithoutRef } from "react";

type TableProps = ComponentPropsWithoutRef<"table">;

export function Table({
  className = "",
  ...props
}: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`w-full min-w-[800px] border-collapse text-left ${className}`}
        {...props}
      />
    </div>
  );
}

type TableHeaderProps =
  ComponentPropsWithoutRef<"thead">;

export function TableHeader({
  className = "",
  ...props
}: TableHeaderProps) {
  return (
    <thead
      className={`border-b border-slate-800 bg-slate-950 ${className}`}
      {...props}
    />
  );
}

type TableBodyProps =
  ComponentPropsWithoutRef<"tbody">;

export function TableBody({
  className = "",
  ...props
}: TableBodyProps) {
  return (
    <tbody
      className={`divide-y divide-slate-200 ${className}`}
      {...props}
    />
  );
}

type TableRowProps = ComponentPropsWithoutRef<"tr">;

export function TableRow({
  className = "",
  ...props
}: TableRowProps) {
  return (
    <tr
      className={`transition-colors odd:bg-white even:bg-slate-50/60 hover:bg-amber-50 ${className}`}
      {...props}
    />
  );
}

type TableHeadProps = ComponentPropsWithoutRef<"th">;

export function TableHead({
  className = "",
  ...props
}: TableHeadProps) {
  return (
    <th
      className={`whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300 ${className}`}
      {...props}
    />
  );
}

type TableCellProps = ComponentPropsWithoutRef<"td">;

export function TableCell({
  className = "",
  ...props
}: TableCellProps) {
  return (
    <td
      className={`whitespace-nowrap px-6 py-4 text-sm text-slate-700 ${className}`}
      {...props}
    />
  );
}