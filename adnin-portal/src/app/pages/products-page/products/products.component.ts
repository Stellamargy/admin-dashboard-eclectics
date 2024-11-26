import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceModalComponent } from '../add-service-modal/add-service-modal.component';
import { UpdateServiceModalComponent } from '../update-service-modal/update-service-modal.component';
import { Router } from '@angular/router';


export interface service {
  id: number;
  serviceName: string;
  description: string;
  photoPath: string;
  status:string | null;
  price: number;
  distance:number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    AddServiceModalComponent,
    UpdateServiceModalComponent 
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private products: ProductsService, private dialog: MatDialog , private router:Router) {}

  services: service[] = [];
  // fetch services
  ngOnInit(): void {
    this.products.getServices().subscribe({
      next: (data) => {
        this.services = data; // Assign the fetched data to 'admin'
        console.log('Fetched services',this.services)
        
      },
      error: (error) => {
        console.error('Error fetching services data', error);
      },
      complete: () => {
        console.log('fetching completed.');
      },
    });
  }

  // delete a service triggered by button click
  onDelete(serviceId: number): void {
    // Show confirmation dialog
    Swal.fire({
      text: 'You won’t be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      width: '300px', // Set a custom width for smaller size
      padding: '1em', // Adjust padding to make it more compact
      customClass: {
        title: 'swal2-small-title', // Custom CSS class for title
        popup: 'swal2-compact-popup', // Custom CSS class for popup
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with delete
        this.products.deleteService(serviceId).subscribe({
          next: () => {
            // Update the services array after deletion
            this.services = this.services.filter(
              (service) => service.id !== serviceId
            );

            // Show success alert
            Swal.fire(
              'Deleted!',
              'The service has been deleted successfully.',
              'success'
            );
          },
          error: (error) => {
            console.error('Error deleting service', error);

            // Show error alert if delete fails
            Swal.fire(
              'Error',
              'There was an issue deleting the service. Please try again later.',
              'error'
            );
          },
        });
      }
    });
  }

  // open addService dialog
  openAddServiceDialog(): void {
    const dialogRef = this.dialog.open(AddServiceModalComponent, {
      width: '400px',
    });

    // Handle the dialog close event to get the service data
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.addService(result); // Call the method to add the service
      }
    });
  }
  // Method to add a new service
  addService(serviceData: {
    service: { serviceName: string; description: string ; price:number; distance:number};
    file: File;
  }): void {
    this.products.addService(serviceData).subscribe({
      next: (response) => {
        console.log('Service added successfully:', response);
        this.services.push(response); // Update the services array with the newly added service
      },
      error: (err) => {
        console.error('Error adding service:', err.error);
      },
    });
  }


// open update dialog

openUpdateDialog(clickedservice: any): void {
  const dialogRef = this.dialog.open(UpdateServiceModalComponent, {
    width: '400px',
    data: clickedservice,
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('results', result);
    if (result) {
      console.log("This is result: ",result)
      // Create FormData to handle both JSON and file upload
      const formData = new FormData();
      
      // Append service data to FormData
      formData.append('service', JSON.stringify({
        serviceName: result.service.serviceName,
        description: result.service.description,
        // price: result.service.price,
        // distance: result.service.distance,
      }));

      // Append file if selected
      if (result.file) { // Ensure to use the correct property for the file
        formData.append('file', result.file); // This assumes 'result.photo' holds the selected file
      }
      console.log('form-data',formData)
      // Call the updateService method and pass the service ID and formData
      this.products.updateService(clickedservice.id, formData).subscribe({
        
        next: (response) => {
          console.log('Service updated successfully:', response);
          const index=this.services.findIndex(service=>service.id===clickedservice.id)
          if (index !== -1) {
            // Update the service in place
            this.services[index] = {
              ...this.services[index], // Retain existing properties
              ...response, // Update with new properties from the response
            };
          }
         
          
        },
        error: (err) => {
          console.error('Error updating service:', err.error);
        },
      });
    }
  });
}

viewVehicleTypeandPrices(serviceName:string){
this.router.navigate(["/products" ,serviceName])
}

}
