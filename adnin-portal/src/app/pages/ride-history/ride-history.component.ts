import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { RideHistory,RideHistoryResponse } from './ride-history.service';
import { RideHistoryService } from './ride-history.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ride-history',
  standalone: true,
  imports: [MatTableModule,CommonModule],
  templateUrl: './ride-history.component.html',
  styleUrl: './ride-history.component.css'
})
export class RideHistoryComponent {

  displayedColumns: string[] = ['distance', 'totalAmount', 'price', 'vehicleType'];
  rides:RideHistory[]=[];
  dataSource:MatTableDataSource<RideHistory>
  constructor(private ride:RideHistoryService){
    this.dataSource=new MatTableDataSource();
  }
  
}
