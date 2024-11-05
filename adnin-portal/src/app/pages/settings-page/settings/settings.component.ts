import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Admin } from '../admin.model';
import { AdminsService } from '../admins.service';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatTabsModule,
    ChangePasswordComponent,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  constructor(private adminService: AdminsService, private dialog: MatDialog) {}

  admin: Admin = {} as Admin;

  ngOnInit(): void {
    this.adminService.getProfile().subscribe({
      next: (data: Admin) => {
        this.admin = data; // Assign the fetched data to 'admin'
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching admin data', error);
      },
      complete: () => {
        console.log('Profile data fetching completed.');
      },
    });
  }
 
  openEditProfileForm() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '400px',
      data: this.admin,
    }).afterClosed().subscribe(updatedData => {
      if (updatedData) {
        // Set up the FormData request body if a new profile photo is uploaded
        if (updatedData.profilePhoto) {
          const formData = new FormData();
          formData.append('id', String(this.admin.id));
          formData.append('email', updatedData.email || '');
          formData.append('name', updatedData.name || '');
          formData.append('phoneNumber', updatedData.phoneNumber || '');
          formData.append('employeeNumber', updatedData.employeeNumber || '');
          formData.append('profilePhoto', updatedData.profilePhoto); // Append the file itself
  
          this.adminService.updateProfile(formData).subscribe({
            next: (response) => {
              console.log('Profile updated successfully', response);
              // Update local admin data to reflect changes in the UI, especially `picturePath`
              this.admin = { ...this.admin, ...response };
            },
            error: (error) => {
              console.error('Error updating profile:', error);
              // Handle error (show message to user, etc.)
            }
          });
        } else {
          // No photo upload; send the data as JSON
          const requestBody = {
            id: this.admin.id,
            email: updatedData.email,
            picturePath: this.admin.picturePath, // Keep the existing path if no new photo
            name: updatedData.name,
            phoneNumber: updatedData.phoneNumber,
            employeeNumber: updatedData.employeeNumber
          };
  
          this.adminService.updateProfile(requestBody).subscribe({
            next: (response) => {
              console.log('Profile updated successfully', response);
              // Update local admin data
              this.admin = { ...this.admin, ...updatedData };
            },
            error: (error) => {
              console.error('Error updating profile:', error);
            }
          });
        }
      }
    });
  }
  
  
}