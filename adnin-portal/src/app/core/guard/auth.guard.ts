import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject} from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Get instance of AuthService
  const router = inject(Router);            // Get instance of Router
  if (authService.getToken()) {
    return true;  // Allow access
  } else {
    router.navigate(['/login']);  // Redirect to login if not authenticated
    return false;  // Deny access
  }
};
