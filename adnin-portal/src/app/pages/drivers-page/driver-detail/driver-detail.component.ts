import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from '../driver.model';
import { DriversService } from '../drivers.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatGridListModule],
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.css'
})
export class DriverDetailComponent {
  driver:Driver | undefined

  constructor(
    private activatedRoute:ActivatedRoute,
    private driverService:DriversService
  ){}

  ngOnInit():void{
    this.getDriver()
  }

  getDriver():void{
    const driverId=this.activatedRoute.snapshot.paramMap.get('id');
    if(driverId){
      this.driverService.getDriver(parseInt(driverId)).subscribe({
        next:(response)=>{
          if(response.status='OK'){
            this.driver=response.data
            console.log('This is my single driver',this.driver)
          }
          console.log(response)
        },
        error:(err)=>{
          console.log(err.message)

        }
      })
    }

  }

}
