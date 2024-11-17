import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LayoutDashboard,
  CarTaxiFront,
  UserRound,
  HandshakeIcon,
  MessageCircle,
  ShoppingCart,
  HandCoins,
  MapPin,
  LogOut,
  Settings,
} from 'lucide-angular';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';

import { AuthService } from '../../../core/services/auth.service';

export interface NavigationLink {
  path: string | null;
  label: string;
  icon: any; 
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, RouterModule, MatListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  //  navigation data
  navigationDataLinks: NavigationLink[] = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/drivers', label: 'Drivers', icon: CarTaxiFront },
    { path: '/clients', label: 'Clients', icon: UserRound },
    { path: '/organizations', label: 'Organizations', icon: HandshakeIcon },
    { path: '/products', label: 'Services', icon: ShoppingCart },
    { path: '/revenue', label: 'Revenue', icon: HandCoins },
    { path: '/feedback', label: 'Feedback', icon: MessageCircle },
    { path: '/geography', label: 'Geography', icon: MapPin },
    { path: '/settings', label: 'Account Settings', icon: Settings },
    { path: null, label: 'LogOut', icon: LogOut },
    
  ];
 size:number=20
  logout() {
    this.authService.clearSession(); // Clear session storage
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
