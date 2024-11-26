import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { AddVehicleTypeAndPriceModalComponent } from '../add-vehicle-type-and-price-modal/add-vehicle-type-and-price-modal.component';
import { UpdateVehicleTypePriceModalComponent } from '../update-vehicle-type-price-modal/update-vehicle-type-price-modal.component';


export interface VehicleTypeandPriceTable {
  id: number;
  serviceName: string;
  name: string | null;
  vehicleType: string;
  description: string;
  ratePerKm: number;
  distance: number;
}

@Component({
  selector: 'app-vehicle-typesand-prices',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,MatToolbarModule,AddVehicleTypeAndPriceModalComponent,UpdateVehicleTypePriceModalComponent],
  templateUrl: './vehicle-typesand-prices.component.html',
  styleUrl: './vehicle-typesand-prices.component.css',
})
export class VehicleTypesandPricesComponent {
  vehicleTypesandPrice: VehicleTypeandPriceTable[]=[]
  serviceName:string | null=null
  displayedColumns: string[] = [
    'serviceName',
    'vehicleType',
    // 'description',
    'ratePerKm',
    'distance',
    'actions'
  ];
  datasource:MatTableDataSource<VehicleTypeandPriceTable>
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private dialog:MatDialog,
   
  ) {
    this.datasource=new MatTableDataSource()
  
  }

  ngOnInit() {
    this.viewVehicleTypeandPrice();
  }

  viewVehicleTypeandPrice(): void {
     this.serviceName =this.activatedRoute.snapshot.paramMap.get('serviceName');
    this.productsService.getVehicleTypeAndPrice(this.serviceName).subscribe({
      next:(response)=>{
        this.vehicleTypesandPrice =response
        this.datasource.data=this.vehicleTypesandPrice
        console.log("Hey here are the services", response)
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{
        console.log("Successfully fetched vehicle types and prices ")
      }
    })
  }

  openAddVehicleDialog():void{
    // const dialogRef=this.dialog.open(AddVehicleTypeAndPriceModalComponent,{
    //   width:'700px',
    // })
   const myDialog:MatDialogRef<AddVehicleTypeAndPriceModalComponent>=this.dialog.open(AddVehicleTypeAndPriceModalComponent,{
    width:"800px",
    disableClose: true,
   })
   // Handle dialog close event
   myDialog.afterClosed().subscribe((result) => {
    if (result) {
      console.log('Dialog closed with data:', result);
      this.sendvehicleTypeandPrice(result)
      // Example: Save or process the returned form data
      
    } else {
      console.log('Dialog was canceled');
    }
  });

  }


  // Method to send vehicle type and price to backend
  sendvehicleTypeandPrice(vehicleTypeandPrice:any){
    this.productsService.addVehicleTypeandCorrespondingPrice(vehicleTypeandPrice).subscribe({
      next:(response)=>{
        console.log("success adding vehicle type and prices",response)
        // Add the newly created item to the local array
      this.vehicleTypesandPrice.push(response);

      // Update the MatTableDataSource to reflect changes on the UI
      this.datasource.data = [...this.vehicleTypesandPrice];
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{
        console.log("Complete!")
      }
    })

  }

  // open edit modal 
  openEditVehicleDialog(vehicleTypeandPrice: VehicleTypeandPriceTable): void {
    const dialogRef = this.dialog.open(UpdateVehicleTypePriceModalComponent, {
      width: '800px',
      disableClose: true,
      data:vehicleTypeandPrice,
    });
    console.log(vehicleTypeandPrice)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed with edited data:', result);
        // update method
        this.updateVehicleTypeAndPrice([result]);
      } else {
        console.log('Dialog was canceled');
      }
    });
  }

  //edit method 
  // Update method to call the service
  updateVehicleTypeAndPrice(payload: Array<{
    id: number;
    serviceName: string;
    name: string;
    vehicleType: string;
    description: string;
    ratePerKm: number;
    distance: number;
  }>): void {
    this.productsService.editVehicleTypeAndPrice(payload).subscribe(
    {
      next:(response)=>{
        const existingItem = this.vehicleTypesandPrice.find(item => item.id === payload[0].id);
  
    if (existingItem) {
      // Update only the relevant properties
      existingItem.serviceName = payload[0].serviceName;
      existingItem.name = payload[0].name;
      existingItem.vehicleType = payload[0].vehicleType;
      existingItem.description = payload[0].description;
      existingItem.ratePerKm = payload[0].ratePerKm;
      existingItem.distance = payload[0].distance;
  
      // Update the MatTableDataSource to reflect changes on the UI
      this.datasource.data = [...this.vehicleTypesandPrice];
    }
        console.log("successfully updated" , response)
        this. vehicleTypesandPrice=response.updatedServices;
        this.datasource.data=this.vehicleTypesandPrice;
        
        
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{
        console.log("updating complete")
      }
    }
    );

  
  }

  // delete vehicle type and price
  deleteVehicleType(id:number):void{
    this.productsService.deleteVehicleTypeandPrice(id).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{
        console.log('deleting vehicle type and price complete.')
      }
    })
      
  }
  
  
  
  
  
  

}
