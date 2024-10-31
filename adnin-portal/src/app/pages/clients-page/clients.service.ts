import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client.model';
import { AuthService } from '../../core/services/auth.service';

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
  getClients(): Observable<Client[]> {
    const headers=this.auth.getAuthHeaders()
    return this.http.get<Client[]>(`${this.gethost()}/api/open/customers`,{headers});
  }
// deleting users

deleteClientById(clientId: number): Observable<any> {
  const headers = this.auth.getAuthHeaders();
  return this.http.delete(`${this.gethost()}/api/open/customers/delete/${clientId}`, { headers });
}

}
