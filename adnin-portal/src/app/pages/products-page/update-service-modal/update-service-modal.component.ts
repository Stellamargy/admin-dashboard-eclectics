import { Component, Inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update-service-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './update-service-modal.component.html',
  styleUrl: './update-service-modal.component.css',
})
export class UpdateServiceModalComponent {
  updateServiceForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateServiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public service: any
  ) {
    this.updateServiceForm = this.fb.group({
      serviceName: [service.serviceName, Validators.required],
      description: [service.description, Validators.required],
      price: [service.price, Validators.required],
      distance: [service.distance, Validators.required],
      file: [null, ],
    });
  }
  // handling file submission
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  // Method to handle form submission
  onSave(): void {
    if (this.updateServiceForm.valid || this.selectedFile) {
      // Create a plain object to store the values
      const serviceData = {
        service: {
          // Wrap in a 'service' object
          serviceName: this.updateServiceForm.get('serviceName')?.value,
          description: this.updateServiceForm.get('description')?.value,
          price: this.updateServiceForm.get('price')?.value,
          distance: this.updateServiceForm.get('distance')?.value,
          
        },
        file: this.selectedFile, // The file is directly included
      };

      console.log('Service Data:', serviceData); // Log the object for debugging

      this.dialogRef.close(serviceData); // Pass the plain object to the parent component
    } else {
      console.log('Form is invalid or file not selected');
    }
  }

  // cancelling dialog
  onCancel(): void {
    this.dialogRef.close();
  }
}
