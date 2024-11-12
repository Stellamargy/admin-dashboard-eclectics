import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
 

  constructor(private http:HttpClient) { }
   host:string=`https://uio-1.onrender.com`

  // Check if code is running in a browser (not server-side)
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  // Store token and user ID in session storage
  setSession(token: string, userId: number) {
    if (this.isBrowser()) {
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userId', userId.toString());
    }
  }

  // Retrieve token from session storage
  getToken(): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem('authToken');
    }
    return null;
  }

  // Retrieve user ID from session storage
  getUserId(): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem('userId');
    }
    return null;
  }

  // Clear session storage (logout)
  clearSession() {
    if (this.isBrowser()) {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userId');
    }
  }

  // Get Authorization headers for API requests
    getAuthHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
        'UserId': `${this.getUserId()}`
      });
    } 

  
  getAuthHeadersFormData(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'UserId': `${this.getUserId()}`,
     
    });
  } 

 
 
  login(credentials: { email: string; password: string }): Observable<{ token: string; id: number }> {
    return this.http.post<{ token: string; id: number }>(`${this.host}/api/open/admins/login`, credentials);
  }
 
 
 
 
  // Method to send the PUT request to change the password
  changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    const headers = this.getAuthHeaders();

    const payload = {
      email,
      oldPassword,
      newPassword,
    };

    return this.http.put(`${this.host}/api/open/admins/change-password`, payload, { headers });
  }

  
}

