import { Driver } from "./driver.model";

export interface DriverResponse{
    status: string,
    message: string,
    data: Array<Driver>
}