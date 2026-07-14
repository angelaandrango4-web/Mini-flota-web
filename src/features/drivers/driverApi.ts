import { api } from "../../lib/api";
import type { Driver, DriverCreate, } from "./driverTypes";

export async function getDrivers(): Promise<Driver[]> {
    const response = await api.get<Driver[]>("/drivers");

    return response.data;
}

export async function createDriver(
    driver: DriverCreate,
): Promise<Driver> {
    const response = await api.post<Driver>(
        "/drivers",
        driver,
    );

    return response.data;
}