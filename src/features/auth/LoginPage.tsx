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
            message: "El correo o la contraseña son incorrectos.",
          });
          return;
        }

        if (!error.response) {
          setError("root", {
            message: "No se pudo conectar con el servidor.",
          });
          return;
        }
      }

      setError("root", {
        message: "Ocurrió un error inesperado.",
      });
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 px-6 py-12">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-slate-900/15 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="rounded-2xl border border-white/60 bg-white/70 p-8 pt-16 shadow-xl backdrop-blur-xl">
          <div className="absolute -top-9 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-slate-900 shadow-lg">
            <svg
              className="h-8 w-8 text-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path
                d="M3 16V7a1 1 0 0 1 1-1h9v10M3 16h1m9 0h4m-4 0V9h3l3 3.5V16m-6 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0m-11 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="mb-7 text-center">
            <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Mini Flota
            </p>

            <h1 className="text-2xl font-bold text-slate-900">
              Iniciar sesión
            </h1>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="sr-only" htmlFor="email">
                Correo electrónico
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 6h18v12H3z M3 7l9 6 9-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Correo electrónico"
                  className="h-11 border-white/80 bg-white/80 pl-10"
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-sm text-red-700">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="sr-only" htmlFor="password">
                Contraseña
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="10"
                      rx="1.5"
                    />
                    <path
                      d="M8 10V7a4 4 0 0 1 8 0v3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  className="h-11 border-white/80 bg-white/80 pl-10"
                  {...register("password")}
                />
              </div>

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-700">
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
              className="h-11 w-full bg-slate-900 text-white hover:bg-slate-800 focus:ring-amber-300"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center font-mono text-xs uppercase tracking-widest text-slate-700/60">
          Acceso restringido a usuarios autorizados
        </p>
      </div>
    </main>
  );
}