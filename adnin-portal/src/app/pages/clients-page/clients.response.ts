import { Client } from "./client.model";

export interface clientResponse{
    status:string,
    message:string,
    data:Array<Client>
}