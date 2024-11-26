import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { LucideAngularModule, HandCoins,UsersRound,Bus,CarTaxiFront} from 'lucide-angular';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule,MatCardModule,LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly icons={
    revenueIcon:HandCoins,
    customersIcon:UsersRound,
    driversIcon:CarTaxiFront,
    ridesIcon:Bus
 }

}
