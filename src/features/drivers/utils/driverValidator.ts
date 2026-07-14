import { z } from "zod";

export const driverSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .min(
      3,
      "El nombre debe tener al menos 3 caracteres",
    ),

  license: z
    .string()
    .trim()
    .regex(
        /^\d+$/,
        "La licencia solo puede contener números",
    )
    .length(
        10,
        "La licencia debe contener exactamente 10 dígitos",
    ),
});

export type DriverFormData = z.infer<
  typeof driverSchema
>;