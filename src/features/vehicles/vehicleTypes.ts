import type { Driver } from "../drivers/driverTypes";

export type VehicleStatus = "active" | "inactive";

export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  capacity_kg: number;
  status: VehicleStatus;
  driver: Driver | null;
}

export interface CreateVehicleInput {
  plate: string;
  brand: string;
  model: string;
  year: number;
  capacity_kg: number;
  status: VehicleStatus;
}