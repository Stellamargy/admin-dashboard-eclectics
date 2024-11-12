import { Client } from "./client.model";

export interface clientsResponse{
    status:string,
    message:string,
    data:Array<Client>
}