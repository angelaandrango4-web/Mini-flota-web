import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";

import type { Vehicle } from "./vehicleTypes";

type VehicleTableProps = {
  vehicles: Vehicle[];
};

export function VehicleTable({
  vehicles,
}: VehicleTableProps) {
  return (
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
        {vehicles.length === 0 && (
          <TableRow>
            <TableCell
              className="py-10 text-center text-slate-500"
              colSpan={6}
            >
              No hay vehículos registrados.
            </TableCell>
          </TableRow>
        )}

        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-semibold text-slate-900">
              {vehicle.plate}
            </TableCell>

            <TableCell>{vehicle.brand}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.year}</TableCell>
            <TableCell>{vehicle.capacity_kg} kg</TableCell>

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
  );
}