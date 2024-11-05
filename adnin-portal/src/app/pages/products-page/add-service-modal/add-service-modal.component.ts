
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-service-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule  // Added ReactiveFormsModule here
  ],
  templateUrl: './add-service-modal.component.html',
  styleUrl: './add-service-modal.component.css'  // Changed to `styleUrls`
})
export class AddServiceModalComponent {
  addServiceForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddServiceModalComponent>
  ) {
    this.addServiceForm = this.fb.group({
      serviceName: ['', Validators.required],
      description: ['', Validators.required],
      price:['' , Validators.required],
      distance:['', Validators.required],
      photoPath: [null],
    });
  }

  // Method to handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  
  // Method to handle form submission
onSave(): void {
  if (this.addServiceForm.valid || this.selectedFile) {
    // Create a plain object to store the values
    const serviceData = {
      service: { // Wrap in a 'service' object
        serviceName: this.addServiceForm.get('serviceName')?.value,
        description: this.addServiceForm.get('description')?.value,
        price: this.addServiceForm.get('price')?.value,
        distance:this.addServiceForm.get('distance')?.value
      },
      file: this.selectedFile, // The file is directly included
    };

    console.log('Service Data:', serviceData); // Log the object for debugging

    this.dialogRef.close(serviceData); // Pass the plain object to the parent component
  } else {
    console.log('Form is invalid or file not selected');
  }
}

  

  onCancel(): void {
    this.dialogRef.close();
   
  }
}
