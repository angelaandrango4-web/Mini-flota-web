import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { createVehicle } from "./vehicleApi";
import type {
  CreateVehicleInput,
  VehicleStatus,
} from "./vehicleTypes";

const initialForm: CreateVehicleInput = {
  plate: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  capacity_kg: 0,
  status: "active",
};

const labelStyles =
  "mb-1.5 block text-sm font-medium text-slate-700";

type ValidationErrorItem = {
  msg?: unknown;
};

export function CreateVehicleForm() {
  const queryClient = useQueryClient();

  const [formData, setFormData] =
    useState<CreateVehicleInput>(initialForm);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createVehicle,

    onMutate: () => {
      setErrorMessage(null);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });

      setFormData(initialForm);
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const detail: unknown = error.response?.data?.detail;

        if (typeof detail === "string") {
          setErrorMessage(detail);
          return;
        }

        if (Array.isArray(detail)) {
          const messages = detail
            .map((item: ValidationErrorItem) => item.msg)
            .filter(
              (message): message is string =>
                typeof message === "string",
            );

          if (messages.length > 0) {
            setErrorMessage(messages.join(". "));
            return;
          }
        }

        if (!error.response) {
          setErrorMessage(
            "No se pudo conectar con el servidor.",
          );
          return;
        }
      }

      setErrorMessage(
        "Ocurrió un error inesperado al crear el vehículo.",
      );
    },
  });

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className={labelStyles} htmlFor="plate">
            Placa
          </label>

          <Input
            id="plate"
            placeholder="ABC-1234"
            value={formData.plate}
            onChange={(event) =>
              setFormData({
                ...formData,
                plate: event.target.value.toUpperCase(),
              })
            }
            required
          />
        </div>

        <div>
          <label className={labelStyles} htmlFor="brand">
            Marca
          </label>

          <Input
            id="brand"
            placeholder="Toyota"
            value={formData.brand}
            onChange={(event) =>
              setFormData({
                ...formData,
                brand: event.target.value,
              })
            }
            required
          />
        </div>

        <div>
          <label className={labelStyles} htmlFor="model">
            Modelo
          </label>

          <Input
            id="model"
            placeholder="Hilux"
            value={formData.model}
            onChange={(event) =>
              setFormData({
                ...formData,
                model: event.target.value,
              })
            }
            required
          />
        </div>

        <div>
          <label className={labelStyles} htmlFor="year">
            Año
          </label>

          <Input
            id="year"
            type="number"
            min="1990"
            max={new Date().getFullYear()}
            value={formData.year}
            onChange={(event) =>
              setFormData({
                ...formData,
                year: Number(event.target.value),
              })
            }
            required
          />
        </div>

        <div>
          <label
            className={labelStyles}
            htmlFor="capacity_kg"
          >
            Capacidad (kg)
          </label>

          <Input
            id="capacity_kg"
            type="number"
            min="1"
            placeholder="1000"
            value={formData.capacity_kg}
            onChange={(event) =>
              setFormData({
                ...formData,
                capacity_kg: Number(event.target.value),
              })
            }
            required
          />
        </div>

        <div>
          <label className={labelStyles} htmlFor="status">
            Estado
          </label>

          <Select
            id="status"
            value={formData.status}
            onChange={(event) =>
              setFormData({
                ...formData,
                status: event.target.value as VehicleStatus,
              })
            }
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </Select>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        </div>
      )}

      {mutation.isSuccess && (
        <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-medium text-emerald-700">
            Vehículo creado correctamente.
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button
          className="min-w-44"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "Registrando..."
            : "Registrar vehículo"}
        </Button>
      </div>
    </form>
  );
}