import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ChangePasswordComponent } from '../change-password.component';
import { Admin } from '../../../core/models/admin.model';
import { AdminsService } from '../../../core/services/admins.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatTabsModule,
    ChangePasswordComponent,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    CommonModule,
    ProfilePictureComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  constructor(private adminService: AdminsService) {}
  
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
}
