import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections'; // Import SelectionModel
import { Client } from '../client.model';
import { ClientsService } from '../clients.service';
import { CommonModule } from '@angular/common';
// import {MatProgressSpinnerModule} from
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  LucideAngularModule,
  Trash2,
  ArrowDownToLine,
  MegaphoneOff,
} from 'lucide-angular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
   
    CommonModule,
    LucideAngularModule,
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  constructor(private clientService: ClientsService) {}
  // icons
  deleteIcon = Trash2;
  downLoadIcon = ArrowDownToLine;
  disableIcon = MegaphoneOff;
  // icons size
  size: number = 24;

  // stores clients data
  clients: Client[] = [];

  // stores status filter value-dropdown
  statusFilter: string | undefined;

  // columns to be displayed -from data
  tableColumns: string[] = [
    'select',
    'firstName',
    'lastName',
    'phoneNumber',
    // 'dateOfBirth',
    // 'city',
    'lastLoginTime',
    'active',
  ];

  dataSource = new MatTableDataSource<Client>();
  selection = new SelectionModel<Client>(true, []); // Multi-select with SelectionModel

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.dataSource.data = this.clients;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // Set the custom filter predicate
      this.setFilterPredicate(); // Set the filter predicate h
     
    });
  }

  // function to calculate age
  getAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  // apply text filter

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    // Apply dropdown filter - online or offline
applyStatusFilter(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  this.statusFilter = selectElement.value;

  // Set the filter to the status filter
  this.setFilterPredicate(); // Ensure the filter predicate is set before applying the filter
  this.dataSource.filter = this.statusFilter.toLowerCase(); // Convert to lower case for consistency
}


public setFilterPredicate(): void {
  this.dataSource.filterPredicate = (client: Client, filter: string) => {
    const matchesStatusFilter = 
      filter === 'all' || 
      (filter === 'active' && client.active) || 
      (filter === 'inactive' && !client.active);
    return matchesStatusFilter;
  };
}




  /** Whether the number of selected elements matches the total number of rows */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
 

  // delete more than one drivers
  deleteSelectedClients(): void {
    if (
      window.confirm('Are you sure you want to delete the selected clients?')
    ) {
      const selectedClientIds = this.selection.selected.map(
        (client) => client.id
      );

      if (selectedClientIds.length > 0) {
        const deleteRequests = selectedClientIds.map((id) =>
          this.clientService.deleteClientById(id)
        );

        forkJoin(deleteRequests).subscribe({
          next: () => {
            this.clients = this.clients.filter(
              (client) => !selectedClientIds.includes(client.id)
            );
            this.dataSource.data = this.clients;
            this.selection.clear();
          },
          error: (err) => console.error('Error deleting clients:', err),
        });
      }
    }
  }
   



  
}
  

