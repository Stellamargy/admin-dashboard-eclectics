import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule ,MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleTypesandPricesComponent } from '../vehicle-typesand-prices/vehicle-typesand-prices.component';


@Component({
  selector: 'app-add-vehicle-type-and-price-modal',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule, MatInputModule,MatFormFieldModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-vehicle-type-and-price-modal.component.html',
  styleUrl: './add-vehicle-type-and-price-modal.component.css'
})
export class AddVehicleTypeAndPriceModalComponent {
  addVehicleTypeAndPrice:FormGroup
  constructor(private fb:FormBuilder,  public dialogRef: MatDialogRef<AddVehicleTypeAndPriceModalComponent>,){
    this.addVehicleTypeAndPrice = this.fb.group({
      serviceName: ['', [Validators.required]], 
      name: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]], 
      description: ['', [Validators.required]], 
      ratePerKm: ["", [Validators.required, Validators.min(1)]], 
      distance: ["", [Validators.required, Validators.min(1)]] 
    });


  
  }
// close the modal without passing data
  cancelDialog(){
    this.dialogRef.close()
  }

  //add vehicle type and price-pass data to the arent component
  saveVehicleTyeAndPrice(){
    if(this.addVehicleTypeAndPrice.valid){
      // const vehicleTypeAndPriceData=  {
      //   serviceName: this.addVehicleTypeAndPrice.get('serviceName')?.value,
      //   name: this.addVehicleTypeAndPrice.get('name')?.value,
      //   vehicleType: this.addVehicleTypeAndPrice.get('vehicleType')?.value,
      //   description: this.addVehicleTypeAndPrice.get('description')?.value,
      //   rate: this.addVehicleTypeAndPrice.get('rate')?.value,
      //   distance: this.addVehicleTypeAndPrice.get('distance')?.value,
      // }
      this.dialogRef.close( {
        serviceName: this.addVehicleTypeAndPrice.get('serviceName')?.value,
        name: this.addVehicleTypeAndPrice.get('name')?.value,
        vehicleType: this.addVehicleTypeAndPrice.get('vehicleType')?.value,
        description: this.addVehicleTypeAndPrice.get('description')?.value,
        ratePerKm: this.addVehicleTypeAndPrice.get('ratePerKm')?.value,
        distance: this.addVehicleTypeAndPrice.get('distance')?.value,
      })
    }else{
      console.log("Your data is invalid")
    }
  }
}
