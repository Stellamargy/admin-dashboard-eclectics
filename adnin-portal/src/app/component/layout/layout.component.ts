import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/reusable-components/navbar/navbar.component';
import { HeaderComponent } from '../../shared/reusable-components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from '../../shared/reusable-components/footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,  NavbarComponent, MatSidenavModule,HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
