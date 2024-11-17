import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ClientsService } from '../clients.service';
import { Client } from '../client.model';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {

  client:Client | undefined;
 
  constructor(
    private activeRoute:ActivatedRoute,
    private clientService:ClientsService,
    private router:Router
  ){

  }
  ngOnInit():void{
    this.getClient()
  }

  getClient():void{
    //use activatedRoute service to get the id (passed as  param)
    const clientId=this.activeRoute.snapshot.paramMap.get('id');
   if(clientId){
    this.clientService.getClientById(parseInt(clientId)).subscribe({
      next:(response)=>{
       console.log(response)
       this.client=response.data
       console.log(this.client)

      },
      error:(error)=>{
        console.log(error)
         // Display custom error message using SweetAlert
      Swal.fire({
        icon: 'error',
        text: 'There was an issue getting client data. Please try again later.',
        confirmButtonText: 'OK',
      });
      },
      complete:()=>{
        console.log("Client Fetched successfully!")
      }
    })
   }

  }

  onActivate(client:Client){
    Swal.fire({
      icon: 'question',
      text: 'Confirm Account Activation?',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: "YES",
      cancelButtonText: "NO"
    }).then(result=>{
      if(result.isConfirmed){
        this.clientService.activateAccountById(client.id).subscribe({
          next:(response)=>{
            
            console.log(response)
            Swal.fire({
              icon:"success",
              text:response.message
            })
    
          },
          error:(error)=>{
            console.log(error)
            Swal.fire({
              icon:"error",
              text:"Account Activation Failed.Try Again"
            })
          },
          complete:()=>{
            Swal.fire({
              icon:"success",
              text:"Account Activation Successful"
            })
            if(this.client){
              this.client.active=true
          }
            }
        })
      }
    })
  

  }
  //deleteclient
  onDelete(client:Client){

    Swal.fire({
      icon: 'question',
      text: 'Confirm Account Deletion?',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: "YES",
      cancelButtonText: "NO"
    }).then(result=>{
      if(result.isConfirmed){
        this.clientService.deleteClientById(client.id).subscribe({
          next:(response)=>{
            
            console.log(response)
            Swal.fire({
              icon:"success",
              text:response.message
            })
           
    
          },
          error:(error)=>{
            console.log(error)
            Swal.fire({
              icon:"error",
              text:"Account Deletion Failed.Try Again"
            })
          },
          complete:()=>{
            Swal.fire({
              icon:"success",
              text:"Account Deletion Successful"
            })
            this.router.navigate(['/clients'])
            }
        })
      }
    })

  }
  //deactivate client
  onDeactivate(client:Client){

    Swal.fire({
      icon: 'question',
      text: 'Confirm Account Deactivation?',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      confirmButtonText: "YES",
      cancelButtonText: "NO"
    }).then(result=>{
      if(result.isConfirmed){
        this.clientService.deactivateAccountById(client.id).subscribe({
          next:(response)=>{
            
            console.log(response)
            Swal.fire({
              icon:"success",
              text:response.message
            })
    
          },
          error:(error)=>{
            console.log(error)
            Swal.fire({
              icon:"error",
              text:"Account Deactivation Failed.Try Again"
            })
          },
          complete:()=>{
            Swal.fire({
              icon:"success",
              text:"Account Activation Successful"
            })
            if(this.client){
              this.client.active=false
          }
            }
        })
      }
    })
    

  }

}
