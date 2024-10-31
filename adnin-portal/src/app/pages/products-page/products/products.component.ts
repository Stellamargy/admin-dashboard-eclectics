  import { Component } from '@angular/core';
  import {MatGridListModule} from '@angular/material/grid-list';
  import {MatCardModule} from '@angular/material/card';
  import {MatButtonModule} from '@angular/material/button';
  import { CommonModule } from '@angular/common';
  import { ProductsService } from '../products.service';

  export interface service{
    id:number;
    serviceName:string,
    description:string,
    photoPath:string ,

  }

  @Component({
    selector: 'app-products',
    standalone: true,
    imports: [MatGridListModule ,MatCardModule, MatButtonModule,CommonModule ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
  })
  export class ProductsComponent {
    constructor(private products:ProductsService){}

    services:service[]=[]

    ngOnInit(): void{
      this.products.getServices().subscribe({
        next: (data) => {
          this.services = data; // Assign the fetched data to 'admin'
          console.log(data);
        },
        error: (error) => {
          console.error('Error fetching services data', error);
        },
        complete: () => {
          console.log('Profile data fetching completed.');
        },
      });
    }

    // delete a service triggered by button click
    onDelete(serviceId: number): void {
      this.products.deleteService(serviceId).subscribe({
        next: () => {
          this.services = this.services.filter(service => service.id !== serviceId);
          console.log(`Service with ID ${serviceId} deleted successfully.`);
        },
        error: (error) => {
          console.error('Error deleting service', error);
        }
      });
    }
    }

  
