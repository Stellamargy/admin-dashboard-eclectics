import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  // Store token and user ID in session storage
  setSession(token: string, userId: string) {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userId', userId);
  }
  // Retrieve token from session storage
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  // Retrieve user ID from session storage
  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  // Clear session storage (logout)
  clearSession() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
  }
}
