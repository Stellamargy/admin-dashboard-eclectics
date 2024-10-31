import { Component } from '@angular/core';
import { LucideAngularModule,CalendarDays} from 'lucide-angular';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(){}
  

  calendar:any=CalendarDays
  settings:string="/settings"

}
