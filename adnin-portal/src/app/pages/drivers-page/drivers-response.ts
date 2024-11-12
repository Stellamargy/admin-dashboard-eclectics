import { Driver } from "./driver.model";

export interface DriversResponse{
    status: string,
    message: string,
    data: Array<Driver>
}