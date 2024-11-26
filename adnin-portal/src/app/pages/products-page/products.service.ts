import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { service } from './products/products.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  headers:HttpHeaders;
  host:string;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.headers=this.auth.getAuthHeaders()
    this.host=this.auth.host
  }
  // endpoint - method to get the base endpoint

  gethost(): string {
    return this.auth.host;
  }
  // get all service
  getServices(): Observable<service[]> {
   
    return this.http.get<service[]>(`${this.host}/api/open/services`, {
     headers:this.headers
    });
  }

  // delete a service
  deleteService(id: number): Observable<any> {
    
    return this.http.delete(
      `${this.host}/api/open/services/${id}`,
      {
        headers:this.headers
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
    return this.http.post(`${this.host}/api/open/services`, formData, {
      headers
    });
  }

  // update service

  updateService(id: string, formData: FormData): Observable<any> {
    const headers = this.auth.getAuthHeadersFormData();
    return this.http.put(`${this.host}/api/open/services/${id}`, formData, {
     headers
    });
  }


  // get vehicle type and prices per distance for a particular service
  getVehicleTypeAndPrice(serviceName:string | null):Observable<any>{
    return this.http.get(`${this.host}/api/open/services/get/${serviceName}`, {
      headers:this.headers
    })

  }
  //add vehicle type and its associated price
  addVehicleTypeandCorrespondingPrice(vehicleTypeAndPrice:any):Observable<any>{
    const payload = {
      serviceName: vehicleTypeAndPrice.serviceName,
      name: vehicleTypeAndPrice.name,
      vehicleType: vehicleTypeAndPrice.vehicleType,
      description: vehicleTypeAndPrice.description,
      ratePerKm: vehicleTypeAndPrice.rate, // Match backend naming
      distance: vehicleTypeAndPrice.distance,
    };
    return this.http.post(`${this.host}/api/open/services/add`,payload,{headers:this.headers})

  }


  // edit vehicle type and price
  editVehicleTypeAndPrice(payload: Array<{
    id: number;
    serviceName: string;
    name: string;
    vehicleType: string;
    description: string;
    ratePerKm: number;
    distance: number;
  }>): Observable<any> {
    

    const serviceName = payload[0].serviceName; 
    const url = `${this.host}/api/open/services/update/${serviceName}`;
    return this.http.put(url, payload, {
      headers:this.headers
    }); 
  }

  // delete vehicle type and price
  deleteVehicleTypeandPrice(id:number):Observable<any>{
    return this.http.delete(`${this.host}/api/open/services/delete/${id}` , {
      headers:this.headers
    })

  }
  
}
