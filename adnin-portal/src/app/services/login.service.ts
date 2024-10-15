import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl=`https://transportapp.onrender.com/api/open/admin/login `
  constructor(private http:HttpClient) { }
  login(credentials: { email: string; password: string }): Observable<{ token: string; userId: string }> {
    return this.http.post<{ token: string; userId: string }>(this.apiUrl, credentials);
  }
  
}
