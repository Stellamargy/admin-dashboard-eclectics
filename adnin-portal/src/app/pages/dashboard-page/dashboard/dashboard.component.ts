import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/reusable-components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../../../shared/reusable-components/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, MatSidenavModule,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
