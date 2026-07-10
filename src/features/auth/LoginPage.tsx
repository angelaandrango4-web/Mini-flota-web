import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { api } from "../../lib/api";
import {
  loginSchema,
  type LoginFormValues,
} from "./utils/loginValidator";

type LoginResponse = {
  access_token: string;
  token_type: string;
};

export function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const formData = new URLSearchParams();

      formData.append("username", data.email);
      formData.append("password", data.password);

      const response = await api.post<LoginResponse>(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      localStorage.setItem(
        "access_token",
        response.data.access_token,
      );

      await navigate({ to: "/vehicles" });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("root", {
            message: "Credenciales inválidas",
          });
          return;
        }

        if (!error.response) {
          setError("root", {
            message: "No se pudo conectar con el servidor",
          });
          return;
        }
      }

      setError("root", {
        message: "Ocurrió un error inesperado",
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Mini Flota
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Iniciar sesión
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Ingresa tus credenciales para continuar.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Correo electrónico
            </label>

            <Input
              id="email"
              type="email"
              placeholder="admin@miniflota.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Contraseña
            </label>

            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {errors.root && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">
                {errors.root.message}
              </p>
            </div>
          )}

          <Button
            className="w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </section>
    </main>
  );
}