import { api } from "../../lib/api";
import type {
  CreateVehicleInput,
  Vehicle,
} from "./vehicleTypes";

interface AssignDriverInput {
  driver_id: string;
}

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

export async function assignDriver(
  vehicleId: string,
  driverId: string,
): Promise<Vehicle> {
  const body: AssignDriverInput = {
    driver_id: driverId,
  };

  const response = await api.patch<Vehicle>(
    `/vehicles/${vehicleId}/assign-driver`,
    body,
  );

  return response.data;
}