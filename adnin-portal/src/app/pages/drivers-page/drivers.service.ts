import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Driver } from './driver.model';
import { DriversResponse } from './drivers-response';
import { DriverResponse } from './driver.response';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
 endpoint:string;
 headers:HttpHeaders;
  constructor(private http:HttpClient, private auth:AuthService) { 
    this.endpoint=this.auth.host
    this.headers=this.auth. getAuthHeaders();
  }
  // fetching all drivers
  getDrivers():Observable<DriversResponse>{
    return this.http.get<DriversResponse>(`${this.endpoint}/api/open/drivers`,{
      headers:this.headers
    })
    

  }

  // fetching a driver 
  getDriver(id:number):Observable<DriverResponse>{
    return this.http.get<DriverResponse>(`${this.endpoint}/api/open/drivers/${id}`,{
      headers:this.headers
    })
  }
}
