import { Component,Inject} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-vehicle-type-price-modal',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule,MatButtonModule,MatInputModule,ReactiveFormsModule],
  templateUrl: './update-vehicle-type-price-modal.component.html',
  styleUrl: './update-vehicle-type-price-modal.component.css'
})
export class UpdateVehicleTypePriceModalComponent {
  editForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateVehicleTypePriceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Receives the current data from parent
    private fb: FormBuilder
  ) {
    console.log('Dialog Data:', this.data);
    // Initialize the form with the current data
    this.editForm = this.fb.group({
      id: [data.id, Validators.required],
      serviceName: [data.serviceName, Validators.required],
      name: [data.name, Validators.required],
      vehicleType: [data.vehicleType, Validators.required],
      description: [data.description],
      ratePerKm: [data.ratePerKm, [Validators.required, Validators.min(0)]],
      distance: [data.distance, [Validators.required, Validators.min(0)]],
    });
  }

// Close dialog without data
  cancel(): void {
    this.dialogRef.close(); 
  }

  processEditForm(){
    if(this.editForm.valid){
      this.dialogRef.close({
        id: this.editForm.get('id')?.value,
        serviceName: this.editForm.get('serviceName')?.value,
        name: this.editForm.get('name')?.value,
        vehicleType: this.editForm.get('vehicleType')?.value,
        description: this.editForm.get('description')?.value,
        ratePerKm: this.editForm.get('ratePerKm')?.value,
        distance: this.editForm.get('distance')?.value,
      });
    }
  }
}
