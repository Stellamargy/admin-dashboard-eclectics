import { Component,ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DriversService } from '../drivers.service';
import { Driver } from '../driver.model';
// import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-drivers-table-data',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    // MatTableExporterModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './drivers-table-data.component.html',
  styleUrl: './drivers-table-data.component.css',
})
export class DriversTableDataComponent {
  drivers: Driver[] = [];
  displayedColumns: string[] = [
    'select',
    'fullName',
    'email',
    'vehicleType',
    'role',
    'status',
  ];
  loading:boolean=false
  dataSource: MatTableDataSource<Driver>;
  selection: SelectionModel<Driver>;

  // filter and search value
  searchInput: string = '';
  regStatusFilterValue: string = 'all';

  constructor(private driverService: DriversService, private router: Router) {
    this.dataSource = new MatTableDataSource();
    this.selection = new SelectionModel<Driver>(true, []);
  }
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.fetchDrivers();
    this.customFilter()

  }

  fetchDrivers(): void {
    this.loading=true;
    this.driverService.getDrivers().subscribe({
      next: (response) => {
        this.loading=false;
        console.log(response.data);
        if (response.status === 'OK') {
          
          this.drivers = response.data;
          this.dataSource.data = this.drivers; 
         
          this.dataSource.paginator = this.paginator;
        }

      },
      error:(error)=>{
        this.loading=false;
        console.log('Error fetching drivers' , error)
      },
      complete:()=>{
        
        console.log("Fetching drivers complete")
      }
    });
  }
  // check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  //tooltip
  toolTipMessage(): string {
    if (this.isAllSelected()) {
      return 'uncheck to deselect all rows';
    } else {
      return 'check to select all rows';
    }
  }
  //search filter value
  onSearch(event: Event): void {
    this.searchInput = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.searchInput;
  }

  // dropdown filter value
  applyStatusFilter(event: MatSelectChange): void {
    this.regStatusFilterValue = event.value;
    this.customFilter()
    this.dataSource.filter = this.regStatusFilterValue;
    
  }

  // custom filter
  customFilter() {
    this.dataSource.filterPredicate = (record: Driver, filter: string) => {
      // Check for status filter (active, inactive, or all)
      if (filter === 'all') {
        return  true;
      } else if (filter === 'pending') {
        return record.status.toLowerCase() === 'pending';
      } else if (filter === 'rejected') {
        return record.status.toLowerCase() === 'rejected';
      }else if (filter === 'approved') {
        return record.status.toLowerCase() === 'approved';
      }

      // Default filter for firstName, lastName, or phoneNumber
      return (
        record.fullName.toLowerCase().includes(filter) ||
        record.phoneNumber.includes(filter)
      );
    };
  }

  // navigate to a driver page
  viewDriver(driver: Driver): void {
    this.router.navigate(['/driver', driver.id]);
  }

  // delete account / accounts
  deleteDriverAccount(): void {

    Swal.fire({
      icon: 'question',
      text: 'Proceed Deleting Account?',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: "YES",
      cancelButtonText: "NO"
    }).then(result=>{
      if(result.isConfirmed){

        //array containing selected ids of selected accounts
    const selectedAccountsIds = this.selection.selected.map(
      (client) => client.id
    );
    // array of observables after
    const constDeleteRequests = selectedAccountsIds.map(id=>
      this.driverService.deleteDriverAcc(id)
       
    )
    // use forkjoin to send multiple requests
    forkJoin(constDeleteRequests).subscribe({
      next:()=>{
        const remainingDrivers=this.drivers.filter(driver=>!selectedAccountsIds.includes(driver.id))
        this.drivers=remainingDrivers;
        Swal.fire({
          icon:"success",
          text:'Sucessfully Deleted Accounts'
        })
      },
      error:(error)=>{
        console.log('Error Deleting Drivers' , error)
        Swal.fire({
          icon:"error",
          text:'error Deleting Account'
        })

      },
      complete:()=>{
        console.log("Successfully Delete Drivers")
      }
    })
        
      }
    })
    
  }


  
 
}
