import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { createDriver } from "./driverApi";
import {
  driverSchema,
  type DriverFormData,
} from "./utils/driverValidator";

const labelStyles =
  "mb-1.5 block text-sm font-medium text-slate-700";

const errorStyles =
  "mt-1.5 text-sm font-medium text-red-600";

type ValidationErrorItem = {
  msg?: unknown;
};

export function CreateDriverForm() {
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
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: "",
      license: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createDriver,

    onMutate: () => {
      clearErrors("root");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });

      reset({
        name: "",
        license: "",
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
          "Ocurrió un error inesperado al crear el conductor.",
      });
    },
  });

  const onSubmit = async (
    data: DriverFormData,
  ) => {
    await mutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            className={labelStyles}
            htmlFor="driver-name"
          >
            Nombre
          </label>

          <Input
            id="driver-name"
            placeholder="José López"
            {...register("name")}
          />

          {errors.name && (
            <p className={errorStyles}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            className={labelStyles}
            htmlFor="driver-license"
          >
            Licencia
          </label>

          <Input
            id="driver-license"
            inputMode="numeric"
            maxLength={10}
            placeholder="1712345678"
            {...register("license")}
          />

          {errors.license && (
            <p className={errorStyles}>
              {errors.license.message}
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
              Conductor creado correctamente.
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
            : "Registrar conductor"}
        </Button>
      </div>
    </form>
  );
}