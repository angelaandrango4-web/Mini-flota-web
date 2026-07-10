import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

type TableProps = ComponentPropsWithoutRef<"table">;

export function Table({
  className = "",
  ...props
}: TableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Placa</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Año</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Estado</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {vehicles?.length === 0 && (
                <TableRow>
                    <TableCell
                    className="py-10 text-center text-slate-500"
                    colSpan={6}
                    >
                    No hay vehículos registrados.
                    </TableCell>
                </TableRow>
                )}

            {vehicles?.map((vehicle) => (
            <TableRow key={vehicle.id}>
                <TableCell className="font-semibold text-slate-900">
                {vehicle.plate}
                </TableCell>

                <TableCell>{vehicle.brand}</TableCell>

                <TableCell>{vehicle.model}</TableCell>

                <TableCell>{vehicle.year}</TableCell>

                <TableCell>
                {vehicle.capacity_kg} kg
                </TableCell>

                <TableCell>
                <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    vehicle.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                >
                    {vehicle.status === "active"
                    ? "Activo"
                    : "Inactivo"}
                </span>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
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

type TableBodyProps = ComponentPropsWithoutRef<"tbody">;

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
      className={`px-6 py-4 text-sm font-semibold text-slate-600 ${className}`}
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
      className={`px-6 py-4 text-slate-700 ${className}`}
      {...props}
    />
  );
}