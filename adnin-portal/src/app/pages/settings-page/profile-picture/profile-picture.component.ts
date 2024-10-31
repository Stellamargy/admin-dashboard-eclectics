import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AdminsService } from '../../../core/services/admins.service';


@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [MatButton,],
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.css'
})
export class ProfilePictureComponent {
  pictureUrl: string | null = null; // Variable to hold the picture URL
  constructor(private adminService:AdminsService){}
  // ngOnInit(): void {
  //   const adminId = 8; // Example admin ID
  //   this.adminService.getProfilePicture(adminId).subscribe({
  //     next: (blob) => {
  //       // Create a URL for the Blob object
  //       this.pictureUrl = URL.createObjectURL(blob);
  //       console.log(this.pictureUrl)
  //     },
  //     error: (error) => {
  //       console.error('Error fetching picture:', error);
  //     }
  //   });
  // }

  }
