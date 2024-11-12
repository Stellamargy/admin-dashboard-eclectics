import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from '../driver.model';
import { DriversService } from '../drivers.service';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [],
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
