import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Driver } from './driver.model';
import { DriversResponse } from './drivers-response';
import { DriverResponse } from './driver.response';
import { DriverApprovalResponse } from './driver.response';

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
     
      
    })
    

  }

  // fetching a driver 
  getDriver(id:number):Observable<DriverResponse>{
    return this.http.get<DriverResponse>(`${this.endpoint}/api/open/drivers/${id}`,{
      headers:this.headers
    })
  }
   
  // approving driver registration
  approveDriver(id:number):Observable<DriverResponse>{
    return this.http.post<DriverResponse>(`${this.endpoint}/api/open/drivers/approve/${id}`,{
      headers:this.headers
    })

  }
  // reject driver registration request
  rejectDriver(id:number):Observable<DriverResponse>{
    return this.http.post<DriverResponse>(`${this.endpoint}/api/open/drivers/reject/${id}`,{
      headers:this.headers
    })

  }

  // delete driver acc
  deleteDriverAcc(id:number):Observable<DriverResponse>{
    return this.http.delete<DriverResponse>(`${this.endpoint}/api/open/drivers/${id}`,{
      headers:this.headers
    })
  }
}
