import { Component } from '@angular/core';
import { LucideAngularModule,CalendarDays} from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { AdminsService } from '../../../pages/settings-page/admins.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  profilePictureUrl:string=""
  calendar:any=CalendarDays
  settings:string="/settings"
  date:Date=new Date()
  constructor(private adminsService:AdminsService){}

  ngOnInit(): void {
    this.adminsService.getProfile().subscribe({
      next: (admin) => {
        this.profilePictureUrl = admin.picturePath;
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      },
      complete: () => {
        console.log('Profile fetch completed');
      }
    });
  }
  
  

  

}
