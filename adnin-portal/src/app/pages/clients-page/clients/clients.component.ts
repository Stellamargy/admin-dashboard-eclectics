import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Client } from '../client.model';
import { ClientsService } from '../clients.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
// import { MatTableExporterModule } from 'mat-table-exporter';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    // MatTableExporterModule,
    CommonModule,
    LucideAngularModule,
    MatButtonModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  constructor(private clientService: ClientsService,private router:Router) {}
  // client data
  clients: Client[] = [];
  statusFilter: string | undefined;

  tableColumns: string[] = [
    'select',
    'firstName',
    'lastName',
    'phoneNumber',
    'dateOfBirth',
    'lastLoginTime',
    'active',
  ];

  dataSource = new MatTableDataSource<Client>();
  selection = new SelectionModel<Client>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.clientService.getClients().subscribe((response) => {
      this.clients = response.data;
      console.log('here are my clients', this.clients)
      this.dataSource.data = this.clients;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (record: Client, filter: string) => {
        // Check for status filter (active, inactive, or all)
        if (filter === 'all') {
          return true;
        } else if (filter === 'active') {
          return record.active === true;
        } else if (filter === 'inactive') {
          return record.active === false;
        }

        // Default filter for firstName, lastName, or phoneNumber
        return (
          record.firstName.toLowerCase().includes(filter) ||
          record.lastName.toLowerCase().includes(filter) ||
          record.phoneNumber.includes(filter)
        );
      };
    });
  }

  // Function to calculate age
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

  // Apply text filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Apply dropdown filter - active or inactive
  applyStatusFilter(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value.toLowerCase();
    this.statusFilter = filterValue;
    this.dataSource.filter = this.statusFilter;
  }

  // Whether the number of selected elements matches the total number of rows
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  // Delete multiple clients
  // Delete multiple clients
deleteSelectedClients(): void {
  Swal.fire({
    icon: 'question',
    text: 'Delete Accounts/Account?',
    showCancelButton: true,
    cancelButtonColor: 'red',
    confirmButtonColor: 'green',
    confirmButtonText: "YES",
    cancelButtonText: "NO"
  }).then((result) => {
    if (result.isConfirmed) {
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
            Swal.fire({
              icon:'success',
              text:'Accounts/Account Deleted Successfully'
            })
          },
          error: (err) => {
            console.error('Error deleting clients:', err)
            Swal.fire({
              icon:'error',
              text:'Error Deleting Account/Accounts'
            })
          },
        });
      }
    }else{
      this.selection.clear();
    }
  });
}


   

  // deactivate accounts or  accounts
  deactiveSelectedAccounts(): void {
    Swal.fire({
      icon: 'question',
      text: 'Deactivate Accounts/Account?',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: "YES",
      cancelButtonText: "NO"
    }).then((result)=>{
      if(result.isConfirmed){
        //logic here
        // returns an array of selected ids
    const selectedClientAcc = this.selection.selected.map(
      (client) => client.id
    );
    // checks if a column or columns are selected
    if (selectedClientAcc.length > 0) {
      // an array of observable-multiple delete requests
      const deactivateAccRequest = selectedClientAcc.map((id) =>
        this.clientService.deactivateAccountById(id)
      );

      // Use forkJoin to send all requests together
      forkJoin(deactivateAccRequest).subscribe({
        next: () => {
          // Update the client list and data source after deactivation
          this.clients = this.clients.map((client) => {
            if (selectedClientAcc.includes(client.id)) {
              client.active = false; // Mark the client as inactive in the table
            }
            return client;
          });
          this.dataSource.data = this.clients;
          this.selection.clear();
          Swal.fire({
            icon:'success',
            text:'Accounts/Account Deactivated Successfully'
          })
        },
        error: (error) => {
          if (error) {
            console.log('Error deactivating accounts', error);
            Swal.fire({
              icon:'error',
              text:'Error Deactivating Account/Accounts'
            })
          }
        },
        complete: () => {
          console.log('Deactivation completed!');
        },
      });
    }

      }else{
        this.selection.clear()
      }
    })
    
  }
  //  activating accounts
  activateSelectedAcc(): void {

    Swal.fire({
      icon: 'question',
      text: 'Activate Accounts/Account?',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: "YES",
      cancelButtonText: "NO"
    }).then((result)=>{
      if(result.isConfirmed){
        //logic here
        // get the selected accounts id
    const selectedAccountId = this.selection.selected.map(
      (client) => client.id
    );
    if (selectedAccountId.length > 0) {
      // multiple activate account request
      const selectedAccountReq = selectedAccountId.map((id) =>
        this.clientService.activateAccountById(id)
      );
      // use forkjoin to send multiple requests
      forkJoin(selectedAccountReq).subscribe({
        next: () => {
          //if successful update the Ui
          this.clients = this.clients.map((client) => {
            if (selectedAccountId.includes(client.id)) {
              client.active = true; // Mark the client as active in the table
            }
            return client;
          });
          this.dataSource.data = this.clients;
          // clear selection
          this.selection.clear();
          Swal.fire({
            icon:'success',
            text:'Accounts/Account Activated Successfully'
          })
        },
        error: (error) => {
          if(error){
            console.log("Error activating account", error)
          }
          Swal.fire({
            icon:'error',
            text:'Error Activating Account/Accounts'
          })
        },
        complete: () => {
          console.log("comlete activating account")
        },
      });
    }
      }else{
        this.selection.clear()
      }
    })
    
  }


  // view a  client- navigates to a single client page 
  viewClient(client:Client):void{
    this.router.navigate(['/client' ,client.id])

  }
}
