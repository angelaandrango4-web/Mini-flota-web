import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import { getDrivers } from "../drivers/driverApi";
import { assignDriver } from "./vehicleApi";

type AssignDriverFormProps = {
  vehicleId: string;
  currentDriverId?: string | null;
};

export function AssignDriverForm({
  vehicleId,
  currentDriverId = null,
}: AssignDriverFormProps) {
  const queryClient = useQueryClient();

  const [selectedDriverId, setSelectedDriverId] =
    useState(currentDriverId ?? "");

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const {
    data: drivers,
    isLoading: isLoadingDrivers,
    isError: isDriversError,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });

  const mutation = useMutation({
    mutationFn: () =>
      assignDriver(vehicleId, selectedDriverId),

    onMutate: () => {
      setErrorMessage(null);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const detail: unknown =
          error.response?.data?.detail;

        if (typeof detail === "string") {
          setErrorMessage(detail);
          return;
        }

        if (!error.response) {
          setErrorMessage(
            "No se pudo conectar con el servidor.",
          );
          return;
        }
      }

      setErrorMessage(
        "No se pudo asignar el conductor.",
      );
    },
  });

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!selectedDriverId) {
      setErrorMessage(
        "Selecciona un conductor.",
      );
      return;
    }

    mutation.mutate();
  };

  if (isLoadingDrivers) {
    return (
      <p className="text-sm text-slate-500">
        Cargando conductores...
      </p>
    );
  }

  if (isDriversError) {
    return (
      <p className="text-sm text-red-600">
        No se pudieron cargar los conductores.
      </p>
    );
  }

  return (
    <form
      className="flex min-w-64 flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <Select
        aria-label="Seleccionar conductor"
        value={selectedDriverId}
        onChange={(event) => {
          setSelectedDriverId(event.target.value);
          setErrorMessage(null);
        }}
      >
        <option value="">
          Seleccionar conductor
        </option>

        {drivers?.map((driver) => (
          <option
            key={driver.id}
            value={driver.id}
          >
            {driver.name} — {driver.license}
          </option>
        ))}
      </Select>

      <Button
        className="w-full px-3 py-2 text-xs"
        type="submit"
        disabled={
          mutation.isPending ||
          !selectedDriverId
        }
      >
        {mutation.isPending
          ? "Asignando..."
          : currentDriverId
            ? "Cambiar conductor"
            : "Asignar conductor"}
      </Button>

      {errorMessage && (
        <p className="text-xs font-medium text-red-600">
          {errorMessage}
        </p>
      )}

      {mutation.isSuccess && (
        <p className="text-xs font-medium text-emerald-700">
          Conductor asignado correctamente.
        </p>
      )}
    </form>
  );
}