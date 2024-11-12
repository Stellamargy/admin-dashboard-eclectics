import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client.model';
import { AuthService } from '../../core/services/auth.service';
import { clientsResponse } from './clients.response';
import { clientResponse } from './client.reponse';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http:HttpClient, private auth:AuthService) { }

  // endpoint - method to get the base endpoint
  gethost(): string {
    return this.auth.host; 
  }

//  get all clients
  getClients(): Observable<clientsResponse> {
    const headers=this.auth.getAuthHeaders()
    return this.http.get<clientsResponse>(`${this.gethost()}/api/open/customers`,{headers});
  }
// deleting users

deleteClientById(clientId: number): Observable<any> {
  const headers = this.auth.getAuthHeaders();
  return this.http.delete(`${this.gethost()}/api/open/customers/delete/${clientId}`, { headers });
}

// deactivate account
deactivateAccountById(clientId:number):Observable<any>{
  const headers = this.auth.getAuthHeaders();
  return this.http.put(`${this.gethost()}/api/open/customers/${clientId}/deactivate`, { headers });
}

// activate account
activateAccountById(clientId:number):Observable<any>{
  const headers = this.auth.getAuthHeaders();
  return this.http.put(`${this.gethost()}/api/open/customers/${clientId}/activate`, { headers });
}
// view single client
getClientById(id:number):Observable<clientResponse>{
  const headers = this.auth.getAuthHeaders();
  return this.http.get<clientResponse>(`${this.gethost()}/api/open/customers/${id}`)


}
}
