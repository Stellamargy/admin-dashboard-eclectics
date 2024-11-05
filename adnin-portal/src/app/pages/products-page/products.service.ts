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
    return this.http.delete(
      `${this.gethost()}/api/open/services/${id}`,
      {
        headers,
      }
    );
  }

  // Add a new service
  addService(serviceData: {
    service: { serviceName: string; description: string };
    file: File;
  }): Observable<any> {
    const formData = new FormData();

    // Append the nested service data
    formData.append('service', JSON.stringify(serviceData.service)); // Convert the service object to a string
    formData.append('file', serviceData.file); // Append the file

    // get the heaaders for form data
    const headers = this.auth.getAuthHeadersFormData();
    return this.http.post(`${this.gethost()}/api/open/services`, formData, {
      headers,
    });
  }

  // update service

  updateService(id: string, formData: FormData): Observable<any> {
    const headers = this.auth.getAuthHeadersFormData();
    return this.http.put(`${this.gethost()}/api/open/services/${id}`, formData, {
     headers
    });
  }
  
}
