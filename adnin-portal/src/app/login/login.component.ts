import { Component,Inject } from '@angular/core';
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
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';



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
  // injects the loginservice to login component
  constructor(private loginservice:LoginService, private authservice: AuthService ) {}

  logInForm = new FormGroup({
    email: new FormControl(' ', [Validators.email, Validators.required]),
    password: new FormControl(' ', [Validators.minLength(6), Validators.required]),
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
        email: this.logInForm.value.email || '', // Fallback to an empty string if null
        password: this.logInForm.value.password || '' // Fallback to an empty string if null
      };
      this.loginservice.login(credentials).subscribe({
        next: (response) => {
          // Store token and user ID in session storage
          
          this.authservice.setSession(response.token,response.userId)
          console.log("Successful" , response)
          // add navigation here
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });

    
  }
}
}