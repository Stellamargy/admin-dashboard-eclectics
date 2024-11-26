import {  Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authservice: AuthService, private router: Router) {}

  errorMessage: string | null = null;
  hide = signal(true);
  loading:boolean=false

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

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
      this.loading=true;
      this.authservice.login(credentials).subscribe({
        next: (response) => {
          // Store token and user ID in session storage
          console.log(response.token)
          this.authservice.setSession(response.token, response.id);
          console.log('Successful', response.id);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading=false
          if (error.status === 403) {
            this.errorMessage = 'Wrong password or email';
          } else {
            this.errorMessage = 'Unexpected error has occurred.Please ';
          }
        },
        complete:()=>{
          this.loading=false;
          console.log('Login complete.')
        }
      });
    }
  }
}
