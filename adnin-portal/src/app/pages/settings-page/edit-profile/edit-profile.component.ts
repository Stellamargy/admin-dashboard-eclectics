import { Component ,Inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup,ReactiveFormsModule ,Validators} from '@angular/forms';
import { Admin } from '../admin.model';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatFormFieldModule,MatFormFieldModule,ReactiveFormsModule,MatDialogModule,MatInputModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  editForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Admin
  ) {
    // Initialize form with existing admin data
    this.editForm = this.fb.group({
      name: [data.name],
      email: [data.email, [Validators.email]],
      phoneNumber: [data.phoneNumber],
      employeeNumber: [data.employeeNumber],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSave() {
    if (this.editForm.valid) {
      const updatedData = { ...this.editForm.value };
      if (this.selectedFile) {
        updatedData.profilePhoto = this.selectedFile;
      }
      console.log(updatedData)
      this.dialogRef.close(updatedData); // Pass updated data back to the Settings component
    }
  }

  onCancel() {
    this.dialogRef.close();
  }



}


