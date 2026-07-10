import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

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
    <main>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Correo electrónico</label>

          <input
            id="email"
            type="email"
            {...register("email")}
          />

          {errors.email && (
            <p>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            {...register("password")}
          />

          {errors.password && (
            <p>{errors.password.message}</p>
          )}
        </div>

        {errors.root && (
          <p>{errors.root.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </main>
  );
}