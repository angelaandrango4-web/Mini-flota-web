import { useQuery } from "@tanstack/react-query";

import { CreateVehicleForm } from "./CreateVehicleForm";
import { getVehicles } from "./vehicleApi";

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

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Placa
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Marca
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Modelo
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Año
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Capacidad
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {vehicles?.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {vehicle.plate}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {vehicle.brand}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {vehicle.model}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {vehicle.year}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {vehicle.capacity_kg} kg
                    </td>
                    <td className="px-6 py-4">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}