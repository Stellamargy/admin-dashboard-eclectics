import { Component } from '@angular/core';
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
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';








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
    'phoneNumber',
    'vehicleType',
    'role',
    'status',
  ];
  dataSource: MatTableDataSource<Driver>;
 selection:SelectionModel<Driver>

 // filter and search value
 searchInput:string="";
 regStatusFilterValue:string='all'
 
 
  constructor(private driverService: DriversService , private router :Router) {
    this.dataSource = new MatTableDataSource();
    this.selection=new SelectionModel<Driver>(true,[ ])
  } 

  ngOnInit(): void {
    this.fetchDrivers();
  
   
  }

  fetchDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (response) => {
        console.log(response.data)
        if (response.status === 'OK') {
          this.drivers = response.data;
          this.dataSource.data = this.drivers; // Ensure this line sets the data array
        }
  
      },
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
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
}

 //tooltip
 toolTipMessage():string{
  if(this.isAllSelected()){
    return "uncheck to deselect all rows"
  }else{
    return "check to select all rows"
  }
}
//search filter value
onSearch(event:Event):void{
    this.searchInput = (event.target as HTMLInputElement).value;
    this.dataSource.filter=this.searchInput
    


}

// dropdown filter value
applyStatusFilter(event:MatSelectChange):void{
  this.regStatusFilterValue=event.value;
 
 this.dataSource.filter=this.regStatusFilterValue


}

// custom filter
customFilter(){
  this.dataSource.filterPredicate = (record: Driver, filter: string) => {
    // Check for status filter (active, inactive, or all)
    if (filter === 'all') {
      return true;
    } else if (filter === 'pending') {
      return record.status==='pending'
    } else if (filter === 'rejected') {
      return record.status==="rejected";
    }

    // Default filter for firstName, lastName, or phoneNumber
    return (
      record.fullName.toLowerCase().includes(filter) ||
    
      record.phoneNumber.includes(filter)
    );
  };
};

// navigate to a driver page
viewDriver(driver:Driver):void{
  this.router.navigate(['/driver' ,driver.id])

}
}




