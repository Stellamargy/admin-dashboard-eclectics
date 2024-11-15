import { Driver } from "./driver.model";

export interface DriverResponse{
    status:string,
    message:string,
    data:Driver
}

export interface DriverApprovalResponse{
    status:string,
    data:Driver,
    message:string
}