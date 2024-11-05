import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Admin } from './admin.model';


@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  private host = 'https://uio-1.onrender.com/api/open/admins';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfile(): Observable<Admin> {
    const id = this.authService.getUserId();
    const headers = this.authService.getAuthHeaders();
   return this.http.get<Admin>(`${this.host}/${id}`, { headers });
  }


  
  updateProfile(updatedData: any): Observable<Admin> {
    const id = this.authService.getUserId();
    const headers = this.authService.getAuthHeaders();
  
    if (updatedData.profilePhoto instanceof File) {
      const formData = new FormData();
      formData.append('id', String(id));
      formData.append('email', updatedData.email || '');
      formData.append('name', updatedData.name || '');
      formData.append('phoneNumber', updatedData.phoneNumber || '');
      formData.append('employeeNumber', updatedData.employeeNumber || '');
      formData.append('profilePhoto', updatedData.profilePhoto); // Upload the photo file itself
  
      return this.http.put<Admin>(`${this.host}/${id}`, formData, { headers });
    } else {
      // For cases without an updated profile photo
      return this.http.put<Admin>(`${this.host}/${id}`, updatedData, { headers });
    }
  }
  
  
  
 
}
