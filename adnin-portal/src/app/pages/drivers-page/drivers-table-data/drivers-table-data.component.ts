import { Component ,ViewChild, AfterViewInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

interface DriverFilterOption {
  value: string;
  viewValue: string;
}
interface DriverFilterGroup {
  disabled?: boolean;
  name: string;
  filterOptions: DriverFilterOption[];
}



@Component({
  selector: 'app-drivers-table-data',
  standalone: true,
  imports: [ MatInputModule,MatFormFieldModule,MatSelectModule, ReactiveFormsModule,CommonModule],
  templateUrl: './drivers-table-data.component.html',
  styleUrl: './drivers-table-data.component.css'
})
export class DriversTableDataComponent {
   driverFilterGroups: DriverFilterGroup[] = [
    {
      name: 'Status',
      filterOptions: [
        {value: 'pending', viewValue: 'Pending'},
        {value: 'approved', viewValue: 'Approved'},
        {value: 'rejected', viewValue: 'Rejected'},
      ],
    },
    {
      name: 'Availability',
      filterOptions: [
        {value: 'true', viewValue: 'Available'},
        {value: 'false', viewValue: 'Unavailable'},
      ],
    },
    {
      name: 'Role',
      filterOptions: [
        {value: 'passenger', viewValue: 'Passenger'},
        {value: 'cargo', viewValue: 'Cargo'},
        {value: 'mover', viewValue: 'Mover'},
      ],
    },
    {
      name: 'Driving Experience',
      filterOptions: [
        {value: 'less-than-5', viewValue: 'Less than 5 years'},
        {value: 'more-than-5', viewValue: 'More than 5 years'},
      ],
    },
    {
      name: 'Criminal Background Check',
      filterOptions: [
        {value: 'true', viewValue: 'Passed'},
        {value: 'false', viewValue: 'Failed'},
      ],
    },
  ];
  

}
