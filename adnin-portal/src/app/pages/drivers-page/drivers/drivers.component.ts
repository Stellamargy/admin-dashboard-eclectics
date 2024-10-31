import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LucideAngularModule, UserPen,Activity,UserCheck,GitPullRequest,Star } from 'lucide-angular';
import { DriversTableDataComponent } from '../drivers-table-data/drivers-table-data.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { NavbarComponent } from '../../../shared/reusable-components/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/reusable-components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';





@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [ MatCardModule,LucideAngularModule,MatGridListModule,DriversTableDataComponent, NavbarComponent, MatSidenavModule,HeaderComponent],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent {
  icons={
    active:Activity,
    driver:UserPen,
    activationRate:UserCheck,
    requestRate:GitPullRequest,
    rating:Star,
    size:30
  }

}
