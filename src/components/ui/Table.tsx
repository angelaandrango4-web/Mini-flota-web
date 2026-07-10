import type { ComponentPropsWithoutRef } from "react";

type TableProps = ComponentPropsWithoutRef<"table">;

export function Table({
  className = "",
  ...props
}: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table
        className={`w-full border-collapse text-left ${className}`}
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
      className={`bg-slate-50 ${className}`}
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
      className={`transition hover:bg-slate-50 ${className}`}
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
      className={`whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-600 ${className}`}
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
      className={`whitespace-nowrap px-6 py-4 text-slate-700 ${className}`}
      {...props}
    />
  );
}