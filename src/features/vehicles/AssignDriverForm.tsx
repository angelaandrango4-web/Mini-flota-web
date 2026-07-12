import axios from "axios";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useEffect,
  useState,
} from "react";

import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import type { Driver } from "../drivers/driverTypes";
import { assignDriver } from "./vehicleApi";

type AssignDriverFormProps = {
  vehicleId: string;
  currentDriverId?: string | null;
  drivers: Driver[];
};

export function AssignDriverForm({
  vehicleId,
  currentDriverId = null,
  drivers,
}: AssignDriverFormProps) {
  const queryClient = useQueryClient();

  const [selectedDriverId, setSelectedDriverId] =
    useState(currentDriverId ?? "");

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  useEffect(() => {
    setSelectedDriverId(currentDriverId ?? "");
  }, [currentDriverId]);

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [successMessage]);

  const hasChanged =
    selectedDriverId !== "" &&
    selectedDriverId !== (currentDriverId ?? "");

  const mutation = useMutation({
    mutationFn: () =>
      assignDriver(vehicleId, selectedDriverId),

    onMutate: () => {
      setErrorMessage(null);
      setSuccessMessage(null);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });

      setSuccessMessage(
        "Conductor asignado correctamente.",
      );
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

    if (!hasChanged) {
      return;
    }

    mutation.mutate();
  };

  return (
    <form
      className="min-w-72"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <Select
          aria-label="Seleccionar conductor"
          className="min-w-48"
          value={selectedDriverId}
          onChange={(event) => {
            setSelectedDriverId(
              event.target.value,
            );
            setErrorMessage(null);
            setSuccessMessage(null);
          }}
        >
          <option value="">
            Seleccionar conductor
          </option>

          {drivers.map((driver) => (
            <option
              key={driver.id}
              value={driver.id}
            >
              {driver.name} — {driver.license}
            </option>
          ))}
        </Select>

        <Button
          className="shrink-0 px-3 py-2 text-xs"
          type="submit"
          disabled={
            mutation.isPending ||
            !hasChanged
          }
        >
          {mutation.isPending
            ? "Guardando..."
            : "Guardar"}
        </Button>
      </div>

      {drivers.length === 0 && !currentDriverId && (
        <p className="mt-2 text-xs text-slate-500">
          No hay conductores disponibles.
        </p>
      )}

      {errorMessage && (
        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-xs font-medium text-red-700">
            {errorMessage}
          </p>
        </div>
      )}

      {successMessage && (
        <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
          <p className="text-xs font-medium text-emerald-700">
            {successMessage}
          </p>
        </div>
      )}
    </form>
  );
}