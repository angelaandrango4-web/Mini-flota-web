import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

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

const inputStyles =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const labelStyles =
  "mb-1.5 block text-sm font-medium text-slate-700";

export function CreateVehicleForm() {
  const queryClient = useQueryClient();

  const [formData, setFormData] =
    useState<CreateVehicleInput>(initialForm);

  const mutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });

      setFormData(initialForm);
    },
  });

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    mutation.mutate(formData);
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Crear vehículo
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Ingresa la información del nuevo vehículo.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={labelStyles} htmlFor="plate">
              Placa
            </label>

            <input
              id="plate"
              className={inputStyles}
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

            <input
              id="brand"
              className={inputStyles}
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

            <input
              id="model"
              className={inputStyles}
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

            <input
              id="year"
              className={inputStyles}
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

            <input
              id="capacity_kg"
              className={inputStyles}
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

            <select
              id="status"
              className={inputStyles}
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
            </select>
          </div>
        </div>

        {mutation.isError && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              No se pudo crear el vehículo. Revisa los datos
              ingresados.
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
          <button
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-blue-300"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Creando..."
              : "Crear vehículo"}
          </button>
        </div>
      </form>
    </section>
  );
}