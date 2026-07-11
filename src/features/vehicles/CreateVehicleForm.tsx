import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { createVehicle } from "./vehicleApi";
import {
  vehicleSchema,
  type VehicleFormData,
} from "./utils/vehicleValidator";

const labelStyles =
  "mb-1.5 block text-sm font-medium text-slate-700";

const errorStyles =
  "mt-1.5 text-sm font-medium text-red-600";

type ValidationErrorItem = {
  msg?: unknown;
};

export function CreateVehicleForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
    },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      plate: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      capacity_kg: 0,
      status: "active",
    },
  });

  const mutation = useMutation({
    mutationFn: createVehicle,

    onMutate: () => {
      clearErrors("root");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });

      reset({
        plate: "",
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        capacity_kg: 0,
        status: "active",
      });
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const detail: unknown =
          error.response?.data?.detail;

        if (typeof detail === "string") {
          setError("root", {
            type: "server",
            message: detail,
          });
          return;
        }

        if (Array.isArray(detail)) {
          const messages = detail
            .map(
              (item: ValidationErrorItem) =>
                item.msg,
            )
            .filter(
              (message): message is string =>
                typeof message === "string",
            );

          if (messages.length > 0) {
            setError("root", {
              type: "server",
              message: messages.join(". "),
            });
            return;
          }
        }

        if (!error.response) {
          setError("root", {
            type: "server",
            message:
              "No se pudo conectar con el servidor.",
          });
          return;
        }
      }

      setError("root", {
        type: "server",
        message:
          "Ocurrió un error inesperado al crear el vehículo.",
      });
    },
  });

  const onSubmit = async (
    data: VehicleFormData,
  ) => {
    await mutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            className={labelStyles}
            htmlFor="plate"
          >
            Placa
          </label>

          <Input
            id="plate"
            placeholder="ABC-1234"
            className="uppercase"
            {...register("plate")}
          />

          {errors.plate && (
            <p className={errorStyles}>
              {errors.plate.message}
            </p>
          )}
        </div>

        <div>
          <label
            className={labelStyles}
            htmlFor="brand"
          >
            Marca
          </label>

          <Input
            id="brand"
            placeholder="Toyota"
            {...register("brand")}
          />

          {errors.brand && (
            <p className={errorStyles}>
              {errors.brand.message}
            </p>
          )}
        </div>

        <div>
          <label
            className={labelStyles}
            htmlFor="model"
          >
            Modelo
          </label>

          <Input
            id="model"
            placeholder="Hilux"
            {...register("model")}
          />

          {errors.model && (
            <p className={errorStyles}>
              {errors.model.message}
            </p>
          )}
        </div>

        <div>
          <label
            className={labelStyles}
            htmlFor="year"
          >
            Año
          </label>

          <Input
            id="year"
            type="number"
            {...register("year", {
              valueAsNumber: true,
            })}
          />

          {errors.year && (
            <p className={errorStyles}>
              {errors.year.message}
            </p>
          )}
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
            placeholder="1000"
            {...register("capacity_kg", {
              valueAsNumber: true,
            })}
          />

          {errors.capacity_kg && (
            <p className={errorStyles}>
              {errors.capacity_kg.message}
            </p>
          )}
        </div>

        <div>
          <label
            className={labelStyles}
            htmlFor="status"
          >
            Estado
          </label>

          <Select
            id="status"
            {...register("status")}
          >
            <option value="active">
              Activo
            </option>

            <option value="inactive">
              Inactivo
            </option>
          </Select>

          {errors.status && (
            <p className={errorStyles}>
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      {errors.root && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">
            {errors.root.message}
          </p>
        </div>
      )}

      {isSubmitSuccessful &&
        mutation.isSuccess && (
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
          disabled={
            isSubmitting ||
            mutation.isPending
          }
        >
          {isSubmitting ||
          mutation.isPending
            ? "Registrando..."
            : "Registrar vehículo"}
        </Button>
      </div>
    </form>
  );
}