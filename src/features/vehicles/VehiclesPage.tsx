import { useQuery } from "@tanstack/react-query";

import { CreateVehicleForm } from "./CreateVehicleForm";
import { getVehicles } from "./vehicleApi";
import { VehicleTable } from "./VehicleTable";

export function VehiclesPage() {
  const {
    data: vehicles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <p className="text-center text-slate-600">
          Cargando vehículos...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <p className="text-center text-red-600">
          No se pudo cargar la lista de vehículos.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Gestión de flota
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            Vehículos
          </h1>

          <p className="mt-2 text-slate-600">
            Registra y consulta los vehículos disponibles en la flota.
          </p>
        </header>

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <CreateVehicleForm />
        </section>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Lista de vehículos
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {vehicles?.length ?? 0} vehículos registrados
            </p>
          </div>

          <VehicleTable vehicles={vehicles ?? []} />
        </section>
      </div>
    </main>
  );
}