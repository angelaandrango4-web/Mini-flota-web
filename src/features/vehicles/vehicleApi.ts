import { api } from "../../lib/api";
import type {
  CreateVehicleInput,
  Vehicle,
} from "./vehicleTypes";

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await api.get<Vehicle[]>("/vehicles");

  return response.data;
}

export async function createVehicle(
  vehicle: CreateVehicleInput,
): Promise<Vehicle> {
  const response = await api.post<Vehicle>(
    "/vehicles",
    vehicle,
  );

  return response.data;
}