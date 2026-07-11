export type VehicleStatus = "active" | "inactive";

export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  capacity_kg: number;
  status: VehicleStatus;
}

export interface CreateVehicleInput {
  plate: string;
  brand: string;
  model: string;
  year: number;
  capacity_kg: number;
  status: VehicleStatus;
}