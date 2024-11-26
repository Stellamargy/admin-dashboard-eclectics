import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from '../driver.model';
import { DriversService } from '../drivers.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatGridListModule,MatButtonModule],
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.css'
})
export class DriverDetailComponent {
  driver:Driver | undefined

  constructor(
    private activatedRoute:ActivatedRoute,
    private driverService:DriversService,
    private router:Router
  ){}

  ngOnInit():void{
    this.getDriver()
  }
 // Fetch a  driver
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

  //approve driver registration
  approveDriverRegistration(driver:Driver):void{
    
    // alert -confirmation
    Swal.fire({
      icon: 'question',
      text: 'Proceed with approval?',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: "YES",
      cancelButtonText: "NO"
    }).then((result)=>{
      if(result.isConfirmed){
        this.driverService.approveDriver(driver.id).subscribe(
          {
            next:(response)=>{
              this.driver=response.data
              Swal.fire({
                icon:'success',
                text:'Account Approved Successfully'
              })

            },
            error:(err)=>{
              Swal.fire({
                icon:'error',
                text:err.error.message
              })

            },
            complete:()=>{
              console.log("Driver aproval Successful!")
            }
          }
        )
      }
    })

  }


  // reject driver's registraton
  rejectDriverRegistraation(driver:Driver):void{
    Swal.fire({
      icon: 'question',
      text: 'Proceed with rejection?',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: "YES",
      cancelButtonText: "NO"
    }).then(result=>{
      if(result.isConfirmed){
        this.driverService.rejectDriver(driver.id).subscribe(
          {
            next:(response)=>{
              this.driver=response.data
              Swal.fire({
                icon:'success',
                text:'Application Rejected'
              })

            },
            error:(err)=>{
              Swal.fire({
                icon:'error',
                text:err.error.message
              })

            },
            complete:()=>{
              console.log("Driver approval Successful!")
            }
          }
        )
      }
    })

    

  }
  goToDrivers():void{
    this.router.navigate(['/drivers'])

  }

}
