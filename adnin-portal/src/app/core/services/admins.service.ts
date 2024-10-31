import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Admin } from '../models/admin.model';
// import { Picture } from '../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  private host = 'https://uio-1.onrender.com/api/open/admins';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfile(): Observable<Admin> {
    const id = this.authService.getUserId();
    const headers = this.authService.getAuthHeaders();
    console.log('this id:' + id);
    return this.http.get<Admin>(`${this.host}/${id}`, { headers });
  }
  // getProfilePicture():Observable<Picture>{
  //   const id = this.authService.getUserId();
    
  //   const headers = this.authService.getAuthHeaders();
  //   return this.http.get<Picture>(`${this.host}/${id}/picture` ,{headers})
  // }
  getProfilePicture(adminId: number): Observable<Blob> {
   
    const headers = this.authService.getAuthHeaders(); // Get the headers

    return this.http.get(`${this.host}/${adminId}/picture`, { headers, responseType: 'blob' }); // Include headers in the request
  }
}
