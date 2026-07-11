import { z } from "zod";

export const vehicleSchema = z.object({
  plate: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z]{3}-\d{4}$/,
      "La placa debe tener el formato AAA-1234",
    ),

  brand: z
    .string()
    .trim()
    .min(1, "La marca es obligatoria"),

  model: z
    .string()
    .trim()
    .min(1, "El modelo es obligatorio"),

  year: z
    .number()
    .min(1990, "El año debe ser mayor o igual a 1990")
    .max(
      new Date().getFullYear(),
      "El año no puede ser mayor al actual",
    ),

  capacity_kg: z
    .number()
    .positive("La capacidad debe ser mayor a 0"),

  status: z.enum(["active", "inactive"]),
});

export type VehicleFormData = z.infer<
  typeof vehicleSchema
>;