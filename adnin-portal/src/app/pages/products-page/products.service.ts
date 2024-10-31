import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { service } from './products/products.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
 
  constructor(private http: HttpClient, private auth: AuthService) {}
  // endpoint - method to get the base endpoint
  gethost(): string {
    return this.auth.host;
  }
// get all service
  getServices(): Observable<service[]> {
    const headers = this.auth.getAuthHeaders();
    return this.http.get<service[]>(`${this.gethost()}/api/open/services`, {
      headers,
    });
  }

  // delete a service
  deleteService(id: number): Observable<any> {
    const headers = this.auth.getAuthHeaders();
    return this.http.delete(`${this.gethost()}/api/open/services/delete/${id}`, {
      headers,
    });
  }
}
