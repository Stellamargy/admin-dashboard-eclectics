import { Component } from '@angular/core';
import { LucideAngularModule,Facebook,Twitter,Instagram} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly facebook=Facebook;
  readonly twitter=Twitter;
  readonly instagram=Instagram

}
