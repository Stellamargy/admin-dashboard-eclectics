import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // errormessage set to null by default
  errorMessage: string | null = null;
  // injects the loginservice to login component
  constructor(private authservice: AuthService, private router: Router) {}

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  // Getter for the email control
  get email() {
    return this.logInForm.get('email')!;
  }

  // Getter for the password control
  get password() {
    return this.logInForm.get('password')!;
  }

  onSubmit() {
    if (this.logInForm.valid) {
      const credentials = {
        email: this.email.value || '', // Fallback to an empty string if null
        password: this.password.value || '', // Fallback to an empty string if null
      };
      this.authservice.login(credentials).subscribe({
        next: (response) => {
          // Store token and user ID in session storage

          this.authservice.setSession(response.token, response.id);
          console.log('Successful', response.id);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          if (error.error) {
            console.error('Error details:', error.error);
            console.error('Error details:', error.error);
            // Set errorMessage with error.error.message if available; otherwise, fallback to error.error
            this.errorMessage = error.error.message || error.error;
          }else {
            this.errorMessage ="An unexpected error occurred. Please try again."
          }
        },
      });
    }
  }
}
