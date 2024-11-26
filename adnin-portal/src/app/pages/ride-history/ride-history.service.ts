import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';


export interface RideHistoryResponse {
  data: RideHistory[];
  status: string; 
}

export interface RideHistory {
  distance: number;      
  totalAmount: number;    
  price: number;         
  serviceName: string | null; 
  vehicleType: string;    
}


@Injectable({
  providedIn: 'root'
})
export class RideHistoryService {
  endpoint:string;
  headers:HttpHeaders;
   constructor(private http:HttpClient, private auth:AuthService) { 
     this.endpoint=this.auth.host
     this.headers=this.auth. getAuthHeaders();
   }



  // get ride history
  getRideHistory():Observable<RideHistoryResponse>{
    return this.http.get<RideHistoryResponse>(`${this.endpoint}/api/open/rides/ride-history` ,{ headers: this.headers });

  }
}
