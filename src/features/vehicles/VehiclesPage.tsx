import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "../../components/ui/Button";
import { CreateDriverForm } from "../drivers/CreateDriverForm";
import { getDrivers } from "../drivers/driverApi";
import { CreateVehicleForm } from "./CreateVehicleForm";
import { getVehicles } from "./vehicleApi";
import { VehicleTable } from "./VehicleTable";

export function VehiclesPage() {
  const navigate = useNavigate();

  const {
    data: vehicles,
    isLoading: isLoadingVehicles,
    isError: isVehiclesError,
    refetch: refetchVehicles,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  const {
    data: drivers,
    isLoading: isLoadingDrivers,
    isError: isDriversError,
    refetch: refetchDrivers,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });

  const handleLogout = async () => {
    localStorage.removeItem("access_token");

    await navigate({
      to: "/login",
    });
  };

  const handleRetry = async () => {
    await Promise.all([
      refetchVehicles(),
      refetchDrivers(),
    ]);
  };

  if (isLoadingVehicles || isLoadingDrivers) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-amber-400" />

          <p className="text-sm font-medium text-slate-600">
            Cargando información de la flota...
          </p>
        </div>
      </main>
    );
  }

  if (isVehiclesError || isDriversError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <section className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path
                d="M12 7v6M12 17h.01"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-slate-900">
            No se pudo cargar la flota
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Verifica que el servidor esté disponible e intenta nuevamente.
          </p>

          <Button
            className="mt-6"
            type="button"
            onClick={handleRetry}
          >
            Reintentar
          </Button>
        </section>
      </main>
    );
  }

  const vehicleCount = vehicles?.length ?? 0;

  const activeVehicles =
    vehicles?.filter(
      (vehicle) =>
        vehicle.status === "active",
    ).length ?? 0;

  const inactiveVehicles =
    vehicleCount - activeVehicles;

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-slate-950 shadow-sm">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="7"
                  width="11"
                  height="8"
                  rx="1"
                />

                <path
                  d="M14 10h3l3 3v2h-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="7"
                  cy="17"
                  r="1.5"
                />

                <circle
                  cx="17"
                  cy="17"
                  r="1.5"
                />

                <path
                  d="M3 15h2M9 15h5M18.5 15H20"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <p className="font-semibold">
                Mini Flota
              </p>

              <p className="text-sm text-slate-400">
                Panel de administración
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-200">
                Gestión de vehículos
              </p>

              <p className="text-xs text-slate-500">
                Sistema interno
              </p>
            </div>

            <Button
              className="bg-slate-800 px-4 py-2 hover:bg-slate-700"
              type="button"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-8">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            Control de flota
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Vehículos
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Registra vehículos y conductores, consulta el estado de la flota y
            administra sus asignaciones desde un solo lugar.
          </p>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="grid content-start gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <article className="rounded-2xl border border-slate-200 border-t-4 border-t-amber-400 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total de vehículos
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-950">
                    {vehicleCount}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="7"
                      width="11"
                      height="8"
                      rx="1"
                    />

                    <path
                      d="M14 10h3l3 3v2h-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="7"
                      cy="17"
                      r="1.5"
                    />

                    <circle
                      cx="17"
                      cy="17"
                      r="1.5"
                    />

                    <path
                      d="M3 15h2M9 15h5M18.5 15H20"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 border-t-4 border-t-emerald-500 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Vehículos activos
                  </p>

                  <p className="mt-2 text-3xl font-bold text-emerald-700">
                    {activeVehicles}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                    />

                    <path
                      d="m8.5 12 2.3 2.3 4.8-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 border-t-4 border-t-slate-500 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Vehículos inactivos
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-700">
                    {inactiveVehicles}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                    />

                    <path
                      d="M10 9v6M14 9v6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </article>
          </aside>

          <div className="grid gap-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-start gap-4 border-b border-slate-200 pb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Registrar nuevo vehículo
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Completa la información requerida para añadir una unidad a
                    la flota.
                  </p>
                </div>
              </div>

              <CreateVehicleForm />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-start gap-4 border-b border-slate-200 pb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="3"
                    />

                    <path
                      d="M6 19c0-3 2.5-5 6-5s6 2 6 5"
                      strokeLinecap="round"
                    />

                    <path
                      d="M19 8v4M17 10h4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Registrar nuevo conductor
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Registra un conductor para que pueda ser asignado a uno de
                    los vehículos disponibles.
                  </p>
                </div>
              </div>

              <CreateDriverForm />
            </section>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                Vehículos registrados
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Consulta la información y el estado actual de cada vehículo.
              </p>
            </div>

            <div className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
              {vehicleCount} registrados
            </div>
          </div>

          <VehicleTable
            vehicles={vehicles ?? []}
            drivers={drivers ?? []}
          />
        </section>
      </div>

      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
            Mini Flota · Sistema de gestión corporativa
          </p>
        </div>
      </footer>
    </main>
  );
}