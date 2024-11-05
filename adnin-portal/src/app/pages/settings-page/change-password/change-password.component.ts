import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(private authService: AuthService) {}
  changepasswordForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  // get email
  get email() {
    return this.changepasswordForm.get('email');
  }
  // get email
  get oldPassword() {
    return this.changepasswordForm.get('oldPassword');
  }
  // get new password
  get newPassword() {
    return this.changepasswordForm.get('newPassword');
  }
  onSubmit() {
    const email = this.changepasswordForm.value.email!;
    const oldPassword = this.changepasswordForm.value.oldPassword!;
    const newPassword = this.changepasswordForm.value.newPassword!;

    this.authService.changePassword(email, oldPassword, newPassword).subscribe({
      next: (response) => {
        // Show success confirmation with SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Password changed successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        
        console.log('Password changed successfully:', response);
      },
      error: (error) => {
        console.error('Error changing password:', error);
        if (error.error) {
          console.error('Error details:', error.error);

          // fail message from sweetalert2
          Swal.fire({
            title: 'Failed!',
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
         
        }
      },
    });
  }
}
