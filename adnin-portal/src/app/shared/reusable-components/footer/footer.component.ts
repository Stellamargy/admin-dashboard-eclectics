import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface links{
  path:string | null
  label:string;
}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear:number=new Date().getFullYear();
  quickLinks:links[]=[
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/drivers', label: 'Drivers' },
    { path: '/clients', label: 'Clients' },
    { path: '/organizations', label: 'Organizations' },
    { path: '/products', label: 'Services' },
    { path: '/revenue', label: 'Revenue' },
    { path: '/feedback', label: 'Feedback' },
    { path: '/geography', label: 'Geography' },
    { path: '/settings', label: 'Account Settings' },
    { path: null, label: 'Log Out' },
  ];

}
