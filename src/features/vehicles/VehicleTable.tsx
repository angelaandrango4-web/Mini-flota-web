import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";

import type { Driver } from "../drivers/driverTypes";
import { AssignDriverForm } from "./AssignDriverForm";
import type { Vehicle } from "./vehicleTypes";

type VehicleTableProps = {
  vehicles: Vehicle[];
  drivers: Driver[];
};

export function VehicleTable({
  vehicles,
  drivers,
}: VehicleTableProps) {
  const assignedDriverIds = new Set(
    vehicles
      .map((vehicle) => vehicle.driver?.id)
      .filter(
        (driverId): driverId is string =>
          Boolean(driverId),
      ),
  );

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
          <TableHead>Conductor</TableHead>
          <TableHead>Asignación</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {vehicles.length === 0 && (
          <TableRow>
            <TableCell
              className="py-10 text-center text-slate-500"
              colSpan={8}
            >
              No hay vehículos registrados.
            </TableCell>
          </TableRow>
        )}

        {vehicles.map((vehicle) => {
          const availableDrivers = drivers.filter(
            (driver) =>
              !assignedDriverIds.has(driver.id) ||
              driver.id === vehicle.driver?.id,
          );

          return (
            <TableRow key={vehicle.id}>
              <TableCell className="font-semibold text-slate-900">
                {vehicle.plate}
              </TableCell>

              <TableCell>
                {vehicle.brand}
              </TableCell>

              <TableCell>
                {vehicle.model}
              </TableCell>

              <TableCell>
                {vehicle.year}
              </TableCell>

              <TableCell>
                {vehicle.capacity_kg} kg
              </TableCell>

              <TableCell>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    vehicle.status === "active"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      vehicle.status === "active"
                        ? "bg-emerald-500"
                        : "bg-slate-400"
                    }`}
                  />

                  {vehicle.status === "active"
                    ? "Activo"
                    : "Inactivo"}
                </span>
              </TableCell>

              <TableCell>
                {vehicle.driver ? (
                  <div>
                    <p className="font-medium text-slate-900">
                      {vehicle.driver.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {vehicle.driver.license}
                    </p>
                  </div>
                ) : (
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                    Sin conductor
                  </span>
                )}
              </TableCell>

              <TableCell>
                <AssignDriverForm
                  vehicleId={vehicle.id}
                  currentDriverId={
                    vehicle.driver?.id ?? null
                  }
                  drivers={availableDrivers}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}